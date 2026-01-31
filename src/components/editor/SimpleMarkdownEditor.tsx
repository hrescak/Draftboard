"use client";

import { useCallback, useEffect, useRef } from "react";
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
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ListItemNode, ListNode } from "@lexical/list";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import {
  BOLD_ITALIC_STAR,
  BOLD_ITALIC_UNDERSCORE,
  BOLD_STAR,
  BOLD_UNDERSCORE,
  ITALIC_STAR,
  ITALIC_UNDERSCORE,
  LINK,
  ORDERED_LIST,
  UNORDERED_LIST,
} from "@lexical/markdown";
import type { EditorState, SerializedEditorState } from "lexical";

import { KeyboardShortcutsPlugin } from "./plugins/KeyboardShortcutsPlugin";
import { PasteLinkPlugin } from "./plugins/PasteLinkPlugin";
import { LinkClickPlugin } from "./plugins/LinkClickPlugin";
import { cn } from "~/lib/utils";

// Only include the transformers we want for simple markdown
const SIMPLE_TRANSFORMERS = [
  BOLD_ITALIC_STAR,
  BOLD_ITALIC_UNDERSCORE,
  BOLD_STAR,
  BOLD_UNDERSCORE,
  ITALIC_STAR,
  ITALIC_UNDERSCORE,
  LINK,
  ORDERED_LIST,
  UNORDERED_LIST,
];

interface SimpleMarkdownEditorProps {
  initialContent?: SerializedEditorState | null;
  onChange?: (editorState: SerializedEditorState) => void;
  placeholder?: string;
  disabled?: boolean;
  minHeight?: string;
  className?: string;
  autoFocus?: boolean;
}

const theme = {
  paragraph: "",
  list: {
    ul: "list-disc ml-4",
    ol: "list-decimal ml-4",
    listitem: "",
  },
  link: "text-primary underline cursor-pointer hover:text-primary/80",
  text: {
    bold: "font-bold",
    italic: "italic",
  },
};

// Plugin to handle submit on Enter (without shift)
function SubmitOnEnterPlugin({
  onSubmit,
}: {
  onSubmit?: () => void;
}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && !event.shiftKey && onSubmit) {
        event.preventDefault();
        onSubmit();
      }
    };

    const rootElement = editor.getRootElement();
    if (rootElement) {
      rootElement.addEventListener("keydown", handleKeyDown);
      return () => {
        rootElement.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [editor, onSubmit]);

  return null;
}

// Plugin to auto-focus the editor
function AutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.focus();
  }, [editor]);

  return null;
}

// Internal editor component with ref access
function SimpleMarkdownEditorInner({
  initialContent,
  onChange,
  placeholder = "Write something...",
  disabled = false,
  minHeight = "60px",
  className,
  autoFocus = false,
  onSubmit,
  editorRef,
}: SimpleMarkdownEditorProps & {
  onSubmit?: () => void;
  editorRef?: React.MutableRefObject<{ clear: () => void } | null>;
}) {
  const handleChange = useCallback(
    (editorState: EditorState) => {
      if (onChange) {
        onChange(editorState.toJSON());
      }
    },
    [onChange]
  );

  const initialConfig: InitialConfigType = {
    namespace: "SimpleMarkdownEditor",
    theme,
    onError: (error: Error) => {
      console.error("SimpleMarkdownEditor error:", error);
    },
    nodes: [ListNode, ListItemNode, LinkNode, AutoLinkNode],
    editorState: initialContent ? JSON.stringify(initialContent) : undefined,
    editable: !disabled,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className={cn("simple-markdown-editor relative", className)}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className={cn(
                "outline-none text-sm",
                disabled && "opacity-50 cursor-not-allowed"
              )}
              style={{ minHeight }}
            />
          }
          placeholder={
            <div
              className="pointer-events-none absolute left-0 top-0 text-sm text-muted-foreground"
              style={{ minHeight }}
            >
              {placeholder}
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <ListPlugin />
        <LinkPlugin />
        <MarkdownShortcutPlugin transformers={SIMPLE_TRANSFORMERS} />
        <OnChangePlugin onChange={handleChange} />
        {!disabled && <KeyboardShortcutsPlugin />}
        {!disabled && <PasteLinkPlugin />}
        <LinkClickPlugin />
        {!disabled && onSubmit && <SubmitOnEnterPlugin onSubmit={onSubmit} />}
        {autoFocus && <AutoFocusPlugin />}
        {editorRef && <EditorRefPlugin editorRef={editorRef} />}
      </div>
    </LexicalComposer>
  );
}

// Plugin to expose editor methods via ref
function EditorRefPlugin({
  editorRef,
}: {
  editorRef: React.MutableRefObject<{ clear: () => void } | null>;
}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editorRef.current = {
      clear: () => {
        editor.update(() => {
          const root = editor.getRootElement();
          if (root) {
            editor.setEditorState(editor.parseEditorState('{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'));
          }
        });
      },
    };
  }, [editor, editorRef]);

  return null;
}

export function SimpleMarkdownEditor(
  props: SimpleMarkdownEditorProps & {
    onSubmit?: () => void;
    editorRef?: React.MutableRefObject<{ clear: () => void } | null>;
  }
) {
  return <SimpleMarkdownEditorInner {...props} />;
}

// Read-only version for displaying content
export function SimpleMarkdownContent({
  content,
  className,
}: {
  content: SerializedEditorState;
  className?: string;
}) {
  const initialConfig: InitialConfigType = {
    namespace: "SimpleMarkdownContent",
    theme,
    onError: (error: Error) => {
      console.error("SimpleMarkdownContent error:", error);
    },
    nodes: [ListNode, ListItemNode, LinkNode, AutoLinkNode],
    editorState: JSON.stringify(content),
    editable: false,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={
          <ContentEditable className={cn("outline-none text-sm", className)} />
        }
        placeholder={null}
        ErrorBoundary={LexicalErrorBoundary}
      />
    </LexicalComposer>
  );
}
