"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X, Loader2, Link as LinkIcon, FolderKanban, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Editor } from "~/components/editor/Editor";
import { api } from "~/lib/trpc/client";
import type { SerializedEditorState } from "lexical";
import { cn } from "~/lib/utils";

const AUTOSAVE_DELAY = 1500; // 1.5 seconds debounce

export default function ComposePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const draftId = searchParams.get("draft");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState<SerializedEditorState | null>(null);
  const [liveUrl, setLiveUrl] = useState("");
  const [selectedProjects, setSelectedProjects] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [projectSearch, setProjectSearch] = useState("");
  const [currentDraftId, setCurrentDraftId] = useState<string | null>(draftId);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const autosaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isLoadedRef = useRef(false);
  const isInitialRenderRef = useRef(true);
  const currentDraftIdRef = useRef<string | null>(draftId);
  // Stable key for Editor - only set once on mount to prevent remount after first save
  const editorKeyRef = useRef<string>(draftId || "new");

  const { data: projects } = api.project.search.useQuery(
    { query: projectSearch },
    { enabled: projectSearch.length > 0 }
  );

  // Load existing draft if draftId is provided
  const { data: existingDraft, isLoading: isDraftLoading } = api.draft.getById.useQuery(
    { id: draftId! },
    { enabled: !!draftId && !isLoadedRef.current }
  );

  // Initialize form with draft data
  useEffect(() => {
    if (existingDraft && !isLoadedRef.current) {
      setTitle(existingDraft.title || "");
      setContent(existingDraft.content as SerializedEditorState | null);
      setLiveUrl(existingDraft.liveUrl || "");
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

    // Only save if there's content or title (issue #3 fix)
    if (!title && !content) {
      return;
    }

    autosaveTimeoutRef.current = setTimeout(() => {
      setIsSaving(true);
      saveDraftMutation.mutate({
        id: currentDraftIdRef.current || undefined,
        title: title || null,
        content: content || null,
        liveUrl: liveUrl || null,
        projectIds: selectedProjects.map((p) => p.id),
      });
    }, AUTOSAVE_DELAY);

    // Cleanup timeout on unmount or when dependencies change
    return () => {
      if (autosaveTimeoutRef.current) {
        clearTimeout(autosaveTimeoutRef.current);
      }
    };
    // Note: Using ref for currentDraftId to avoid re-triggering on save
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, content, liveUrl, selectedProjects, draftId]);

  const handleContentChange = useCallback((state: SerializedEditorState) => {
    setContent(state);
  }, []);

  const handleTitleChange = useCallback((newTitle: string) => {
    setTitle(newTitle);
  }, []);

  const handleLiveUrlChange = useCallback((newUrl: string) => {
    setLiveUrl(newUrl);
  }, []);

  const handleSubmit = () => {
    if (!content) return;

    // Extract attachments from editor content
    const attachments: Array<{
      type: "IMAGE" | "VIDEO" | "FILE" | "FIGMA" | "LOOM";
      url: string;
      filename: string;
      mimeType: string;
      size: number;
      width?: number;
      height?: number;
      thumbnailUrl?: string;
      metadata?: Record<string, unknown>;
      order: number;
    }> = [];

    // Parse editor state to extract attachment nodes
    const root = content.root;
    if (root && "children" in root && Array.isArray(root.children)) {
      let order = 0;
      const extractAttachments = (node: unknown): void => {
        if (!node || typeof node !== "object") return;
        const nodeObj = node as Record<string, unknown>;

        if (nodeObj.type === "attachment") {
          attachments.push({
            type: nodeObj.attachmentType as "IMAGE" | "VIDEO" | "FILE" | "FIGMA" | "LOOM",
            url: nodeObj.url as string,
            filename: nodeObj.filename as string,
            mimeType: nodeObj.mimeType as string,
            size: nodeObj.size as number,
            width: nodeObj.width as number | undefined,
            height: nodeObj.height as number | undefined,
            thumbnailUrl: nodeObj.thumbnailUrl as string | undefined,
            metadata: nodeObj.metadata as Record<string, unknown> | undefined,
            order: order++,
          });
        }

        if (Array.isArray(nodeObj.children)) {
          nodeObj.children.forEach(extractAttachments);
        }
      };

      root.children.forEach(extractAttachments);
    }

    createMutation.mutate({
      title: title || undefined,
      content,
      liveUrl: liveUrl || undefined,
      projectIds: selectedProjects.map((p) => p.id),
      attachments,
    });
  };

  const addProject = (project: { id: string; name: string }) => {
    if (!selectedProjects.find((p) => p.id === project.id)) {
      setSelectedProjects([...selectedProjects, project]);
    }
    setProjectSearch("");
  };

  const removeProject = (projectId: string) => {
    setSelectedProjects(selectedProjects.filter((p) => p.id !== projectId));
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
      <header className="flex h-14 shrink-0 items-center justify-between border-b px-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="h-9 w-9"
          >
            <X className="h-5 w-5" />
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
            disabled={!content || createMutation.isPending}
          >
            {createMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Publish
          </Button>
        </div>
      </header>

      {/* Content - scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-8">
        {/* Title */}
        <textarea
          placeholder="Add a title (optional)"
          value={title}
          onChange={(e) => {
            handleTitleChange(e.target.value);
            // Auto-resize
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          rows={1}
          className=" px-4 w-full resize-none border-none bg-transparent text-3xl font-semibold placeholder:text-muted-foreground/50 focus:outline-none"
        />

        {/* Editor - stable key to prevent remount after first save */}
        <Editor
          key={editorKeyRef.current}
          initialContent={existingDraft?.content as SerializedEditorState | null | undefined}
          onChange={handleContentChange}
          placeholder="Write something, use / for commands, @ to mention..."
          minHeight="400px"
          showToolbar={false}
          className="border-none shadow-none"
        />

        {/* Footer options */}
        <div className="mt-6 flex flex-wrap items-center gap-3 border-t pt-6">
          {/* Live URL */}
          <div className="flex items-center gap-2">
            <LinkIcon className="h-4 w-4 text-muted-foreground" />
            <Input
              type="url"
              placeholder="Live URL (optional)"
              value={liveUrl}
              onChange={(e) => handleLiveUrlChange(e.target.value)}
              className="h-8 w-64"
            />
          </div>

          {/* Projects */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <FolderKanban className="h-4 w-4" />
                Add to project
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-2">
              <Input
                placeholder="Search projects..."
                value={projectSearch}
                onChange={(e) => setProjectSearch(e.target.value)}
                className="mb-2"
              />
              {projects && projects.length > 0 && (
                <div className="space-y-1">
                  {projects.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => addProject(project)}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted",
                        selectedProjects.find((p) => p.id === project.id) &&
                          "bg-muted"
                      )}
                    >
                      <FolderKanban className="h-4 w-4 text-muted-foreground" />
                      {project.name}
                    </button>
                  ))}
                </div>
              )}
            </PopoverContent>
          </Popover>

          {/* Selected projects */}
          {selectedProjects.map((project) => (
            <Badge
              key={project.id}
              variant="secondary"
              className="gap-1 pr-1"
            >
              {project.name}
              <button
                onClick={() => removeProject(project.id)}
                className="ml-1 rounded-full p-0.5 hover:bg-muted"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
