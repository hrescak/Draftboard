import path from "path";
import { readFile } from "fs/promises";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const scriptPath = path.join(process.cwd(), "scripts", "publish-static-site.mjs");

  try {
    const scriptContents = await readFile(scriptPath, "utf8");
    return new Response(scriptContents, {
      status: 200,
      headers: {
        "content-type": "text/javascript; charset=utf-8",
        "cache-control": "no-store",
      },
    });
  } catch (error) {
    console.error("Failed to load static publisher script", error);
    return new Response("Publisher script not found", { status: 404 });
  }
}
