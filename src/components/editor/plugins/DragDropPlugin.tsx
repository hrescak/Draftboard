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
import { $createAttachmentNode, type AttachmentType } from "../nodes/AttachmentNode";
import { useUpload } from "~/lib/hooks/use-upload";

export function DragDropPlugin() {
  const [editor] = useLexicalComposerContext();
  const { uploadFile } = useUpload();

  const handleDrop = useCallback(
    async (event: DragEvent) => {
      const files = event.dataTransfer?.files;
      if (!files || files.length === 0) return false;

      event.preventDefault();

      for (const file of Array.from(files)) {
        try {
          const { url } = await uploadFile(file);

          let attachmentType: AttachmentType = "FILE";
          if (file.type.startsWith("image/")) {
            attachmentType = "IMAGE";
          } else if (file.type.startsWith("video/")) {
            attachmentType = "VIDEO";
          }

          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              const attachmentNode = $createAttachmentNode({
                attachmentType,
                url,
                filename: file.name,
                mimeType: file.type,
                size: file.size,
              });
              selection.insertNodes([attachmentNode, $createParagraphNode()]);
            }
          });
        } catch (error) {
          console.error("Upload failed:", error);
        }
      }

      return true;
    },
    [editor, uploadFile]
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
