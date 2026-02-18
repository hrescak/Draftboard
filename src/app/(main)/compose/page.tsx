"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  PostEditor,
  extractAttachments,
  type PostEditorData,
} from "~/components/post/PostEditor";
import { api } from "~/lib/trpc/client";
import type { SerializedEditorState } from "lexical";

const AUTOSAVE_DELAY = 1500; // 1.5 seconds debounce

export default function ComposePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const draftId = searchParams.get("draft");
  const prefillLiveUrl = !draftId ? searchParams.get("liveUrl") || "" : "";
  const prefillTitle = !draftId ? searchParams.get("title") || "" : "";

  const [editorData, setEditorData] = useState<PostEditorData>({
    title: prefillTitle,
    content: null,
    liveUrl: prefillLiveUrl,
    projects: [],
    hideFromHome: false,
  });
  const [currentDraftId, setCurrentDraftId] = useState<string | null>(draftId);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  const autosaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isLoadedRef = useRef(false);
  const isInitialRenderRef = useRef(true);
  const currentDraftIdRef = useRef<string | null>(draftId);
  // Stable key for Editor - only set once on mount to prevent remount after first save
  const editorKeyRef = useRef<string>(draftId || "new");

  // Load existing draft if draftId is provided
  const { data: existingDraft, isLoading: isDraftLoading } =
    api.draft.getById.useQuery(
      { id: draftId! },
      { enabled: !!draftId && !isLoadedRef.current }
    );

  // Initialize form with draft data
  useEffect(() => {
    if (existingDraft && !isLoadedRef.current) {
      setEditorData({
        title: existingDraft.title || "",
        content: existingDraft.content as SerializedEditorState | null,
        liveUrl: existingDraft.liveUrl || "",
        projects: [], // Drafts don't store projects currently
        hideFromHome: false,
      });
      setCurrentDraftId(existingDraft.id);
      isLoadedRef.current = true;
    }
  }, [existingDraft]);

  const utils = api.useUtils();

  const saveDraftMutation = api.draft.save.useMutation({
    onSuccess: (draft) => {
      const isNewDraft = !currentDraftIdRef.current;
      currentDraftIdRef.current = draft.id;
      setCurrentDraftId(draft.id);
      setLastSaved(new Date());
      setIsSaving(false);
      // Mark as loaded so we don't show the loading screen
      isLoadedRef.current = true;
      // Invalidate draft list so it appears in the menu immediately
      utils.draft.list.invalidate();
      // Update URL with draft ID if it's a new draft (without causing navigation)
      if (isNewDraft && draft.id) {
        window.history.replaceState(null, "", `/compose?draft=${draft.id}`);
      }
    },
    onError: () => {
      setIsSaving(false);
    },
  });

  const deleteDraftMutation = api.draft.delete.useMutation({
    onSuccess: () => {
      utils.draft.list.invalidate();
      router.push("/");
    },
  });

  const createMutation = api.post.create.useMutation({
    onSuccess: (post) => {
      // Delete the draft after successful publish
      if (currentDraftId) {
        deleteDraftMutation.mutate({ id: currentDraftId });
      }
      utils.draft.list.invalidate();
      router.push(`/post/${post.id}`);
    },
  });

  // Debounced autosave effect - watches state changes and saves after delay
  useEffect(() => {
    // Skip autosave on initial render
    if (isInitialRenderRef.current) {
      isInitialRenderRef.current = false;
      return;
    }

    // Skip if still loading draft data
    if (draftId && !isLoadedRef.current) {
      return;
    }

    // Clear any existing timeout
    if (autosaveTimeoutRef.current) {
      clearTimeout(autosaveTimeoutRef.current);
    }

    // Only save if there's content or title
    if (!editorData.title && !editorData.content) {
      return;
    }

    autosaveTimeoutRef.current = setTimeout(() => {
      setIsSaving(true);
      saveDraftMutation.mutate({
        id: currentDraftIdRef.current || undefined,
        title: editorData.title || null,
        content: editorData.content || null,
        liveUrl: editorData.liveUrl || null,
        projectIds: editorData.projects.map((p) => p.id),
      });
    }, AUTOSAVE_DELAY);

    // Cleanup timeout on unmount or when dependencies change
    return () => {
      if (autosaveTimeoutRef.current) {
        clearTimeout(autosaveTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorData, draftId]);

  const handleEditorChange = useCallback((data: PostEditorData) => {
    setEditorData(data);
  }, []);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setHasScrolled(e.currentTarget.scrollTop > 0);
  }, []);

  const handleSubmit = () => {
    if (!editorData.content) return;

    const attachments = extractAttachments(editorData.content);

    createMutation.mutate({
      title: editorData.title || undefined,
      content: editorData.content,
      liveUrl: editorData.liveUrl || undefined,
      hideFromHome: editorData.hideFromHome,
      projectIds: editorData.projects.map((p) => p.id),
      attachments,
    });
  };

  const handleDeleteDraft = () => {
    if (currentDraftId) {
      if (confirm("Are you sure you want to discard this draft?")) {
        deleteDraftMutation.mutate({ id: currentDraftId });
      }
    } else {
      router.back();
    }
  };

  // Only show loading screen when loading an existing draft from URL (not after creating a new one)
  if (isDraftLoading && draftId && !isLoadedRef.current) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* Header */}
      <header className={`relative z-10 flex h-14 shrink-0 items-center justify-between px-4 transition-shadow ${hasScrolled ? "shadow-sm" : ""}`}>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="h-9 w-9"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          {currentDraftId && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDeleteDraft}
              className="h-9 w-9 text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
              disabled={deleteDraftMutation.isPending}
            >
              {deleteDraftMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
        <div className="flex items-center gap-3">
          {/* Save indicator */}
          <span className="text-xs text-muted-foreground">
            {isSaving ? (
              <span className="flex items-center gap-1">
                <Loader2 className="h-3 w-3 animate-spin" />
                Saving...
              </span>
            ) : lastSaved ? (
              "Draft saved"
            ) : currentDraftId ? (
              "Draft"
            ) : null}
          </span>
          <Button
            onClick={handleSubmit}
            disabled={!editorData.content || createMutation.isPending}
          >
            {createMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Publish
          </Button>
        </div>
      </header>

      {/* Content - scrollable */}
      <div onScroll={handleScroll} className="flex-1 overflow-y-auto">
        <div className="mx-auto flex min-h-[calc(100dvh-3.5rem)] max-w-3xl flex-col px-4 py-4">
          <PostEditor
            initialData={
              existingDraft
                ? {
                    title: existingDraft.title || "",
                    content:
                      existingDraft.content as SerializedEditorState | null,
                    liveUrl: existingDraft.liveUrl || "",
                    projects: [],
                  }
                : {
                    title: prefillTitle,
                    liveUrl: prefillLiveUrl,
                  }
            }
            onChange={handleEditorChange}
            editorKey={editorKeyRef.current}
          />
        </div>
      </div>
    </div>
  );
}
