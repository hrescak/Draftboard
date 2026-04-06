"use client";

import { useCallback, useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  COMMAND_PRIORITY_HIGH,
  PASTE_COMMAND,
} from "lexical";
import { $createUploadPlaceholderNode } from "../nodes/UploadPlaceholderNode";
import { generateUploadId, registerPendingUpload } from "~/lib/upload-store";

/**
 * Plugin that handles pasting files (images, videos, other files) from clipboard.
 * When a file is pasted, a placeholder is immediately inserted showing upload progress.
 */
export function PasteFilePlugin() {
  const [editor] = useLexicalComposerContext();

  const insertPlaceholders = useCallback(
    (files: File[]) => {
      for (const file of files) {
        const uploadId = generateUploadId();
        registerPendingUpload(uploadId, file);

        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const placeholderNode = $createUploadPlaceholderNode({
              uploadId,
              filename: file.name,
              fileSize: file.size,
              mimeType: file.type,
            });
            selection.insertNodes([placeholderNode, $createParagraphNode()]);
          }
        });
      }
    },
    [editor]
  );

  useEffect(() => {
    return editor.registerCommand(
      PASTE_COMMAND,
      (event) => {
        // Get clipboard data from the event if available
        const clipboardData =
          "clipboardData" in event ? event.clipboardData : null;
        if (!clipboardData) return false;

        // Check if there are files in clipboard
        const files = clipboardData.files;
        if (!files || files.length === 0) return false;

        // Filter for actual files (not empty)
        const actualFiles = Array.from(files).filter((file) => file.size > 0);
        if (actualFiles.length === 0) return false;

        // Insert placeholders immediately
        insertPlaceholders(actualFiles);
        return true;
      },
      COMMAND_PRIORITY_HIGH
    );
  }, [editor, insertPlaceholders]);

  return null;
}
