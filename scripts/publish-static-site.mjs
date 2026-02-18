#!/usr/bin/env node

import path from "path";
import { cwd, env, exit } from "process";
import { readdir, readFile, stat } from "fs/promises";
import { execFile } from "child_process";

function printUsage() {
  console.log(`Usage:
  node scripts/publish-static-site.mjs --base-url <url> --token <token> --slug <site-slug> [options]

Options:
  --profile <profile-slug>  Profile owner slug (required for service tokens)
  --name <site-name>        Optional display name for the site
  --post-mode <mode>        auto (default) or compose
  --open-compose <bool>     Open compose URL automatically in compose mode
  --out-dir <path>          Static output directory (default: out)
  --batch-size <number>     Files per signing request (default: 200)
  --concurrency <number>    Parallel uploads (default: 8)

Environment fallback:
  DRAFTBOARD_BASE_URL
  DRAFTBOARD_STATIC_PUBLISH_TOKEN
  DRAFTBOARD_PROFILE_SLUG
  STATIC_PROFILE_SLUG
  DRAFTBOARD_SITE_SLUG
  STATIC_SITE_SLUG
  DRAFTBOARD_SITE_NAME
  DRAFTBOARD_POST_MODE
  DRAFTBOARD_OPEN_COMPOSE
  DRAFTBOARD_OUT_DIR
`);
}

function parseArgs(argv) {
  const parsed = {};

  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "--help" || arg === "-h") {
      parsed.help = true;
      continue;
    }

    if (!arg.startsWith("--")) {
      throw new Error(`Unexpected argument: ${arg}`);
    }

    const key = arg.slice(2);
    const value = argv[i + 1];
    if (!value || value.startsWith("--")) {
      throw new Error(`Missing value for --${key}`);
    }

    parsed[key] = value;
    i += 1;
  }

  return parsed;
}

function toPosixPath(inputPath) {
  return inputPath.split(path.sep).join("/");
}

function parseBoolean(input, defaultValue = false) {
  if (typeof input !== "string" || input.trim().length === 0) {
    return defaultValue;
  }

  const value = input.trim().toLowerCase();
  if (["1", "true", "yes", "y", "on"].includes(value)) {
    return true;
  }
  if (["0", "false", "no", "n", "off"].includes(value)) {
    return false;
  }

  return defaultValue;
}

function guessContentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();

  switch (extension) {
    case ".html":
      return "text/html; charset=utf-8";
    case ".css":
      return "text/css; charset=utf-8";
    case ".js":
    case ".mjs":
    case ".cjs":
      return "text/javascript; charset=utf-8";
    case ".json":
      return "application/json; charset=utf-8";
    case ".map":
      return "application/json; charset=utf-8";
    case ".txt":
      return "text/plain; charset=utf-8";
    case ".xml":
      return "application/xml; charset=utf-8";
    case ".svg":
      return "image/svg+xml";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".gif":
      return "image/gif";
    case ".webp":
      return "image/webp";
    case ".avif":
      return "image/avif";
    case ".ico":
      return "image/x-icon";
    case ".woff":
      return "font/woff";
    case ".woff2":
      return "font/woff2";
    case ".ttf":
      return "font/ttf";
    case ".otf":
      return "font/otf";
    case ".webmanifest":
      return "application/manifest+json";
    case ".wasm":
      return "application/wasm";
    case ".mp4":
      return "video/mp4";
    case ".webm":
      return "video/webm";
    default:
      return "application/octet-stream";
  }
}

async function collectFiles(rootDir) {
  const pending = [""];
  const files = [];

  while (pending.length > 0) {
    const relativeDir = pending.pop();
    const absoluteDir = path.join(rootDir, relativeDir);
    const entries = await readdir(absoluteDir, { withFileTypes: true });

    for (const entry of entries) {
      const relativePath = relativeDir ? path.join(relativeDir, entry.name) : entry.name;
      if (entry.isDirectory()) {
        pending.push(relativePath);
        continue;
      }

      if (entry.isFile()) {
        const absolutePath = path.join(rootDir, relativePath);
        const fileStats = await stat(absolutePath);
        files.push({
          relativePath: toPosixPath(relativePath),
          absolutePath,
          size: fileStats.size,
          contentType: guessContentType(entry.name),
        });
      }
    }
  }

  files.sort((a, b) => a.relativePath.localeCompare(b.relativePath));
  return files;
}

async function warnIfExportBasePathLooksWrong(params) {
  const { files, expectedBasePath, legacySiteSlug } = params;
  const indexFile = files.find((file) => file.relativePath === "index.html");
  if (!indexFile) {
    return;
  }

  const indexHtml = await readFile(indexFile.absolutePath, "utf8");

  if (indexHtml.includes('"/_next/') || indexHtml.includes("'/_next/")) {
    console.warn(
      `Warning: index.html references /_next assets. Build with STATIC_BASE_PATH=${expectedBasePath} to avoid broken assets.`,
    );
    return;
  }

  const canonicalPathMatch = indexHtml.match(/["'](\/u\/[a-z0-9-]+\/[a-z0-9-]+)\/_next\//i);
  if (canonicalPathMatch && canonicalPathMatch[1] !== expectedBasePath) {
    console.warn(
      `Warning: export basePath appears to be ${canonicalPathMatch[1]}, but publish target is ${expectedBasePath}.`,
    );
  }

  const legacyPathMatch = indexHtml.match(/["'](\/s\/[a-z0-9-]+)\/_next\//i);
  const expectedLegacyPath = `/s/${legacySiteSlug}`;
  if (legacyPathMatch && legacyPathMatch[1] !== expectedLegacyPath) {
    console.warn(
      `Warning: export references ${legacyPathMatch[1]} but publish slug is ${legacySiteSlug}. Rebuild with STATIC_BASE_PATH=${expectedBasePath}.`,
    );
    return;
  }

  if (indexHtml.includes(expectedLegacyPath + "/")) {
    console.warn(
      `Warning: export appears to use legacy ${expectedLegacyPath} basePath. It will work via redirects, but canonical path is ${expectedBasePath}.`,
    );
  }
}

async function requestJson(url, token, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${url} failed (${response.status}): ${body}`);
  }

  return response.json();
}

async function runWithConcurrency(items, limit, worker) {
  const inFlight = new Set();

  for (const item of items) {
    const task = worker(item).finally(() => inFlight.delete(task));
    inFlight.add(task);

    if (inFlight.size >= limit) {
      await Promise.race(inFlight);
    }
  }

  await Promise.all(inFlight);
}

function buildComposeUrl(baseUrl, params) {
  const composeUrl = new URL(`${baseUrl.replace(/\/+$/, "")}/compose`);
  composeUrl.searchParams.set("liveUrl", params.liveUrl);
  if (params.title) {
    composeUrl.searchParams.set("title", params.title);
  }
  return composeUrl.toString();
}

function openUrlInBrowser(url) {
  return new Promise((resolve, reject) => {
    let command;
    let args;

    if (process.platform === "darwin") {
      command = "open";
      args = [url];
    } else if (process.platform === "win32") {
      command = "cmd";
      args = ["/c", "start", "", url];
    } else {
      command = "xdg-open";
      args = [url];
    }

    execFile(command, args, (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printUsage();
    return;
  }

  const baseUrl = (args["base-url"] || env.DRAFTBOARD_BASE_URL || "").trim().replace(/\/+$/, "");
  const token = (args.token || env.DRAFTBOARD_STATIC_PUBLISH_TOKEN || "").trim();
  const profileSlug = (
    args.profile ||
    env.DRAFTBOARD_PROFILE_SLUG ||
    env.STATIC_PROFILE_SLUG ||
    ""
  ).trim();
  const siteSlug = (args.slug || env.DRAFTBOARD_SITE_SLUG || "").trim();
  const fallbackSiteSlug = (env.STATIC_SITE_SLUG || "").trim();
  const siteName = (args.name || env.DRAFTBOARD_SITE_NAME || "").trim();
  const postMode = (args["post-mode"] || env.DRAFTBOARD_POST_MODE || "auto")
    .trim()
    .toLowerCase();
  const openCompose = parseBoolean(
    args["open-compose"] || env.DRAFTBOARD_OPEN_COMPOSE || "",
    false,
  );

  const outDirInput = (args["out-dir"] || env.DRAFTBOARD_OUT_DIR || "out").trim();
  const outDir = path.resolve(cwd(), outDirInput);

  const batchSize = Number.parseInt(args["batch-size"] || "200", 10);
  const concurrency = Number.parseInt(args.concurrency || "8", 10);

  const resolvedSiteSlug = siteSlug || fallbackSiteSlug;

  if (!baseUrl || !token || !resolvedSiteSlug) {
    printUsage();
    throw new Error("Missing required options: --base-url, --token, --slug");
  }

  if (postMode !== "auto" && postMode !== "compose") {
    throw new Error("post-mode must be either 'auto' or 'compose'");
  }

  if (!Number.isInteger(batchSize) || batchSize <= 0) {
    throw new Error("batch-size must be a positive integer");
  }

  if (!Number.isInteger(concurrency) || concurrency <= 0) {
    throw new Error("concurrency must be a positive integer");
  }

  const outStat = await stat(outDir).catch(() => null);
  if (!outStat || !outStat.isDirectory()) {
    throw new Error(`Output directory does not exist: ${outDir}`);
  }

  const files = await collectFiles(outDir);
  if (files.length === 0) {
    throw new Error(`No files found under ${outDir}`);
  }

  if (profileSlug) {
    await warnIfExportBasePathLooksWrong({
      files,
      expectedBasePath: `/u/${profileSlug}/${resolvedSiteSlug}`,
      legacySiteSlug: resolvedSiteSlug,
    });
  }

  const totalBytes = files.reduce((sum, file) => sum + file.size, 0);

  console.log(`Publishing ${files.length} files (${totalBytes} bytes) from ${outDir}`);

  const init = await requestJson(`${baseUrl}/api/static-sites/init`, token, {
    siteSlug: resolvedSiteSlug,
    ownerProfileSlug: profileSlug || undefined,
    siteName: siteName || undefined,
  });

  const deploymentId = init.deployment?.id;
  if (!deploymentId) {
    throw new Error("Init response is missing deployment id");
  }

  console.log(`Deployment initialized: ${deploymentId}`);

  const uploadsByPath = new Map();

  for (let index = 0; index < files.length; index += batchSize) {
    const batch = files.slice(index, index + batchSize);
    const signed = await requestJson(`${baseUrl}/api/static-sites/sign`, token, {
      siteSlug: resolvedSiteSlug,
      ownerProfileSlug: profileSlug || undefined,
      deploymentId,
      files: batch.map((file) => ({
        path: file.relativePath,
        contentType: file.contentType,
      })),
    });

    for (const upload of signed.uploads || []) {
      uploadsByPath.set(upload.path, upload);
    }

    console.log(`Signed ${Math.min(index + batch.length, files.length)} / ${files.length} files`);
  }

  await runWithConcurrency(files, concurrency, async (file, index) => {
    void index;

    const signed = uploadsByPath.get(file.relativePath);
    if (!signed) {
      throw new Error(`Missing signed upload URL for ${file.relativePath}`);
    }

    const fileBuffer = await readFile(file.absolutePath);
    const response = await fetch(signed.uploadUrl, {
      method: "PUT",
      headers: signed.headers,
      body: fileBuffer,
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Upload failed for ${file.relativePath} (${response.status}): ${body}`);
    }

    process.stdout.write(`Uploaded ${file.relativePath}\n`);
  });

  const finalized = await requestJson(`${baseUrl}/api/static-sites/finalize`, token, {
    siteSlug: resolvedSiteSlug,
    ownerProfileSlug: profileSlug || undefined,
    deploymentId,
    fileCount: files.length,
    totalBytes,
    createPost: postMode === "auto",
  });

  const resolvedProfileSlug = finalized.ownerProfileSlug || profileSlug;
  const url =
    finalized.url ||
    (resolvedProfileSlug
      ? `${baseUrl}/u/${resolvedProfileSlug}/${resolvedSiteSlug}`
      : `${baseUrl}/s/${resolvedSiteSlug}`);
  console.log(`\nDeployment active: ${url}`);

  if (postMode === "compose") {
    const composeUrl = buildComposeUrl(baseUrl, {
      liveUrl: url,
      title: siteName || resolvedSiteSlug,
    });
    console.log(`Compose URL: ${composeUrl}`);
    if (openCompose) {
      try {
        await openUrlInBrowser(composeUrl);
        console.log("Opened compose URL in your browser.");
      } catch (error) {
        console.warn(
          `Failed to open browser automatically: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    } else {
      console.log("Open this URL to finish the post in Draftboard.");
    }
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  exit(1);
});
