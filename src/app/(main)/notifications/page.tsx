"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { api } from "~/lib/trpc/client";
import { UserAvatar } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { formatRelativeTime } from "~/lib/utils";
import { Bell, CheckCheck, Loader2 } from "lucide-react";
import { cn } from "~/lib/utils";
import { StickyPageHeader } from "~/components/layout/sticky-page-header";

function getNotificationText(type: string, actorName: string, postTitle?: string | null) {
  switch (type) {
    case "COMMENT":
      return `${actorName} commented on your post${postTitle ? ` "${postTitle}"` : ""}`;
    case "COMMENT_REPLY":
      return `${actorName} replied to your comment`;
    case "REACTION_POST":
      return `${actorName} reacted to your post${postTitle ? ` "${postTitle}"` : ""}`;
    case "REACTION_COMMENT":
      return `${actorName} reacted to your comment`;
    case "MENTION":
      return `${actorName} mentioned you${postTitle ? ` in "${postTitle}"` : ""}`;
    default:
      return `${actorName} interacted with your content`;
  }
}

export default function NotificationsPage() {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const utils = api.useUtils();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = api.notification.list.useInfiniteQuery(
    { limit: 20 },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const markAsReadMutation = api.notification.markAsRead.useMutation({
    onSuccess: () => {
      utils.notification.list.invalidate();
      utils.notification.unreadCount.invalidate();
    },
  });

  const markAllAsReadMutation = api.notification.markAllAsRead.useMutation({
    onSuccess: () => {
      utils.notification.list.invalidate();
      utils.notification.unreadCount.invalidate();
    },
  });

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

  const notifications = data?.pages.flatMap((page) => page.notifications) ?? [];
  const hasUnread = notifications.some((n) => !n.read);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-9 w-28" />
        </div>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <StickyPageHeader>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Notifications</h1>
          {hasUnread && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => markAllAsReadMutation.mutate()}
              disabled={markAllAsReadMutation.isPending}
            >
              <CheckCheck className="mr-2 h-4 w-4" />
              Mark all as read
            </Button>
          )}
        </div>
      </StickyPageHeader>

      <Card>
        <CardContent className="p-2">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Bell className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-medium">No notifications yet</h3>
              <p className="text-sm text-muted-foreground">
                When someone interacts with your posts, you&apos;ll see it here
              </p>
            </div>
          ) : (
            <div>
              {notifications.map((notification) => (
                <Link
                  key={notification.id}
                  href={notification.postId ? `/post/${notification.postId}` : "#"}
                  onClick={() => {
                    if (!notification.read) {
                      markAsReadMutation.mutate({ id: notification.id });
                    }
                  }}
                  className="flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-muted/50"
                >
                  <UserAvatar avatarUrl={notification.actor.avatarUrl} name={notification.actor.displayName} className="h-10 w-10" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">
                      {getNotificationText(
                        notification.type,
                        notification.actor.displayName,
                        notification.post?.title
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatRelativeTime(new Date(notification.createdAt))}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                  )}
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div ref={loadMoreRef} className="flex justify-center py-4">
        {isFetchingNextPage && (
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        )}
      </div>
    </div>
  );
}
