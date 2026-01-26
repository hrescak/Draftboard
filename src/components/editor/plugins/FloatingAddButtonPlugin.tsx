"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  $getNodeByKey,
  $isParagraphNode,
  COMMAND_PRIORITY_LOW,
  KEY_ARROW_DOWN_COMMAND,
  KEY_ARROW_UP_COMMAND,
} from "lexical";
import { createPortal } from "react-dom";
import {
  Plus,
  ImagePlus,
  FileUp,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  X,
} from "lucide-react";
import { $createAttachmentNode, type AttachmentType } from "../nodes/AttachmentNode";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from "@lexical/list";
import { api } from "~/lib/trpc/client";
import { cn } from "~/lib/utils";

interface FloatingAddButtonPluginProps {
  anchorElem: HTMLElement;
}

export function FloatingAddButtonPlugin({ anchorElem }: FloatingAddButtonPluginProps) {
  const [editor] = useLexicalComposerContext();
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0 });
  const [isEmpty, setIsEmpty] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadMutation = api.upload.getUploadUrl.useMutation();

  const updatePosition = useCallback(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) {
        setIsVisible(false);
        return;
      }

      const anchor = selection.anchor;
      const anchorNode = anchor.getNode();
      const topLevelElement = anchorNode.getTopLevelElement();

      if (!topLevelElement) {
        setIsVisible(false);
        return;
      }

      // Check if the current block is empty (only for paragraphs)
      const isEmptyParagraph = $isParagraphNode(topLevelElement) &&
        topLevelElement.getTextContent().trim() === "";

      setIsEmpty(isEmptyParagraph);

      const key = topLevelElement.getKey();
      const elem = editor.getElementByKey(key);

      if (!elem) {
        setIsVisible(false);
        return;
      }

      const editorRect = anchorElem.getBoundingClientRect();
      const elemRect = elem.getBoundingClientRect();

      setPosition({
        top: elemRect.top - editorRect.top + 4,
      });
      setIsVisible(true);
    });
  }, [editor, anchorElem]);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updatePosition();
      });
    });
  }, [editor, updatePosition]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const handleFileUpload = useCallback(
    async (file: File) => {
      setIsMenuOpen(false);
      try {
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
      }
    },
    [editor, uploadMutation]
  );

  const triggerFileInput = (accept: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = accept;
      fileInputRef.current.click();
    }
  };

  const insertBlock = (type: string) => {
    setIsMenuOpen(false);
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;

      switch (type) {
        case "h1":
          $setBlocksType(selection, () => $createHeadingNode("h1"));
          break;
        case "h2":
          $setBlocksType(selection, () => $createHeadingNode("h2"));
          break;
        case "bulletList":
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
          break;
        case "numberedList":
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
          break;
        case "quote":
          $setBlocksType(selection, () => $createQuoteNode());
          break;
      }
    });
  };

  if (!isVisible) return null;

  return createPortal(
    <div
      ref={buttonRef}
      className="absolute -left-8 z-10 transition-opacity"
      style={{ top: position.top }}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleFileUpload(file);
          }
          e.target.value = "";
        }}
      />

      <button
        type="button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-full border bg-background text-muted-foreground transition-all hover:bg-muted hover:text-foreground",
          isMenuOpen && "rotate-45 bg-muted text-foreground",
          !isEmpty && "opacity-0 hover:opacity-100"
        )}
      >
        <Plus className="h-4 w-4" />
      </button>

      {isMenuOpen && (
        <div className="absolute left-0 top-8 z-50 min-w-[200px] overflow-hidden rounded-lg border bg-popover p-1 shadow-lg animate-in fade-in-0 zoom-in-95">
          <p className="px-2 py-1 text-xs font-medium text-muted-foreground">
            Add blocks
          </p>
          <button
            onClick={() => triggerFileInput("image/*")}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md border bg-background">
              <ImagePlus className="h-4 w-4" />
            </div>
            <div className="text-left">
              <p className="font-medium">Image</p>
              <p className="text-xs text-muted-foreground">Upload an image</p>
            </div>
          </button>
          <button
            onClick={() => triggerFileInput("*/*")}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md border bg-background">
              <FileUp className="h-4 w-4" />
            </div>
            <div className="text-left">
              <p className="font-medium">File</p>
              <p className="text-xs text-muted-foreground">Upload any file</p>
            </div>
          </button>
          <div className="my-1 h-px bg-border" />
          <button
            onClick={() => insertBlock("h1")}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md border bg-background">
              <Heading1 className="h-4 w-4" />
            </div>
            <span>Heading 1</span>
          </button>
          <button
            onClick={() => insertBlock("h2")}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md border bg-background">
              <Heading2 className="h-4 w-4" />
            </div>
            <span>Heading 2</span>
          </button>
          <button
            onClick={() => insertBlock("bulletList")}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md border bg-background">
              <List className="h-4 w-4" />
            </div>
            <span>Bullet List</span>
          </button>
          <button
            onClick={() => insertBlock("numberedList")}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md border bg-background">
              <ListOrdered className="h-4 w-4" />
            </div>
            <span>Numbered List</span>
          </button>
          <button
            onClick={() => insertBlock("quote")}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md border bg-background">
              <Quote className="h-4 w-4" />
            </div>
            <span>Quote</span>
          </button>
        </div>
      )}
    </div>,
    anchorElem
  );
}
