"use client";

import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isNodeSelection,
  COMMAND_PRIORITY_LOW,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
} from "lexical";

export function NodeDeletionPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const removeBackspace = editor.registerCommand(
      KEY_BACKSPACE_COMMAND,
      () => {
        const selection = $getSelection();
        if ($isNodeSelection(selection)) {
          const nodes = selection.getNodes();
          nodes.forEach((node) => {
            node.remove();
          });
          return true;
        }
        return false;
      },
      COMMAND_PRIORITY_LOW
    );

    const removeDelete = editor.registerCommand(
      KEY_DELETE_COMMAND,
      () => {
        const selection = $getSelection();
        if ($isNodeSelection(selection)) {
          const nodes = selection.getNodes();
          nodes.forEach((node) => {
            node.remove();
          });
          return true;
        }
        return false;
      },
      COMMAND_PRIORITY_LOW
    );

    return () => {
      removeBackspace();
      removeDelete();
    };
  }, [editor]);

  return null;
}
