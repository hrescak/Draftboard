"use client";

import { useCallback, useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  COMMAND_PRIORITY_HIGH,
  DROP_COMMAND,
  DRAGOVER_COMMAND,
} from "lexical";
import { $createUploadPlaceholderNode } from "../nodes/UploadPlaceholderNode";
import { generateUploadId, registerPendingUpload } from "~/lib/upload-store";

export function DragDropPlugin() {
  const [editor] = useLexicalComposerContext();

  const handleDrop = useCallback(
    (event: DragEvent) => {
      const files = event.dataTransfer?.files;
      if (!files || files.length === 0) return false;

      event.preventDefault();

      for (const file of Array.from(files)) {
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

      return true;
    },
    [editor]
  );

  useEffect(() => {
    return editor.registerCommand(
      DRAGOVER_COMMAND,
      (event) => {
        event.preventDefault();
        return true;
      },
      COMMAND_PRIORITY_HIGH
    );
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      DROP_COMMAND,
      (event) => {
        handleDrop(event);
        return true;
      },
      COMMAND_PRIORITY_HIGH
    );
  }, [editor, handleDrop]);

  return null;
}
