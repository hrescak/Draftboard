"use client";

import * as React from "react";
import {
  type DOMExportOutput,
  type EditorConfig,
  type LexicalNode,
  type NodeKey,
  type SerializedLexicalNode,
  type Spread,
  DecoratorNode,
} from "lexical";
import { Suspense, useEffect, useState } from "react";
import { FileIcon, Download, Play, ExternalLink, Loader2 } from "lucide-react";
import { api } from "~/lib/trpc/client";
import { Lightbox } from "~/components/ui/lightbox";

export type AttachmentType = "IMAGE" | "VIDEO" | "FILE" | "FIGMA" | "LOOM";

export type SerializedAttachmentNode = Spread<
  {
    attachmentType: AttachmentType;
    url: string;
    filename: string;
    mimeType: string;
    size: number;
    thumbnailUrl?: string;
    width?: number;
    height?: number;
    metadata?: Record<string, unknown>;
  },
  SerializedLexicalNode
>;

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// Extract R2 key from URL if it's an R2 URL
function extractR2Key(url: string): string | null {
  // Match patterns like:
  // https://bucket.accountid.r2.cloudflarestorage.com/uploads/userid/timestamp-filename
  // https://custom-domain.com/uploads/userid/timestamp-filename
  const match = url.match(/uploads\/[^\/]+\/[^\/]+$/);
  if (match) {
    return match[0];
  }
  return null;
}

function AttachmentComponent({
  attachmentType,
  url,
  filename,
  mimeType,
  size,
  thumbnailUrl,
  width,
  height,
}: {
  attachmentType: AttachmentType;
  url: string;
  filename: string;
  mimeType: string;
  size: number;
  thumbnailUrl?: string;
  width?: number;
  height?: number;
}) {
  const [displayUrl, setDisplayUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const r2Key = extractR2Key(url);
  const { data: signedUrlData, isLoading: isLoadingUrl, error: urlError } = api.upload.getDownloadUrl.useQuery(
    { key: r2Key! },
    {
      enabled: !!r2Key && (attachmentType === "IMAGE" || attachmentType === "VIDEO"),
      staleTime: 30 * 60 * 1000, // Cache for 30 minutes (URL expires in 1 hour)
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (attachmentType !== "IMAGE" && attachmentType !== "VIDEO") {
      // For non-media types, use original URL
      setDisplayUrl(url);
      setIsLoading(false);
      return;
    }

    if (!r2Key) {
      // If we can't extract a key, try using the URL directly
      setDisplayUrl(url);
      setIsLoading(false);
      return;
    }

    if (signedUrlData) {
      setDisplayUrl(signedUrlData.url);
      setIsLoading(false);
    } else if (urlError) {
      // If signed URL fails, try original URL
      setDisplayUrl(url);
      setIsLoading(false);
      setError("Could not load signed URL, trying direct URL");
    } else if (isLoadingUrl) {
      setIsLoading(true);
    }
  }, [attachmentType, url, r2Key, signedUrlData, urlError, isLoadingUrl]);

  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (attachmentType === "IMAGE") {
    if (isLoading) {
      return (
        <div className="my-4 flex h-48 items-center justify-center rounded-lg bg-muted">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      );
    }

    return (
      <>
        <div className="my-4">
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="block cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
          >
            <img
              src={displayUrl || url}
              alt={filename}
              width={width}
              height={height}
              className="max-w-full rounded-lg"
              loading="lazy"
              onError={(e) => {
                // If image fails to load, show error state
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                console.error("Image failed to load:", displayUrl || url);
              }}
            />
          </button>
        </div>
        <Lightbox
          images={[{ id: "single", url: displayUrl || url, filename }]}
          initialIndex={0}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      </>
    );
  }

  if (attachmentType === "VIDEO") {
    if (isLoading) {
      return (
        <div className="my-4 flex h-48 items-center justify-center rounded-lg bg-muted">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      );
    }

    return (
      <div className="my-4">
        <video
          src={displayUrl || url}
          poster={thumbnailUrl}
          controls
          className="max-w-full rounded-lg"
        >
          <track kind="captions" />
        </video>
      </div>
    );
  }

  if (attachmentType === "FIGMA") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="my-4 flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1e1e1e]">
          <svg viewBox="0 0 38 57" className="h-6 w-6" fill="none">
            <path
              d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"
              fill="#1ABCFE"
            />
            <path
              d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z"
              fill="#0ACF83"
            />
            <path
              d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z"
              fill="#FF7262"
            />
            <path
              d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"
              fill="#F24E1E"
            />
            <path
              d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"
              fill="#A259FF"
            />
          </svg>
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="truncate font-medium">{filename}</p>
          <p className="text-sm text-muted-foreground">Figma Design</p>
        </div>
        <ExternalLink className="h-4 w-4 text-muted-foreground" />
      </a>
    );
  }

  if (attachmentType === "LOOM") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="my-4 flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#625df5]">
          <Play className="h-5 w-5 fill-white text-white" />
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="truncate font-medium">{filename}</p>
          <p className="text-sm text-muted-foreground">Loom Recording</p>
        </div>
        <ExternalLink className="h-4 w-4 text-muted-foreground" />
      </a>
    );
  }

  // Generic file attachment - use signed URL for download
  const downloadKey = extractR2Key(url);
  const { data: downloadUrlData } = api.upload.getDownloadUrl.useQuery(
    { key: downloadKey! },
    {
      enabled: !!downloadKey,
      staleTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <a
      href={downloadUrlData?.url || url}
      download={filename}
      className="my-4 flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
        <FileIcon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="flex-1 overflow-hidden">
        <p className="truncate font-medium">{filename}</p>
        <p className="text-sm text-muted-foreground">
          {mimeType} · {formatFileSize(size)}
        </p>
      </div>
      <Download className="h-4 w-4 text-muted-foreground" />
    </a>
  );
}

export class AttachmentNode extends DecoratorNode<React.ReactElement> {
  __attachmentType: AttachmentType;
  __url: string;
  __filename: string;
  __mimeType: string;
  __size: number;
  __thumbnailUrl?: string;
  __width?: number;
  __height?: number;
  __metadata?: Record<string, unknown>;

  static getType(): string {
    return "attachment";
  }

  static clone(node: AttachmentNode): AttachmentNode {
    return new AttachmentNode(
      node.__attachmentType,
      node.__url,
      node.__filename,
      node.__mimeType,
      node.__size,
      node.__thumbnailUrl,
      node.__width,
      node.__height,
      node.__metadata,
      node.__key
    );
  }

  constructor(
    attachmentType: AttachmentType,
    url: string,
    filename: string,
    mimeType: string,
    size: number,
    thumbnailUrl?: string,
    width?: number,
    height?: number,
    metadata?: Record<string, unknown>,
    key?: NodeKey
  ) {
    super(key);
    this.__attachmentType = attachmentType;
    this.__url = url;
    this.__filename = filename;
    this.__mimeType = mimeType;
    this.__size = size;
    this.__thumbnailUrl = thumbnailUrl;
    this.__width = width;
    this.__height = height;
    this.__metadata = metadata;
  }

  createDOM(_config: EditorConfig): HTMLElement {
    const div = document.createElement("div");
    div.className = "editor-attachment";
    return div;
  }

  updateDOM(): false {
    return false;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("div");
    element.setAttribute("data-attachment-type", this.__attachmentType);
    element.setAttribute("data-url", this.__url);
    element.setAttribute("data-filename", this.__filename);
    return { element };
  }

  static importJSON(serializedNode: SerializedAttachmentNode): AttachmentNode {
    return $createAttachmentNode({
      attachmentType: serializedNode.attachmentType,
      url: serializedNode.url,
      filename: serializedNode.filename,
      mimeType: serializedNode.mimeType,
      size: serializedNode.size,
      thumbnailUrl: serializedNode.thumbnailUrl,
      width: serializedNode.width,
      height: serializedNode.height,
      metadata: serializedNode.metadata,
    });
  }

  exportJSON(): SerializedAttachmentNode {
    return {
      type: "attachment",
      version: 1,
      attachmentType: this.__attachmentType,
      url: this.__url,
      filename: this.__filename,
      mimeType: this.__mimeType,
      size: this.__size,
      thumbnailUrl: this.__thumbnailUrl,
      width: this.__width,
      height: this.__height,
      metadata: this.__metadata,
    };
  }

  getUrl(): string {
    return this.__url;
  }

  getFilename(): string {
    return this.__filename;
  }

  decorate(): React.ReactElement {
    return (
      <Suspense fallback={<div className="my-4 h-48 animate-pulse rounded-lg bg-muted" />}>
        <AttachmentComponent
          attachmentType={this.__attachmentType}
          url={this.__url}
          filename={this.__filename}
          mimeType={this.__mimeType}
          size={this.__size}
          thumbnailUrl={this.__thumbnailUrl}
          width={this.__width}
          height={this.__height}
        />
      </Suspense>
    );
  }

  isInline(): boolean {
    return false;
  }

  isKeyboardSelectable(): boolean {
    return true;
  }
}

export function $createAttachmentNode({
  attachmentType,
  url,
  filename,
  mimeType,
  size,
  thumbnailUrl,
  width,
  height,
  metadata,
}: {
  attachmentType: AttachmentType;
  url: string;
  filename: string;
  mimeType: string;
  size: number;
  thumbnailUrl?: string;
  width?: number;
  height?: number;
  metadata?: Record<string, unknown>;
}): AttachmentNode {
  return new AttachmentNode(
    attachmentType,
    url,
    filename,
    mimeType,
    size,
    thumbnailUrl,
    width,
    height,
    metadata
  );
}

export function $isAttachmentNode(
  node: LexicalNode | null | undefined
): node is AttachmentNode {
  return node instanceof AttachmentNode;
}
