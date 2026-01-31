"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { CoverUpload } from "~/components/projects/CoverUpload";
import { SimpleMarkdownEditor } from "~/components/editor/SimpleMarkdownEditor";
import { api } from "~/lib/trpc/client";
import { Loader2, Plus, Trash2 } from "lucide-react";
import type { SerializedEditorState } from "lexical";

interface ProjectUrl {
  title: string;
  url: string;
}

const defaultUrls: ProjectUrl[] = [
  { title: "Slack", url: "" },
  { title: "Figma", url: "" },
  { title: "Google Docs", url: "" },
];

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

export default function NewProjectPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState<SerializedEditorState | null>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [urls, setUrls] = useState<ProjectUrl[]>(defaultUrls);

  const createMutation = api.project.create.useMutation({
    onSuccess: (project) => {
      router.push(`/projects/${project.id}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createMutation.mutate({
      name: name.trim(),
      description: hasContent(description) ? description : undefined,
      coverUrl: coverUrl || undefined,
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

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Create New Project</CardTitle>
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
                <SimpleMarkdownEditor
                  onChange={setDescription}
                  placeholder="What is this project about?"
                  minHeight="60px"
                />
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
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!name.trim() || createMutation.isPending}
              >
                {createMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create Project
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
