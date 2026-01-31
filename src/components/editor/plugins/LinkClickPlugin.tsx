"use client";

import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

/**
 * Plugin that makes all links in the editor open in a new tab.
 * This handles links created via any method (markdown, paste, Cmd+K).
 */
export function LinkClickPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const rootElement = editor.getRootElement();
    if (!rootElement) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest("a");
      
      if (link && link.href) {
        // Prevent default navigation
        event.preventDefault();
        // Open in new tab
        window.open(link.href, "_blank", "noopener,noreferrer");
      }
    };

    rootElement.addEventListener("click", handleClick);
    return () => {
      rootElement.removeEventListener("click", handleClick);
    };
  }, [editor]);

  return null;
}
