"use client";

import { useCallback, useState } from "react";
import {
  LexicalComposer,
  type InitialConfigType,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { CodeNode, CodeHighlightNode } from "@lexical/code";
import { TRANSFORMERS } from "@lexical/markdown";
import type { EditorState, SerializedEditorState } from "lexical";

import { MentionNode } from "./nodes/MentionNode";
import { ImageNode } from "./nodes/ImageNode";
import { AttachmentNode } from "./nodes/AttachmentNode";
import { MentionPlugin } from "./plugins/MentionPlugin";
import { SlashCommandPlugin } from "./plugins/SlashCommandPlugin";
import { DragDropPlugin } from "./plugins/DragDropPlugin";
import { FloatingAddButtonPlugin } from "./plugins/FloatingAddButtonPlugin";
import { NodeDeletionPlugin } from "./plugins/NodeDeletionPlugin";
import { PasteLinkPlugin } from "./plugins/PasteLinkPlugin";
import { LinkClickPlugin } from "./plugins/LinkClickPlugin";
import { ToolbarPlugin } from "./toolbar/ToolbarPlugin";
import { cn } from "~/lib/utils";

interface EditorProps {
  initialContent?: SerializedEditorState | null;
  onChange?: (editorState: SerializedEditorState) => void;
  placeholder?: string;
  editable?: boolean;
  showToolbar?: boolean;
  minHeight?: string;
  className?: string;
}

const theme = {
  paragraph: "mb-2",
  heading: {
    h1: "text-3xl font-semibold mb-4 mt-6",
    h2: "text-2xl font-semibold mb-3 mt-5",
    h3: "text-xl font-semibold mb-2 mt-4",
  },
  list: {
    ul: "list-disc ml-4 mb-2",
    ol: "list-decimal ml-4 mb-2",
    listitem: "mb-1",
  },
  quote: "border-l-4 border-primary/30 pl-4 italic text-muted-foreground my-4",
  code: "font-mono bg-muted px-1.5 py-0.5 rounded text-sm",
  codeHighlight: {
    atrule: "text-purple-500",
    attr: "text-yellow-500",
    boolean: "text-purple-500",
    builtin: "text-cyan-500",
    cdata: "text-gray-500",
    char: "text-green-500",
    class: "text-yellow-500",
    "class-name": "text-yellow-500",
    comment: "text-gray-500",
    constant: "text-purple-500",
    deleted: "text-red-500",
    doctype: "text-gray-500",
    entity: "text-red-500",
    function: "text-blue-500",
    important: "text-purple-500",
    inserted: "text-green-500",
    keyword: "text-purple-500",
    namespace: "text-purple-500",
    number: "text-purple-500",
    operator: "text-gray-500",
    prolog: "text-gray-500",
    property: "text-red-500",
    punctuation: "text-gray-500",
    regex: "text-green-500",
    selector: "text-green-500",
    string: "text-green-500",
    symbol: "text-purple-500",
    tag: "text-red-500",
    url: "text-blue-500",
    variable: "text-orange-500",
  },
  link: "text-primary underline cursor-pointer hover:text-primary/80",
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through",
    code: "font-mono bg-muted px-1.5 py-0.5 rounded text-sm",
  },
};

export function Editor({
  initialContent,
  onChange,
  placeholder = "Start writing, type / for commands or click + to add...",
  editable = true,
  showToolbar = true,
  minHeight = "200px",
  className,
}: EditorProps) {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = useCallback((elem: HTMLDivElement | null) => {
    if (elem !== null) {
      setFloatingAnchorElem(elem);
    }
  }, []);

  const handleChange = useCallback(
    (editorState: EditorState) => {
      if (onChange) {
        onChange(editorState.toJSON());
      }
    },
    [onChange]
  );

  const initialConfig: InitialConfigType = {
    namespace: "DraftboardEditor",
    theme,
    onError: (error: Error) => {
      console.error("Lexical error:", error);
    },
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      LinkNode,
      AutoLinkNode,
      CodeNode,
      CodeHighlightNode,
      MentionNode,
      ImageNode,
      AttachmentNode,
    ],
    editorState: initialContent ? JSON.stringify(initialContent) : undefined,
    editable,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className={cn("editor-container relative", className)}>
        {showToolbar && editable && <ToolbarPlugin />}
        <div className="relative" ref={onRef}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="editor-input outline-none"
                style={{ minHeight }}
              />
            }
            placeholder={
              <div className="editor-placeholder">{placeholder}</div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        <ListPlugin />
        <LinkPlugin />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        <OnChangePlugin onChange={handleChange} />
        {editable && <MentionPlugin />}
        {editable && <NodeDeletionPlugin />}
        {editable && <PasteLinkPlugin />}
        <LinkClickPlugin />
        {editable && floatingAnchorElem && (
          <>
            <SlashCommandPlugin anchorElem={floatingAnchorElem} />
            <DragDropPlugin />
            <FloatingAddButtonPlugin anchorElem={floatingAnchorElem} />
          </>
        )}
      </div>
    </LexicalComposer>
  );
}

// Read-only version for displaying content
export function EditorContent({
  content,
  className,
}: {
  content: SerializedEditorState;
  className?: string;
}) {
  return (
    <Editor
      initialContent={content}
      editable={false}
      showToolbar={false}
      minHeight="auto"
      className={className}
    />
  );
}
