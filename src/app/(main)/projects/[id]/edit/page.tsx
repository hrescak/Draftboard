"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { CoverUpload } from "~/components/projects/CoverUpload";
import { SimpleMarkdownEditor } from "~/components/editor/SimpleMarkdownEditor";
import { api } from "~/lib/trpc/client";
import { Loader2, Plus, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { SerializedEditorState } from "lexical";

interface ProjectUrl {
  title: string;
  url: string;
}

// Check if editor state has actual content
function hasContent(editorState: SerializedEditorState | null): boolean {
  if (!editorState) return false;

  const root = editorState.root;
  if (!root || !Array.isArray(root.children)) return false;

  for (const child of root.children) {
    if (child.type === "paragraph" && Array.isArray(child.children)) {
      for (const textNode of child.children) {
        if (textNode.type === "text" && textNode.text?.trim()) {
          return true;
        }
      }
    }
    if (child.type === "list") {
      return true;
    }
  }

  return false;
}

// Check if content is a Lexical editor state
function isLexicalContent(content: unknown): content is SerializedEditorState {
  if (!content || typeof content !== "object") return false;
  const c = content as Record<string, unknown>;
  return c.root !== undefined && typeof c.root === "object";
}

// Convert old { text: string } format to Lexical editor state
function convertOldFormatToLexical(content: unknown): SerializedEditorState | null {
  if (!content || typeof content !== "object") return null;

  // If it's already Lexical format, return it
  if (isLexicalContent(content)) {
    return content;
  }

  // Convert old { text: string } format
  const c = content as Record<string, unknown>;
  if (typeof c.text === "string" && c.text.trim()) {
    return {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: c.text,
                type: "text",
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "root",
        version: 1,
      },
    } as SerializedEditorState;
  }

  return null;
}

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const [name, setName] = useState("");
  const [description, setDescription] = useState<SerializedEditorState | null>(null);
  const [initialDescription, setInitialDescription] = useState<SerializedEditorState | null>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [urls, setUrls] = useState<ProjectUrl[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const { data: project, isLoading } = api.project.getById.useQuery(
    { id: projectId },
    { enabled: !!projectId }
  );

  const updateMutation = api.project.update.useMutation({
    onSuccess: () => {
      router.push(`/projects/${projectId}`);
    },
  });

  // Initialize form with project data
  useEffect(() => {
    if (project && !isInitialized) {
      setName(project.name);
      // Convert description to Lexical format (handles both old and new format)
      const lexicalDesc = convertOldFormatToLexical(project.description);
      setInitialDescription(lexicalDesc);
      setDescription(lexicalDesc);
      setCoverUrl(project.coverUrl);
      setUrls(
        project.urls.map((u) => ({
          title: u.title,
          url: u.url,
        }))
      );
      setIsInitialized(true);
    }
  }, [project, isInitialized]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    updateMutation.mutate({
      id: projectId,
      name: name.trim(),
      description: hasContent(description) ? description : null,
      coverUrl: coverUrl,
      urls: urls.filter((u) => u.title && u.url),
    });
  };

  const addUrl = () => {
    setUrls([...urls, { title: "", url: "" }]);
  };

  const updateUrl = (index: number, field: "title" | "url", value: string) => {
    const newUrls = [...urls];
    newUrls[index] = { ...newUrls[index]!, [field]: value };
    setUrls(newUrls);
  };

  const removeUrl = (index: number) => {
    setUrls(urls.filter((_, i) => i !== index));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg text-muted-foreground">Project not found</p>
        <Button asChild variant="link" className="mt-2">
          <Link href="/projects">Back to Projects</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <Link
          href={`/projects/${projectId}`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to project
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My Awesome Project"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <p className="text-xs text-muted-foreground">
                Supports **bold**, *italic*, [links](url), and lists
              </p>
              <div className="rounded-md border bg-background px-3 py-2 focus-within:ring-1 focus-within:ring-ring">
                {isInitialized && (
                  <SimpleMarkdownEditor
                    key={projectId} // Reset editor when project changes
                    initialContent={initialDescription}
                    onChange={setDescription}
                    placeholder="What is this project about?"
                    minHeight="60px"
                  />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Cover Image (optional)</Label>
              <CoverUpload value={coverUrl} onChange={setCoverUrl} />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Related Links</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addUrl}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Link
                </Button>
              </div>

              {urls.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No links added yet
                </p>
              )}

              {urls.map((projectUrl, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Link title"
                    value={projectUrl.title}
                    onChange={(e) => updateUrl(index, "title", e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    type="url"
                    placeholder="https://..."
                    value={projectUrl.url}
                    onChange={(e) => updateUrl(index, "url", e.target.value)}
                    className="flex-2"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeUrl(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(`/projects/${projectId}`)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!name.trim() || updateMutation.isPending}
              >
                {updateMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
