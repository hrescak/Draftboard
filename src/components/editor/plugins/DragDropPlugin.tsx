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
import { api } from "~/lib/trpc/client";

export function DragDropPlugin() {
  const [editor] = useLexicalComposerContext();
  const uploadMutation = api.upload.getUploadUrl.useMutation();

  const handleDrop = useCallback(
    async (event: DragEvent) => {
      const files = event.dataTransfer?.files;
      if (!files || files.length === 0) return false;

      event.preventDefault();

      for (const file of Array.from(files)) {
        try {
          const result = await uploadMutation.mutateAsync({
            filename: file.name,
            contentType: file.type,
            size: file.size,
          });

          // Upload to R2
          await fetch(result.uploadUrl, {
            method: "PUT",
            body: file,
            headers: {
              "Content-Type": file.type,
            },
          });

          // Determine attachment type
          let attachmentType: AttachmentType = "FILE";
          if (file.type.startsWith("image/")) {
            attachmentType = "IMAGE";
          } else if (file.type.startsWith("video/")) {
            attachmentType = "VIDEO";
          }

          // Insert attachment node
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              const attachmentNode = $createAttachmentNode({
                attachmentType,
                url: result.publicUrl,
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
    [editor, uploadMutation]
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
