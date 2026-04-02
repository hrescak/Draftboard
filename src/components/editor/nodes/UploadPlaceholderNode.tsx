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
import { FileIcon, ImageIcon, Film, Loader2, X } from "lucide-react";
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
  const uploadStartedRef = useRef(false);

  const { uploadFile } = useUpload();

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

    const doUpload = async () => {
      try {
        const { url } = await uploadFile(file, {
          onProgress: (p) => setProgress(p),
          signal: abortController.signal,
        });

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

  if (error) {
    return (
      <div className="my-4 rounded-lg border border-destructive/50 bg-destructive/5 p-4">
        <div className="flex items-center gap-3">
          {getFileTypeIcon(mimeType)}
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium">{filename}</p>
            <p className="text-xs text-destructive">{error}</p>
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

  return (
    <div
      className={`my-4 rounded-lg border border-border bg-muted/30 overflow-hidden ${
        isMedia ? "aspect-video max-h-64" : ""
      }`}
    >
      <div className={`flex flex-col justify-center p-4 ${isMedia ? "h-full" : ""}`}>
        <div className="flex items-center gap-3">
          <div className="shrink-0">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-foreground">{filename}</p>
            <p className="text-xs text-muted-foreground">
              {formatFileSize(fileSize)} · Uploading{progress > 0 ? ` · ${progress}%` : "..."}
            </p>
          </div>
          <button
            type="button"
            onClick={handleCancel}
            className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Cancel upload"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {/* Progress bar */}
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${Math.max(progress, 2)}%` }}
          />
        </div>
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
