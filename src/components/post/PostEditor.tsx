"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { Link as LinkIcon, FolderOpen, Check, ChevronsUpDown } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { Card, CardContent } from "~/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { Editor } from "~/components/editor/Editor";
import { api } from "~/lib/trpc/client";
import type { SerializedEditorState } from "lexical";
import { cn, pluralize } from "~/lib/utils";

export interface PostEditorData {
  title: string;
  content: SerializedEditorState | null;
  liveUrl: string;
  projects: Array<{ id: string; name: string }>;
  hideFromHome: boolean;
  visualFeedbackEnabled: boolean;
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
    hideFromHome?: boolean;
    visualFeedbackEnabled?: boolean;
  };
  showVisualFeedbackSetting?: boolean;
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
  showVisualFeedbackSetting = false,
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
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [hideFromHome, setHideFromHome] = useState(initialData?.hideFromHome || false);
  const [visualFeedbackEnabled, setVisualFeedbackEnabled] = useState(
    initialData?.visualFeedbackEnabled || false
  );

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const isInitialMount = useRef(true);

  const { data: projects } = api.project.search.useQuery(
    { query: projectSearch || undefined },
    { enabled: projectsOpen }
  );

  // Combine selected projects (on top) with search results, avoiding duplicates
  const projectList = useMemo(() => {
    const searchResults = projects || [];
    const selectedIds = new Set(selectedProjects.map((p) => p.id));
    const filteredResults = searchResults.filter((p) => !selectedIds.has(p.id));
    return [...selectedProjects, ...filteredResults];
  }, [projects, selectedProjects]);

  // Button text based on selection
  const projectButtonText = useMemo(() => {
    if (selectedProjects.length === 0) return "Add to project";
    if (selectedProjects.length === 1) return selectedProjects[0].name;
    return `In ${selectedProjects.length} ${pluralize(selectedProjects.length, "project")}`;
  }, [selectedProjects]);

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
      hideFromHome,
      visualFeedbackEnabled,
    });
  }, [title, content, liveUrl, selectedProjects, hideFromHome, visualFeedbackEnabled, onChange]);

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

  const toggleProject = (project: { id: string; name: string }) => {
    const isSelected = selectedProjects.find((p) => p.id === project.id);
    if (isSelected) {
      setSelectedProjects(selectedProjects.filter((p) => p.id !== project.id));
    } else {
      setSelectedProjects([...selectedProjects, project]);
    }
  };

  return (
    <div className={cn("flex flex-1 flex-col", className)}>
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
        minHeight="300px"
        showToolbar={false}
        className="border-none shadow-none"
      />

      {/* Spacer - pushes metadata to bottom when content is short */}
      <div className="flex-grow" />

      {/* Post Settings */}
      <Card className="mt-6">
        <CardContent className="space-y-6 pt-6">
          {/* Live URL */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="liveUrl">Live URL</Label>
              <p className="text-xs text-muted-foreground">
                Link to a live demo or deployed version
              </p>
            </div>
            <div className="flex items-center gap-2 sm:w-80">
              <LinkIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
              <Input
                id="liveUrl"
                type="url"
                placeholder="https://example.com"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
              />
            </div>
          </div>

          {/* Projects */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-0.5">
              <Label>Projects</Label>
              <p className="text-xs text-muted-foreground">
                Associate this post with one or more projects
              </p>
            </div>
            <Popover open={projectsOpen} onOpenChange={setProjectsOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  role="combobox"
                  aria-expanded={projectsOpen}
                  className="justify-between gap-2 sm:w-52"
                >
                  <FolderOpen className="h-4 w-4 shrink-0" />
                  <span className="truncate">{projectButtonText}</span>
                  <ChevronsUpDown className="ml-auto h-3 w-3 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-52 p-0" align="end">
                <Command shouldFilter={false}>
                  <CommandInput
                    placeholder="Search projects..."
                    value={projectSearch}
                    onValueChange={setProjectSearch}
                  />
                  <CommandList>
                    <CommandEmpty>No projects found.</CommandEmpty>
                    {projectList.length > 0 && (
                      <CommandGroup>
                        {projectList.map((project) => {
                          const isSelected = selectedProjects.some(
                            (p) => p.id === project.id
                          );
                          return (
                            <CommandItem
                              key={project.id}
                              value={project.id}
                              onSelect={() => toggleProject(project)}
                            >
                              <Check
                                className={cn(
                                  "h-4 w-4 shrink-0",
                                  isSelected ? "opacity-100" : "opacity-0"
                                )}
                              />
                              <FolderOpen className="h-4 w-4 shrink-0 text-muted-foreground" />
                              <span className="truncate">{project.name}</span>
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Hide from Home */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="hideFromHome">Hide from Home</Label>
              <p className="text-xs text-muted-foreground">
                Post will only appear on your profile, not the Home feed
              </p>
            </div>
            <Switch
              id="hideFromHome"
              checked={hideFromHome}
              onCheckedChange={setHideFromHome}
            />
          </div>

          {showVisualFeedbackSetting && (
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="visualFeedbackEnabled">Enable Visual Feedback</Label>
                <p className="text-xs text-muted-foreground">
                  Enable timeline-based video and region feedback on this post
                </p>
              </div>
              <Switch
                id="visualFeedbackEnabled"
                checked={visualFeedbackEnabled}
                onCheckedChange={setVisualFeedbackEnabled}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
