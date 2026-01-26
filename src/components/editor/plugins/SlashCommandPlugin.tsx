"use client";

import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  KEY_ARROW_DOWN_COMMAND,
  KEY_ARROW_UP_COMMAND,
  KEY_ENTER_COMMAND,
  KEY_ESCAPE_COMMAND,
  KEY_TAB_COMMAND,
  TextNode,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from "@lexical/list";
import { mergeRegister } from "@lexical/utils";
import { createPortal } from "react-dom";
import {
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  ImagePlus,
  FileUp,
} from "lucide-react";
import { $createAttachmentNode, type AttachmentType } from "../nodes/AttachmentNode";
import { api } from "~/lib/trpc/client";

interface CommandOption {
  name: string;
  command: string;
  icon: React.ReactNode;
  description: string;
}

const COMMANDS: CommandOption[] = [
  {
    name: "Heading 1",
    command: "heading1",
    icon: <Heading1 className="h-4 w-4" />,
    description: "Large section heading",
  },
  {
    name: "Heading 2",
    command: "heading2",
    icon: <Heading2 className="h-4 w-4" />,
    description: "Medium section heading",
  },
  {
    name: "Heading 3",
    command: "heading3",
    icon: <Heading3 className="h-4 w-4" />,
    description: "Small section heading",
  },
  {
    name: "Bullet List",
    command: "bulletList",
    icon: <List className="h-4 w-4" />,
    description: "Create a bullet list",
  },
  {
    name: "Numbered List",
    command: "numberedList",
    icon: <ListOrdered className="h-4 w-4" />,
    description: "Create a numbered list",
  },
  {
    name: "Quote",
    command: "quote",
    icon: <Quote className="h-4 w-4" />,
    description: "Add a block quote",
  },
  {
    name: "Image",
    command: "image",
    icon: <ImagePlus className="h-4 w-4" />,
    description: "Upload an image",
  },
  {
    name: "File",
    command: "file",
    icon: <FileUp className="h-4 w-4" />,
    description: "Upload any file",
  },
];

interface SlashCommandPluginProps {
  anchorElem: HTMLElement;
}

export function SlashCommandPlugin({ anchorElem }: SlashCommandPluginProps) {
  const [editor] = useLexicalComposerContext();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadMutation = api.upload.getUploadUrl.useMutation();
  const pendingCommandRef = useRef<string | null>(null);

  const filteredCommands = useMemo(() => {
    if (!query) return COMMANDS;
    const lowerQuery = query.toLowerCase();
    return COMMANDS.filter(
      (cmd) =>
        cmd.name.toLowerCase().includes(lowerQuery) ||
        cmd.description.toLowerCase().includes(lowerQuery) ||
        cmd.command.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  // Reset selected index when filtered commands change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCommands.length]);

  const handleFileUpload = useCallback(
    async (file: File) => {
      try {
        const result = await uploadMutation.mutateAsync({
          filename: file.name,
          contentType: file.type,
          size: file.size,
        });

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
          alert(`Upload failed: ${uploadResponse.status} - ${errorText || "Unknown error"}`);
          return;
        }

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
        alert(`Upload failed: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    },
    [editor, uploadMutation]
  );

  const executeCommand = useCallback(
    (command: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return;

        // Remove the slash and query text
        const anchor = selection.anchor;
        const anchorNode = anchor.getNode();
        if (anchorNode instanceof TextNode) {
          const textContent = anchorNode.getTextContent();
          const slashIndex = textContent.lastIndexOf("/");
          if (slashIndex !== -1) {
            const newText = textContent.slice(0, slashIndex);
            if (newText) {
              anchorNode.setTextContent(newText);
              selection.setTextNodeRange(anchorNode, newText.length, anchorNode, newText.length);
            } else {
              anchorNode.remove();
            }
          }
        }

        switch (command) {
          case "heading1":
            $setBlocksType(selection, () => $createHeadingNode("h1"));
            break;
          case "heading2":
            $setBlocksType(selection, () => $createHeadingNode("h2"));
            break;
          case "heading3":
            $setBlocksType(selection, () => $createHeadingNode("h3"));
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
          case "image":
          case "file":
            pendingCommandRef.current = command;
            setTimeout(() => {
              if (fileInputRef.current) {
                fileInputRef.current.accept = command === "image" ? "image/*,video/*" : "*/*";
                fileInputRef.current.click();
              }
            }, 0);
            break;
        }
      });

      setIsOpen(false);
      setQuery("");
    },
    [editor]
  );

  // Listen for text changes to detect slash commands
  useEffect(() => {
    return editor.registerTextContentListener((text) => {
      editor.getEditorState().read(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) {
          setIsOpen(false);
          return;
        }

        const anchor = selection.anchor;
        const anchorNode = anchor.getNode();

        if (!(anchorNode instanceof TextNode)) {
          setIsOpen(false);
          return;
        }

        const textContent = anchorNode.getTextContent();
        const anchorOffset = anchor.offset;
        const textBeforeCursor = textContent.slice(0, anchorOffset);

        // Find the last slash in the text before cursor
        const slashIndex = textBeforeCursor.lastIndexOf("/");

        if (slashIndex === -1) {
          setIsOpen(false);
          return;
        }

        // Check if slash is at start of line or preceded by whitespace
        const charBeforeSlash = textBeforeCursor[slashIndex - 1];
        if (slashIndex > 0 && charBeforeSlash !== " " && charBeforeSlash !== "\n") {
          setIsOpen(false);
          return;
        }

        // Extract query after slash
        const queryText = textBeforeCursor.slice(slashIndex + 1);

        // Don't show menu if there's a space in the query (command ended)
        if (queryText.includes(" ")) {
          setIsOpen(false);
          return;
        }

        setQuery(queryText);
        setIsOpen(true);

        // Get position for menu
        const domSelection = window.getSelection();
        if (domSelection && domSelection.rangeCount > 0) {
          const range = domSelection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          const editorRect = anchorElem.getBoundingClientRect();

          setPosition({
            top: rect.bottom - editorRect.top + 4,
            left: rect.left - editorRect.left,
          });
        }
      });
    });
  }, [editor, anchorElem]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    return mergeRegister(
      editor.registerCommand(
        KEY_ARROW_DOWN_COMMAND,
        (event) => {
          event.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredCommands.length - 1 ? prev + 1 : 0
          );
          return true;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_ARROW_UP_COMMAND,
        (event) => {
          event.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredCommands.length - 1
          );
          return true;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_ENTER_COMMAND,
        (event) => {
          if (filteredCommands[selectedIndex]) {
            event?.preventDefault();
            executeCommand(filteredCommands[selectedIndex].command);
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_TAB_COMMAND,
        (event) => {
          if (filteredCommands[selectedIndex]) {
            event.preventDefault();
            executeCommand(filteredCommands[selectedIndex].command);
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_ESCAPE_COMMAND,
        () => {
          setIsOpen(false);
          setQuery("");
          return true;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [editor, isOpen, filteredCommands, selectedIndex, executeCommand]);

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
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
          pendingCommandRef.current = null;
        }}
      />
      {isOpen && filteredCommands.length > 0 && createPortal(
        <div
          ref={menuRef}
          className="absolute z-50 min-w-[280px] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
          style={{ top: position.top, left: position.left }}
        >
          <ul role="listbox">
            {filteredCommands.map((option, index) => (
              <li
                key={option.command}
                role="option"
                aria-selected={selectedIndex === index}
                onClick={() => executeCommand(option.command)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm ${
                  selectedIndex === index ? "bg-accent text-accent-foreground" : ""
                }`}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md border bg-background">
                  {option.icon}
                </div>
                <div>
                  <p className="font-medium">{option.name}</p>
                  <p className="text-xs text-muted-foreground">{option.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>,
        anchorElem
      )}
    </>
  );
}
