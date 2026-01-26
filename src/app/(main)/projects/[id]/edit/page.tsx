"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { CoverUpload } from "~/components/projects/CoverUpload";
import { api } from "~/lib/trpc/client";
import { Loader2, Plus, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ProjectUrl {
  title: string;
  url: string;
}

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const [name, setName] = useState("");
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
