"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
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
import { formatRelativeTime, getInitials } from "~/lib/utils";
import { ExternalLink, MoreHorizontal, Pencil, Trash2, Loader2 } from "lucide-react";
import { EditorContent } from "~/components/editor/Editor";
import { ReactionButton } from "~/components/reactions/ReactionButton";
import { api } from "~/lib/trpc/client";
import type { SerializedEditorState } from "lexical";
import { useSession } from "next-auth/react";

interface PostDetailProps {
  post: {
    id: string;
    title: string | null;
    content: unknown;
    liveUrl: string | null;
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
  const { data: session } = useSession();
  const isAuthor = session?.user?.id === post.author.id;
  const isAdmin = session?.user?.role === "ADMIN" || session?.user?.role === "OWNER";
  const canModify = isAuthor || isAdmin;
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const deleteMutation = api.post.delete.useMutation({
    onSuccess: () => {
      router.push("/");
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate({ id: post.id });
  };

  return (
    <article className="space-y-6">
      {/* Header */}
      <header className="space-y-4">
        {/* Author info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/user/${post.author.id}`}>
              <Avatar className="h-12 w-12">
                <AvatarImage src={post.author.avatarUrl ?? undefined} />
                <AvatarFallback>{getInitials(post.author.displayName)}</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <Link
                href={`/user/${post.author.id}`}
                className="font-medium hover:underline"
              >
                {post.author.displayName}
              </Link>
              <p className="text-sm text-muted-foreground">
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
                      className="gap-2 text-destructive focus:text-destructive"
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

        {/* Projects */}
        {post.projects.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.projects.map(({ project }) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <Badge variant="secondary" className="hover:bg-secondary/80">
                  {project.name}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Content - attachments are rendered inline via EditorContent */}
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <EditorContent content={post.content as SerializedEditorState} />
      </div>

      {/* Footer */}
      <footer className="flex items-center justify-between border-t pt-4">
        <div className="flex items-center gap-4">
          <ReactionButton
            postId={post.id}
            reactions={post.reactions}
            count={post.reactions.length}
          />
          <span className="text-sm text-muted-foreground">
            {post._count.comments} comments
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
    </article>
  );
}
