"use client";

import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
} from "lexical";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";

export function KeyboardShortcutsPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMod = event.metaKey || event.ctrlKey;

      if (!isMod) return;

      // Cmd/Ctrl + B for bold
      if (event.key === "b") {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        return;
      }

      // Cmd/Ctrl + I for italic
      if (event.key === "i") {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        return;
      }

      // Cmd/Ctrl + K for link
      if (event.key === "k") {
        event.preventDefault();
        editor.update(() => {
          const selection = $getSelection();
          if (!$isRangeSelection(selection)) return;

          // Check if we're already in a link by checking parent nodes
          const nodes = selection.getNodes();
          const isInLink = nodes.some((node) => {
            let current = node.getParent();
            while (current !== null) {
              if ($isLinkNode(current)) {
                return true;
              }
              current = current.getParent();
            }
            return false;
          });

          if (isInLink) {
            // Remove the link
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
          } else {
            // Prompt for URL
            const url = prompt("Enter URL:");
            if (url) {
              editor.dispatchCommand(TOGGLE_LINK_COMMAND, {
                url,
                target: "_blank",
                rel: "noopener noreferrer",
              });
            }
          }
        });
        return;
      }
    };

    const rootElement = editor.getRootElement();
    if (rootElement) {
      rootElement.addEventListener("keydown", handleKeyDown);
      return () => {
        rootElement.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [editor]);

  return null;
}
