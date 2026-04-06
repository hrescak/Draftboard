"use client";

import * as React from "react";
import {
  type EditorConfig,
  type LexicalNode,
  type NodeKey,
  type SerializedLexicalNode,
  type Spread,
  DecoratorNode,
  $getNodeByKey,
  $createParagraphNode,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useRef, useState } from "react";
import { FileIcon, ImageIcon, Film, X } from "lucide-react";
import { useUpload } from "~/lib/hooks/use-upload";
import { getPendingUpload, removePendingUpload, cancelPendingUpload } from "~/lib/upload-store";
import { $createAttachmentNode, type AttachmentType } from "./AttachmentNode";

export type SerializedUploadPlaceholderNode = Spread<
  {
    uploadId: string;
    filename: string;
    fileSize: number;
    mimeType: string;
  },
  SerializedLexicalNode
>;

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileTypeIcon(mimeType: string) {
  if (mimeType.startsWith("image/")) return <ImageIcon className="h-5 w-5 text-muted-foreground" />;
  if (mimeType.startsWith("video/")) return <Film className="h-5 w-5 text-muted-foreground" />;
  return <FileIcon className="h-5 w-5 text-muted-foreground" />;
}

function UploadPlaceholderComponent({
  uploadId,
  filename,
  fileSize,
  mimeType,
  nodeKey,
}: {
  uploadId: string;
  filename: string;
  fileSize: number;
  mimeType: string;
  nodeKey: NodeKey;
}) {
  const [editor] = useLexicalComposerContext();
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const mediaDimensionsRef = useRef<{ width: number; height: number } | null>(null);
  const uploadStartedRef = useRef(false);

  const { uploadFile } = useUpload();

  // Read media dimensions to match aspect ratio
  useEffect(() => {
    const entry = getPendingUpload(uploadId);
    if (!entry) return;
    const { file } = entry;

    if (file.type.startsWith("image/")) {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.onload = () => {
        if (img.naturalWidth && img.naturalHeight) {
          mediaDimensionsRef.current = { width: img.naturalWidth, height: img.naturalHeight };
          setAspectRatio(img.naturalWidth / img.naturalHeight);
        }
        URL.revokeObjectURL(objectUrl);
      };
      img.onerror = () => URL.revokeObjectURL(objectUrl);
      img.src = objectUrl;
    } else if (file.type.startsWith("video/")) {
      const video = document.createElement("video");
      video.preload = "metadata";
      const objectUrl = URL.createObjectURL(file);
      video.onloadedmetadata = () => {
        if (video.videoWidth && video.videoHeight) {
          mediaDimensionsRef.current = { width: video.videoWidth, height: video.videoHeight };
          setAspectRatio(video.videoWidth / video.videoHeight);
        }
        URL.revokeObjectURL(objectUrl);
      };
      video.onerror = () => URL.revokeObjectURL(objectUrl);
      video.src = objectUrl;
    }
  }, [uploadId]);

  useEffect(() => {
    // Only start upload once
    if (uploadStartedRef.current) return;
    uploadStartedRef.current = true;

    const entry = getPendingUpload(uploadId);
    if (!entry) {
      setError("Upload data not found");
      return;
    }

    const { file, abortController } = entry;

    const captureVideoThumbnail = (file: File): Promise<string | undefined> => {
      return new Promise((resolve) => {
        try {
          const video = document.createElement("video");
          video.muted = true;
          video.playsInline = true;
          video.preload = "auto";
          const objectUrl = URL.createObjectURL(file);
          video.src = objectUrl;

          video.addEventListener("loadeddata", () => {
            // Seek to first frame
            video.currentTime = 0.1;
          });

          video.addEventListener("seeked", () => {
            try {
              const canvas = document.createElement("canvas");
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              const ctx = canvas.getContext("2d");
              if (ctx) {
                ctx.drawImage(video, 0, 0);
                const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
                URL.revokeObjectURL(objectUrl);
                resolve(dataUrl);
              } else {
                URL.revokeObjectURL(objectUrl);
                resolve(undefined);
              }
            } catch {
              URL.revokeObjectURL(objectUrl);
              resolve(undefined);
            }
          });

          video.addEventListener("error", () => {
            URL.revokeObjectURL(objectUrl);
            resolve(undefined);
          });
        } catch {
          resolve(undefined);
        }
      });
    };

    const doUpload = async () => {
      try {
        // Start thumbnail capture in parallel with upload for videos
        const thumbnailPromise = file.type.startsWith("video/")
          ? captureVideoThumbnail(file)
          : Promise.resolve(undefined);

        const { url } = await uploadFile(file, {
          onProgress: (p) => setProgress(p),
          signal: abortController.signal,
        });

        const thumbnailUrl = await thumbnailPromise;

        // Determine attachment type
        let attachmentType: AttachmentType = "FILE";
        if (file.type.startsWith("image/")) {
          attachmentType = "IMAGE";
        } else if (file.type.startsWith("video/")) {
          attachmentType = "VIDEO";
        }

        // Replace this placeholder node with the real AttachmentNode
        editor.update(() => {
          const node = $getNodeByKey(nodeKey);
          if (node) {
            const attachmentNode = $createAttachmentNode({
              attachmentType,
              url,
              filename: file.name,
              mimeType: file.type,
              size: file.size,
              thumbnailUrl,
              width: mediaDimensionsRef.current?.width,
              height: mediaDimensionsRef.current?.height,
            });
            node.replace(attachmentNode);
          }
        });

        removePendingUpload(uploadId);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          // Upload was cancelled - remove the node
          editor.update(() => {
            const node = $getNodeByKey(nodeKey);
            if (node) {
              node.remove();
            }
          });
          return;
        }

        console.error("Upload failed:", err);
        setError(err instanceof Error ? err.message : "Upload failed");
        removePendingUpload(uploadId);
      }
    };

    doUpload();
  }, [uploadId, editor, nodeKey, uploadFile]);

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    cancelPendingUpload(uploadId);
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if (node) {
        node.remove();
      }
    });
  };

  const handleRetry = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // On error, just remove the node - user can re-upload
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if (node) {
        node.remove();
      }
    });
  };

  const isMedia = mimeType.startsWith("image/") || mimeType.startsWith("video/");

  const progressBar = (
    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-foreground/10">
      <div
        className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
        style={{ width: `${Math.max(progress, 2)}%` }}
      />
    </div>
  );

  if (error) {
    return (
      <div className="my-4 rounded-lg border border-destructive/50 bg-destructive/5 p-4">
        <div className="flex items-center gap-3">
          {getFileTypeIcon(mimeType)}
          <div className="flex-1 min-w-0">
            <p className="truncate font-medium">{filename}</p>
            <p className="text-sm text-destructive">{error}</p>
          </div>
          <button
            type="button"
            onClick={handleRetry}
            className="shrink-0 rounded-md px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    );
  }

  // File upload placeholder — matches finished file attachment layout
  if (!isMedia) {
    return (
      <div className="group relative my-4">
        <button
          type="button"
          onClick={handleCancel}
          className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity hover:bg-black/80 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Cancel upload"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 pr-7">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
            <FileIcon className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate font-medium">{filename}</p>
            <p className="text-sm text-muted-foreground">
              {formatFileSize(fileSize)} · Uploading{progress > 0 ? ` · ${progress}%` : "..."}
            </p>
          </div>
          {progressBar}
        </div>
      </div>
    );
  }

  // Media upload placeholder — centered vertical layout with aspect ratio
  return (
    <div
      className="group relative my-4 w-full rounded-lg bg-muted overflow-hidden"
      style={aspectRatio ? { aspectRatio: `${aspectRatio}` } : undefined}
    >
      <button
        type="button"
        onClick={handleCancel}
        className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity hover:bg-black/80 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Cancel upload"
      >
        <X className="h-4 w-4" />
      </button>
      <div className={`flex w-full flex-col items-center justify-center ${aspectRatio ? "absolute inset-0" : "p-8"}`}>
        {mimeType.startsWith("video/") ? (
          <Film className="h-6 w-6 text-muted-foreground" />
        ) : (
          <ImageIcon className="h-6 w-6 text-muted-foreground" />
        )}
        <p className="mt-3 truncate text-sm font-medium text-foreground">{filename}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {formatFileSize(fileSize)} · Uploading{progress > 0 ? ` · ${progress}%` : "..."}
        </p>
        <div className="mt-3">{progressBar}</div>
      </div>
    </div>
  );
}

export class UploadPlaceholderNode extends DecoratorNode<React.ReactElement> {
  __uploadId: string;
  __filename: string;
  __fileSize: number;
  __mimeType: string;

  static getType(): string {
    return "upload-placeholder";
  }

  static clone(node: UploadPlaceholderNode): UploadPlaceholderNode {
    return new UploadPlaceholderNode(
      node.__uploadId,
      node.__filename,
      node.__fileSize,
      node.__mimeType,
      node.__key
    );
  }

  constructor(
    uploadId: string,
    filename: string,
    fileSize: number,
    mimeType: string,
    key?: NodeKey
  ) {
    super(key);
    this.__uploadId = uploadId;
    this.__filename = filename;
    this.__fileSize = fileSize;
    this.__mimeType = mimeType;
  }

  createDOM(_config: EditorConfig): HTMLElement {
    const div = document.createElement("div");
    div.className = "editor-upload-placeholder";
    return div;
  }

  updateDOM(): false {
    return false;
  }

  // If this node ends up in serialized state (e.g. page reload mid-upload),
  // importJSON will recreate it but the upload data will be gone.
  // The component handles this gracefully by showing an error.
  static importJSON(serializedNode: SerializedUploadPlaceholderNode): UploadPlaceholderNode {
    return new UploadPlaceholderNode(
      serializedNode.uploadId,
      serializedNode.filename,
      serializedNode.fileSize,
      serializedNode.mimeType
    );
  }

  exportJSON(): SerializedUploadPlaceholderNode {
    return {
      type: "upload-placeholder",
      version: 1,
      uploadId: this.__uploadId,
      filename: this.__filename,
      fileSize: this.__fileSize,
      mimeType: this.__mimeType,
    };
  }

  decorate(): React.ReactElement {
    return (
      <UploadPlaceholderComponent
        uploadId={this.__uploadId}
        filename={this.__filename}
        fileSize={this.__fileSize}
        mimeType={this.__mimeType}
        nodeKey={this.__key}
      />
    );
  }

  isInline(): boolean {
    return false;
  }

  isKeyboardSelectable(): boolean {
    return true;
  }
}

export function $createUploadPlaceholderNode({
  uploadId,
  filename,
  fileSize,
  mimeType,
}: {
  uploadId: string;
  filename: string;
  fileSize: number;
  mimeType: string;
}): UploadPlaceholderNode {
  return new UploadPlaceholderNode(uploadId, filename, fileSize, mimeType);
}

export function $isUploadPlaceholderNode(
  node: LexicalNode | null | undefined
): node is UploadPlaceholderNode {
  return node instanceof UploadPlaceholderNode;
}
