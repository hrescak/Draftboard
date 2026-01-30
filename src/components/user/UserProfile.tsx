"use client";

import { useCallback, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { formatRelativeTime, getInitials } from "~/lib/utils";
import { Loader2, Calendar, Settings, LogOut } from "lucide-react";
import { PostCard } from "~/components/feed/PostCard";
import { api } from "~/lib/trpc/client";

interface UserProfileProps {
  user: {
    id: string;
    email: string;
    displayName: string;
    avatarUrl: string | null;
    createdAt: Date;
  };
}

export function UserProfile({ user }: UserProfileProps) {
  const { data: session } = useSession();
  const isOwnProfile = session?.user?.id === user.id;
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = api.post.byUser.useInfiniteQuery(
    { userId: user.id, limit: 10 },
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
      {/* Profile Header */}
      <div className="flex items-start gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.avatarUrl ?? undefined} />
          <AvatarFallback className="text-2xl">
            {getInitials(user.displayName)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <h1 className="text-3xl font-bold">{user.displayName}</h1>
          <p className="text-muted-foreground">{user.email}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Joined {formatRelativeTime(new Date(user.createdAt))}</span>
          </div>
        </div>
      </div>

      {/* Mobile-only: Settings and Sign Out for own profile */}
      {isOwnProfile && (
        <div className="flex gap-3 sm:hidden">
          <Button variant="outline" className="flex-1" asChild>
            <Link href="/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
          <Button
            variant="outline"
            className="flex-1 text-destructive hover:text-destructive"
            onClick={() => signOut({ callbackUrl: "/sign-in" })}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      )}

      {/* Posts Section */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">
              {user.displayName} hasn&apos;t posted anything yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        <div ref={loadMoreRef} className="flex justify-center py-4">
          {isFetchingNextPage && (
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          )}
        </div>
      </div>
    </div>
  );
}
