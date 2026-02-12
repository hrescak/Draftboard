"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { SimpleMarkdownEditor } from "~/components/editor/SimpleMarkdownEditor";
import { FeedbackAudioRecorder, type RecordedAudio } from "~/components/feedback/FeedbackAudioRecorder";
import type { SerializedEditorState } from "lexical";
import { cn } from "~/lib/utils";

function hasEditorContent(editorState: SerializedEditorState | null): boolean {
  if (!editorState) return false;
  const root = editorState.root;
  if (!root || !Array.isArray(root.children)) return false;

  for (const child of root.children) {
    const node = child as {
      type: string;
      children?: Array<{ type: string; text?: string }>;
    };

    if (node.type === "paragraph" && Array.isArray(node.children)) {
      for (const textNode of node.children) {
        if (textNode.type === "text" && textNode.text?.trim()) {
          return true;
        }
        if (textNode.type === "mention") {
          return true;
        }
      }
    }

    if (node.type === "list") {
      return true;
    }
  }

  return false;
}

interface FeedbackRegionComposerProps {
  open: boolean;
  submitting?: boolean;
  maxAudioDurationSec: number;
  className?: string;
  onCancel: () => void;
  onSubmit: (payload: {
    body?: SerializedEditorState;
    audio?: RecordedAudio;
  }) => Promise<void> | void;
}

export function FeedbackRegionComposer({
  open,
  submitting = false,
  maxAudioDurationSec,
  className,
  onCancel,
  onSubmit,
}: FeedbackRegionComposerProps) {
  const [body, setBody] = useState<SerializedEditorState | null>(null);
  const [audio, setAudio] = useState<RecordedAudio | null>(null);
  const [isAudioRecording, setIsAudioRecording] = useState(false);
  const [isAudioUploading, setIsAudioUploading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canSubmit =
    (hasEditorContent(body) || !!audio) && !isAudioRecording && !isAudioUploading;

  const handleSubmit = useCallback(async () => {
    if (!canSubmit || submitting || isAudioRecording || isAudioUploading) {
      return;
    }

    setLocalError(null);

    try {
      await onSubmit({
        body: body ?? undefined,
        audio: audio ?? undefined,
      });

      setBody(null);
      setAudio(null);
    } catch (error) {
      setLocalError(
        error instanceof Error ? error.message : "Failed to submit feedback"
      );
    }
  }, [
    audio,
    body,
    canSubmit,
    isAudioRecording,
    isAudioUploading,
    onSubmit,
    submitting,
  ]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      event.preventDefault();
      onCancel();
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      if (containerRef.current?.contains(target)) {
        return;
      }

      onCancel();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [onCancel, open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key !== "Enter" ||
        (!event.metaKey && !event.ctrlKey) ||
        submitting
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Node) || !containerRef.current?.contains(target)) {
        return;
      }

      event.preventDefault();
      void handleSubmit();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSubmit, open, submitting]);

  if (!open) {
    return null;
  }

  return (
    <Card ref={containerRef} className={cn("rounded-xl shadow-lg", className)}>
      <CardHeader className="space-y-1 px-3 py-2 pb-1.5">
        <CardTitle className="text-sm">Add Region Feedback</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 px-3 pb-3 pt-0">
        <SimpleMarkdownEditor
          onChange={setBody}
          placeholder="What should change in this region?"
          minHeight="56px"
          autoFocus
        />

        <FeedbackAudioRecorder
          maxDurationSec={maxAudioDurationSec}
          onRecorded={setAudio}
          onRecordingStateChange={setIsAudioRecording}
          onUploadStateChange={setIsAudioUploading}
          onClear={() => setAudio(null)}
          action={
            <Button
              type="button"
              size="sm"
              onClick={handleSubmit}
              disabled={
                !canSubmit || submitting || isAudioRecording || isAudioUploading
              }
              className="gap-2"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Submit Feedback
            </Button>
          }
        />

        {localError && <p className="text-xs text-destructive">{localError}</p>}
      </CardContent>
    </Card>
  );
}
