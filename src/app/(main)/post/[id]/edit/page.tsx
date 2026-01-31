"use client";

import { useState, useCallback, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { X, Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  PostEditor,
  extractAttachments,
  type PostEditorData,
} from "~/components/post/PostEditor";
import { api } from "~/lib/trpc/client";
import type { SerializedEditorState } from "lexical";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [editorData, setEditorData] = useState<PostEditorData | null>(null);
  const [initialData, setInitialData] = useState<PostEditorData | null>(null);

  const { data: post, isLoading: isLoadingPost } = api.post.getById.useQuery({
    id,
  });

  useEffect(() => {
    if (post) {
      const data: PostEditorData = {
        title: post.title || "",
        content: post.content as unknown as SerializedEditorState,
        liveUrl: post.liveUrl || "",
        projects: post.projects.map((p) => p.project),
      };
      setInitialData(data);
      setEditorData(data);
    }
  }, [post]);

  const updateMutation = api.post.update.useMutation({
    onSuccess: (updatedPost) => {
      router.push(`/post/${updatedPost.id}`);
    },
  });

  const handleEditorChange = useCallback((data: PostEditorData) => {
    setEditorData(data);
  }, []);

  const handleSubmit = () => {
    if (!editorData?.content) return;

    const attachments = extractAttachments(editorData.content);

    updateMutation.mutate({
      id,
      title: editorData.title || undefined,
      content: editorData.content,
      liveUrl: editorData.liveUrl || undefined,
      projectIds: editorData.projects.map((p) => p.id),
      attachments,
    });
  };

  if (isLoadingPost || !initialData) {
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
          disabled={!editorData?.content || updateMutation.isPending}
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
          <PostEditor
            initialData={initialData}
            onChange={handleEditorChange}
            editorKey={id}
          />
        </div>
      </div>
    </div>
  );
}
