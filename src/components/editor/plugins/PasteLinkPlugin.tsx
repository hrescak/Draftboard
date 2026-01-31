"use client";

import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_HIGH,
  PASTE_COMMAND,
} from "lexical";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";

// Simple URL validation regex
const URL_REGEX = /^(https?:\/\/|www\.)[^\s]+$/i;

function isValidUrl(text: string): boolean {
  return URL_REGEX.test(text.trim());
}

/**
 * Plugin that converts selected text into a link when pasting a URL.
 * If text is selected and a valid URL is pasted, the selected text becomes
 * a link with the pasted URL as the href.
 */
export function PasteLinkPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      PASTE_COMMAND,
      (event: ClipboardEvent) => {
        const clipboardData = event.clipboardData;
        if (!clipboardData) return false;

        const pastedText = clipboardData.getData("text/plain");
        if (!pastedText || !isValidUrl(pastedText)) return false;

        // Check if there's selected text
        const selection = $getSelection();
        if (!$isRangeSelection(selection) || selection.isCollapsed()) {
          return false;
        }

        // We have selected text and a valid URL - create a link
        event.preventDefault();

        // Normalize URL (add https:// if it starts with www.)
        let url = pastedText.trim();
        if (url.startsWith("www.")) {
          url = "https://" + url;
        }

        editor.dispatchCommand(TOGGLE_LINK_COMMAND, {
          url,
          target: "_blank",
          rel: "noopener noreferrer",
        });
        return true;
      },
      COMMAND_PRIORITY_HIGH
    );
  }, [editor]);

  return null;
}
