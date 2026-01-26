"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
} from "lexical";
import { mergeRegister } from "@lexical/utils";
import { Button } from "~/components/ui/button";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  ImagePlus,
  Paperclip,
} from "lucide-react";
import { cn } from "~/lib/utils";
import { $createAttachmentNode, type AttachmentType } from "../nodes/AttachmentNode";
import { api } from "~/lib/trpc/client";

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadMutation = api.upload.getUploadUrl.useMutation();

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsCode(selection.hasFormat("code"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      )
    );
  }, [editor, updateToolbar]);

  const handleFileUpload = useCallback(
    async (file: File) => {
      setIsUploading(true);
      try {
        // Get presigned URL
        const result = await uploadMutation.mutateAsync({
          filename: file.name,
          contentType: file.type,
          size: file.size,
        });

        // Upload to R2
        const uploadResponse = await fetch(result.uploadUrl, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        });

        if (!uploadResponse.ok) {
          const errorText = await uploadResponse.text();
          console.error("R2 upload failed:", uploadResponse.status, errorText);
          alert(`Upload failed: ${uploadResponse.status} - Check CORS configuration on R2 bucket`);
          return;
        }

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
        const message = error instanceof Error ? error.message : "Unknown error";
        alert(`Upload failed: ${message}`);
      } finally {
        setIsUploading(false);
      }
    },
    [editor, uploadMutation]
  );

  return (
    <div className="relative z-20 flex items-center gap-0.5 border-b border-border px-2 py-1">
      {/* Hidden file inputs */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleFileUpload(file);
          }
          e.target.value = "";
        }}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="*/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleFileUpload(file);
          }
          e.target.value = "";
        }}
      />

      {/* Text formatting buttons */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn("h-8 w-8 p-0", isBold && "bg-muted")}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        title="Bold (⌘B)"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn("h-8 w-8 p-0", isItalic && "bg-muted")}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        title="Italic (⌘I)"
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn("h-8 w-8 p-0", isUnderline && "bg-muted")}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
        title="Underline (⌘U)"
      >
        <Underline className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn("h-8 w-8 p-0", isStrikethrough && "bg-muted")}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")}
        title="Strikethrough"
      >
        <Strikethrough className="h-4 w-4" />
      </Button>
      <div className="mx-1 h-4 w-px bg-border" />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn("h-8 w-8 p-0", isCode && "bg-muted")}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")}
        title="Inline Code"
      >
        <Code className="h-4 w-4" />
      </Button>

      <div className="mx-1 h-4 w-px bg-border" />

      {/* Direct attachment buttons */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-8 gap-1.5 px-2"
        disabled={isUploading}
        onClick={() => imageInputRef.current?.click()}
        title="Add image or video"
      >
        <ImagePlus className="h-4 w-4" />
        <span className="text-xs">Image</span>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-8 gap-1.5 px-2"
        disabled={isUploading}
        onClick={() => fileInputRef.current?.click()}
        title="Add file"
      >
        <Paperclip className="h-4 w-4" />
        <span className="text-xs">File</span>
      </Button>

      {isUploading && (
        <span className="ml-2 text-xs text-muted-foreground">Uploading...</span>
      )}
    </div>
  );
}
