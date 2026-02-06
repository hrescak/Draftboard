"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { api } from "~/lib/trpc/client";
import { Button } from "~/components/ui/button";
import { Card, CardHeader } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { Plus, FolderOpen, Loader2 } from "lucide-react";
import { formatRelativeTime, pluralize } from "~/lib/utils";
import { StickyPageHeader } from "~/components/layout/sticky-page-header";

// Extract R2 key from URL
function extractR2Key(url: string): string | null {
  const urlWithoutParams = url.split('?')[0];
  const match = urlWithoutParams?.match(/uploads\/[^\/]+\/[^\/]+$/);
  return match ? match[0] : null;
}

// Check if URL is already a signed URL
function isSignedUrl(url: string): boolean {
  return url.includes('X-Amz-') || url.includes('x-amz-');
}

function SignedCoverImage({ url, name }: { url: string; name: string }) {
  const alreadySigned = isSignedUrl(url);
  const r2Key = !alreadySigned ? extractR2Key(url) : null;

  const { data: signedUrlData, isLoading } = api.upload.getDownloadUrl.useQuery(
    { key: r2Key! },
    {
      enabled: !!r2Key && !alreadySigned,
      staleTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );

  const displayUrl = alreadySigned ? url : (signedUrlData?.url || url);

  if (!alreadySigned && isLoading && r2Key) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
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

export default function ProjectsPage() {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = api.project.list.useInfiniteQuery(
    { limit: 12 },
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

  const projects = data?.pages.flatMap((page) => page.projects) ?? [];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-9 w-32" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <StickyPageHeader>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Projects</h1>
          <Button asChild>
            <Link href="/projects/new">
              <Plus className="h-4 w-4" />
              New Project
            </Link>
          </Button>
        </div>
      </StickyPageHeader>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <FolderOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-medium">No projects yet</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Create your first project to start organizing your posts
          </p>
          <Button asChild>
            <Link href="/projects/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Project
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <div className="aspect-video overflow-hidden rounded-t-[19px]">
                  {project.coverUrl ? (
                    <SignedCoverImage url={project.coverUrl} name={project.name} />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted">
                      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-background">
                        <FolderOpen className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                  )}
                </div>
                <CardHeader className="p-4 pt-3">
                  <div>
                    <h3 className="font-semibold truncate">{project.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {project._count.posts} {pluralize(project._count.posts, "post")} · Created {formatRelativeTime(new Date(project.createdAt))}
                    </p>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}

      <div ref={loadMoreRef} className="flex justify-center py-4">
        {isFetchingNextPage && (
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        )}
      </div>
    </div>
  );
}
