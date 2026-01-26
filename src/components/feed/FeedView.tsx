"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { api } from "~/lib/trpc/client";
import { PostCard } from "./PostCard";
import { GridView } from "./GridView";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { LayoutGrid, List, Loader2 } from "lucide-react";
import { FeedSkeleton } from "./FeedSkeleton";

type ViewMode = "feed" | "grid";

export function FeedView() {
  const [viewMode, setViewMode] = useState<ViewMode>("feed");
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = api.post.feed.useInfiniteQuery(
    { limit: 10 },
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

  if (isLoading) {
    return <FeedSkeleton />;
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <List className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-lg font-medium">No posts yet</h3>
        <p className="text-sm text-muted-foreground">
          Be the first to share something with your team!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Home</h1>
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
          <TabsList>
            <TabsTrigger value="feed" className="gap-2">
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">Feed</span>
            </TabsTrigger>
            <TabsTrigger value="grid" className="gap-2">
              <LayoutGrid className="h-4 w-4" />
              <span className="hidden sm:inline">Grid</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {viewMode === "feed" ? (
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
    </div>
  );
}
