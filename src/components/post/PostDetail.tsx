"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { UserAvatar } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
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
import { formatRelativeTime, pluralize } from "~/lib/utils";
import {
  ExternalLink,
  MessageSquarePlus,
  MoreHorizontal,
  Pencil,
  Trash2,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { EditorContent } from "~/components/editor/Editor";
import { ReactionButton } from "~/components/reactions/ReactionButton";
import { api } from "~/lib/trpc/client";
import type { SerializedEditorState } from "lexical";
import { useSession } from "next-auth/react";
import { FeedbackEntryProvider } from "~/components/feedback/FeedbackEntryContext";
import { FeedbackTab } from "~/components/feedback/FeedbackTab";
import { MediaLightboxProvider } from "~/components/ui/media-lightbox-context";

interface PostDetailProps {
  post: {
    id: string;
    title: string | null;
    content: unknown;
    liveUrl: string | null;
    visualFeedbackEnabled: boolean;
    createdAt: Date;
    author: {
      id: string;
      displayName: string;
      avatarUrl: string | null;
    };
    attachments: Array<{
      id: string;
      type: string;
      url: string;
      filename: string;
      mimeType: string;
      size: number;
      thumbnailUrl: string | null;
      width: number | null;
      height: number | null;
    }>;
    projects: Array<{
      project: {
        id: string;
        name: string;
      };
    }>;
    reactions: Array<{
      type: string;
      userId: string;
      user: {
        id: string;
        displayName: string;
      };
    }>;
    _count: {
      comments: number;
    };
  };
}

export function PostDetail({ post }: PostDetailProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const isAuthor = session?.user?.id === post.author.id;
  const isAdmin = session?.user?.role === "ADMIN" || session?.user?.role === "OWNER";
  const canModify = isAuthor || isAdmin;
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [feedbackAttachmentUrl, setFeedbackAttachmentUrl] = useState<string | null>(
    null
  );
  const { data: feedbackConfig } = api.site.getFeedbackConfig.useQuery();

  const isFeedbackAvailable = Boolean(
    feedbackConfig?.visualFeedbackEnabled && post.visualFeedbackEnabled
  );
  const isFeedbackModalOpen =
    isFeedbackAvailable && searchParams.get("tab") === "feedback";

  const deleteMutation = api.post.delete.useMutation({
    onSuccess: () => {
      router.push("/");
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate({ id: post.id });
  };

  const openFeedback = (input?: { attachmentUrl?: string }) => {
    if (!isFeedbackAvailable) {
      return;
    }

    setFeedbackAttachmentUrl(input?.attachmentUrl ?? null);

    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", "feedback");
    if (input?.attachmentUrl) {
      params.delete("session");
      params.delete("comment");
    }

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  const closeFeedbackModal = () => {
    setFeedbackAttachmentUrl(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("tab");
    params.delete("session");
    params.delete("comment");

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  return (
    <article className="space-y-6">
      {/* Header */}
      <header className="space-y-4">
        {/* Author info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/user/${post.author.id}`}>
              <UserAvatar avatarUrl={post.author.avatarUrl} name={post.author.displayName} className="h-10 w-10" />
            </Link>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-sm">
                <Link
                  href={`/user/${post.author.id}`}
                  className="font-medium hover:underline"
                >
                  {post.author.displayName}
                </Link>
                {post.projects.length > 0 && (
                  <>
                    <span className="text-muted-foreground">·</span>
                    {post.projects.length === 1 ? (
                      <Link
                        href={`/projects/${post.projects[0]?.project.id}`}
                        className="text-muted-foreground hover:text-foreground hover:underline"
                      >
                        in {post.projects[0]?.project.name}
                      </Link>
                    ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                          in {post.projects.length} {pluralize(post.projects.length, "project")}
                          <ChevronDown className="h-3 w-3" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {post.projects.map(({ project }) => (
                            <DropdownMenuItem key={project.id} asChild>
                              <Link href={`/projects/${project.id}`}>
                                {project.name}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {formatRelativeTime(new Date(post.createdAt))}
              </p>
            </div>
          </div>
          {canModify && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                  <span className="sr-only">Post options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isAuthor && (
                  <DropdownMenuItem asChild>
                    <Link href={`/post/${post.id}/edit`} className="gap-2">
                      <Pencil className="h-4 w-4" />
                      Edit post
                    </Link>
                  </DropdownMenuItem>
                )}
                {(isAuthor || isAdmin) && (
                  <>
                    {isAuthor && <DropdownMenuSeparator />}
                    <DropdownMenuItem
                      onClick={() => setShowDeleteDialog(true)}
                      className="gap-2 text-destructive focus:bg-destructive focus:text-destructive-foreground"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete post
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Delete confirmation dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete post?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete the post
                and all associated comments and reactions.
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

        {/* Title */}
        {post.title && (
          <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
        )}

      </header>

      {/* Content - attachments are rendered inline via EditorContent */}
      <FeedbackEntryProvider
        value={isFeedbackAvailable ? { openFeedback } : null}
      >
        <MediaLightboxProvider>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <EditorContent content={post.content as SerializedEditorState} />
          </div>
        </MediaLightboxProvider>
      </FeedbackEntryProvider>

      {isFeedbackAvailable && (
        <section className="rounded-lg border bg-card p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Visual Feedback</p>
              <p className="text-xs text-muted-foreground">
                Open feedback studio to add comments or record audio/video feedback.
              </p>
            </div>
            <Button
              type="button"
              onClick={() => openFeedback()}
              className="w-[207.859375px] gap-2 bg-primary/90 hover:bg-primary/90"
            >
              <MessageSquarePlus className="h-4 w-4" />
              Feedback Studio
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Hover any image or video to jump directly into feedback for that media.
          </p>
        </section>
      )}

      {/* Footer */}
      <footer className="flex items-center justify-between border-t pt-4">
        <div className="flex items-center gap-4">
          <ReactionButton
            postId={post.id}
            reactions={post.reactions}
            count={post.reactions.length}
          />
          <span className="text-sm text-muted-foreground">
            {post._count.comments} {pluralize(post._count.comments, "comment")}
          </span>
        </div>

        {post.liveUrl && (
          <Button variant="outline" asChild>
            <a
              href={post.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              View live
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        )}
      </footer>

      {isFeedbackAvailable && (
        <Dialog
          open={isFeedbackModalOpen}
          onOpenChange={(open) => {
            if (!open) {
              closeFeedbackModal();
            }
          }}
        >
          <DialogContent className="h-[94vh] w-[96vw] max-w-[96vw] overflow-hidden p-0">
            <DialogHeader className="border-b px-4 py-3">
              <DialogTitle>Visual Feedback</DialogTitle>
              <DialogDescription>
                Record walkthroughs, annotate frames, and add region comments.
              </DialogDescription>
            </DialogHeader>
            <div className="h-[calc(94vh-72px)] overflow-y-auto p-4">
              <FeedbackTab
                postId={post.id}
                initialFrameAttachmentUrl={feedbackAttachmentUrl}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </article>
  );
}
