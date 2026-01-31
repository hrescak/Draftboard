"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Link as LinkIcon, FolderKanban, X } from "lucide-react";
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

export interface PostEditorData {
  title: string;
  content: SerializedEditorState | null;
  liveUrl: string;
  projects: Array<{ id: string; name: string }>;
}

export interface ExtractedAttachment {
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
}

interface PostEditorProps {
  initialData?: {
    title?: string;
    content?: SerializedEditorState | null;
    liveUrl?: string;
    projects?: Array<{ id: string; name: string }>;
  };
  onChange?: (data: PostEditorData) => void;
  editorKey?: string;
  className?: string;
}

/**
 * Extracts attachment nodes from Lexical editor state
 */
export function extractAttachments(
  content: SerializedEditorState | null
): ExtractedAttachment[] {
  if (!content) return [];

  const attachments: ExtractedAttachment[] = [];
  const root = content.root;

  if (root && "children" in root && Array.isArray(root.children)) {
    let order = 0;
    const extract = (node: unknown): void => {
      if (!node || typeof node !== "object") return;
      const nodeObj = node as Record<string, unknown>;

      if (nodeObj.type === "attachment") {
        attachments.push({
          type: nodeObj.attachmentType as ExtractedAttachment["type"],
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
        nodeObj.children.forEach(extract);
      }
    };

    root.children.forEach(extract);
  }

  return attachments;
}

export function PostEditor({
  initialData,
  onChange,
  editorKey,
  className,
}: PostEditorProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState<SerializedEditorState | null>(
    initialData?.content || null
  );
  const [liveUrl, setLiveUrl] = useState(initialData?.liveUrl || "");
  const [selectedProjects, setSelectedProjects] = useState<
    Array<{ id: string; name: string }>
  >(initialData?.projects || []);
  const [projectSearch, setProjectSearch] = useState("");

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const isInitialMount = useRef(true);

  const { data: projects } = api.project.search.useQuery(
    { query: projectSearch },
    { enabled: projectSearch.length > 0 }
  );

  // Update parent when data changes
  useEffect(() => {
    // Skip initial mount to avoid unnecessary callback
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    onChange?.({
      title,
      content,
      liveUrl,
      projects: selectedProjects,
    });
  }, [title, content, liveUrl, selectedProjects, onChange]);

  // Auto-resize title textarea on mount if it has content
  useEffect(() => {
    if (titleRef.current && title) {
      titleRef.current.style.height = "auto";
      titleRef.current.style.height = titleRef.current.scrollHeight + "px";
    }
  }, []);

  const handleContentChange = useCallback((state: SerializedEditorState) => {
    setContent(state);
  }, []);

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTitle(e.target.value);
      // Auto-resize
      e.target.style.height = "auto";
      e.target.style.height = e.target.scrollHeight + "px";
    },
    []
  );

  const addProject = (project: { id: string; name: string }) => {
    if (!selectedProjects.find((p) => p.id === project.id)) {
      setSelectedProjects([...selectedProjects, project]);
    }
    setProjectSearch("");
  };

  const removeProject = (projectId: string) => {
    setSelectedProjects(selectedProjects.filter((p) => p.id !== projectId));
  };

  return (
    <div className={cn("space-y-0", className)}>
      {/* Title */}
      <textarea
        ref={titleRef}
        placeholder="Add a title (optional)"
        value={title}
        onChange={handleTitleChange}
        rows={1}
        className="px-4 w-full resize-none border-none bg-transparent text-3xl font-semibold placeholder:text-muted-foreground/50 focus:outline-none"
      />

      {/* Editor */}
      <Editor
        key={editorKey}
        initialContent={initialData?.content}
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
          <Badge key={project.id} variant="secondary" className="gap-1 pr-1">
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
  );
}
