"use client";

import { useState, useCallback, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { X, Loader2, Link as LinkIcon, FolderKanban } from "lucide-react";
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

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<SerializedEditorState | null>(null);
  const [initialContent, setInitialContent] = useState<SerializedEditorState | null>(null);
  const [liveUrl, setLiveUrl] = useState("");
  const [selectedProjects, setSelectedProjects] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [projectSearch, setProjectSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { data: post, isLoading: isLoadingPost } = api.post.getById.useQuery({ id });
  const { data: projects } = api.project.search.useQuery(
    { query: projectSearch },
    { enabled: projectSearch.length > 0 }
  );

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setLiveUrl(post.liveUrl || "");
      setSelectedProjects(post.projects.map((p) => p.project));
      setInitialContent(post.content as unknown as SerializedEditorState);
      setContent(post.content as unknown as SerializedEditorState);
      setIsLoading(false);
    }
  }, [post]);

  const updateMutation = api.post.update.useMutation({
    onSuccess: (updatedPost) => {
      router.push(`/post/${updatedPost.id}`);
    },
  });

  const handleContentChange = useCallback((state: SerializedEditorState) => {
    setContent(state);
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

    updateMutation.mutate({
      id,
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

  if (isLoadingPost || isLoading) {
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
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="h-9 w-9"
        >
          <X className="h-5 w-5" />
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!content || updateMutation.isPending}
        >
          {updateMutation.isPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Save Changes
        </Button>
      </header>

      {/* Content - scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-8">
          {/* Title */}
          <Input
            type="text"
            placeholder="Add a title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4 border-none text-2xl font-bold placeholder:text-muted-foreground/50 focus-visible:ring-0"
          />

          {/* Editor */}
          {initialContent && (
            <Editor
              initialContent={initialContent}
              onChange={handleContentChange}
              placeholder="Write something, use / for commands, @ to mention..."
              minHeight="400px"
              showToolbar={false}
              className="border-none shadow-none"
            />
          )}

          {/* Footer options */}
          <div className="mt-6 flex flex-wrap items-center gap-3 border-t pt-6">
            {/* Live URL */}
            <div className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4 text-muted-foreground" />
              <Input
                type="url"
                placeholder="Live URL (optional)"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
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
