"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserAvatar } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { api } from "~/lib/trpc/client";
import { PostCard } from "~/components/feed/PostCard";
import { GridView } from "~/components/feed/GridView";
import { formatRelativeTime, pluralize } from "~/lib/utils";
import { Link as LinkIcon, List, LayoutGrid, Loader2, FolderOpen, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { SimpleMarkdownContent } from "~/components/editor/SimpleMarkdownEditor";
import type { SerializedEditorState } from "lexical";

import { extractStorageKey, needsUrlSigning } from "~/lib/storage-url";

// Check if content is a Lexical editor state
function isLexicalContent(content: unknown): content is SerializedEditorState {
  if (!content || typeof content !== "object") return false;
  const c = content as Record<string, unknown>;
  return c.root !== undefined && typeof c.root === "object";
}

// Render project description (handles both old { text: string } and new Lexical format)
function ProjectDescription({ description }: { description: unknown }) {
  if (!description) return null;

  // New Lexical format
  if (isLexicalContent(description)) {
    return (
      <div className="mt-2">
        <SimpleMarkdownContent content={description} className="text-base" />
      </div>
    );
  }

  // Old { text: string } format
  const desc = description as { text?: string };
  if (desc?.text) {
    return <p className="mt-2 text-base">{desc.text}</p>;
  }

  return null;
}

function SignedCoverImage({ url, name }: { url: string; name: string }) {
  const storageKey = extractStorageKey(url);
  const requiresSigning = needsUrlSigning(url);

  const { data: signedUrlData, isLoading } = api.upload.getDownloadUrl.useQuery(
    { key: storageKey! },
    {
      enabled: requiresSigning && !!storageKey,
      staleTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );

  const displayUrl = requiresSigning && signedUrlData?.url ? signedUrlData.url : url;

  if (requiresSigning && isLoading && storageKey) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <img
      src={displayUrl}
      alt={name}
      className="h-full w-full object-cover"
    />
  );
}

interface ProjectDetailProps {
  project: {
    id: string;
    name: string;
    description: unknown;
    coverUrl: string | null;
    createdAt: Date;
    createdById: string;
    urls: Array<{
      id: string;
      title: string;
      url: string;
    }>;
    members: Array<{
      user: {
        id: string;
        displayName: string;
        avatarUrl: string | null;
      };
    }>;
    _count: {
      posts: number;
    };
  };
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [viewMode, setViewMode] = useState<"feed" | "grid">("feed");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const isOwner = session?.user?.id === project.createdById;
  const isAdmin = session?.user?.role === "ADMIN" || session?.user?.role === "OWNER";
  const canModify = isOwner || isAdmin;

  const deleteMutation = api.project.delete.useMutation({
    onSuccess: () => {
      router.push("/projects");
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate({ id: project.id });
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = api.post.byProject.useInfiniteQuery(
    { projectId: project.id, limit: 10 },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target?.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "100px",
      threshold: 0,
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [handleObserver]);

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="space-y-6">
        {project.coverUrl && (
          <div className="aspect-3/1 overflow-hidden rounded-xl">
            <SignedCoverImage url={project.coverUrl} name={project.name} />
          </div>
        )}

        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-start gap-4">
            {!project.coverUrl && (
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <FolderOpen className="h-8 w-8 text-primary" />
              </div>
            )}
            <div className="space-y-1">
              <h1 className="text-3xl font-bold">{project.name}</h1>
              <p className="text-sm text-muted-foreground">
                Created {formatRelativeTime(new Date(project.createdAt))} ·{" "}
                {project._count.posts} {pluralize(project._count.posts, "post")}
              </p>
            </div>
          </div>

          {canModify && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <MoreHorizontal className="h-5 w-5" />
                  <span className="sr-only">Project options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/projects/${project.id}/edit`} className="gap-2">
                    <Pencil className="h-4 w-4" />
                    Edit project
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setShowDeleteDialog(true)}
                  className="gap-2 text-destructive focus:bg-destructive focus:text-destructive-foreground"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Links */}
        {project.urls.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.urls.map((url) => (
              <a
                key={url.id}
                href={url.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Badge variant="secondary" className="gap-1.5 bg-muted py-1.5">
                  <LinkIcon className="h-3 w-3" />
                  {url.title}
                </Badge>
              </a>
            ))}
          </div>
        )}

        <ProjectDescription description={project.description} />

        {/* Delete confirmation dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete project?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete the project
                &quot;{project.name}&quot; and remove it from all posts.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
                disabled={deleteMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>

      {/* Posts */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Posts</h2>
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "feed" | "grid")}>
            <TabsList>
              <TabsTrigger value="feed" className="gap-2">
                <List className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="grid" className="gap-2">
                <LayoutGrid className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : posts.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No posts in this project yet
          </p>
        ) : viewMode === "feed" ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <GridView posts={posts} />
        )}

        <div ref={loadMoreRef} className="flex justify-center py-4">
          {isFetchingNextPage && (
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          )}
        </div>
      </section>
    </div>
  );
}
