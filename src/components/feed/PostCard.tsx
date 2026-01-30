"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  formatRelativeTime,
  getInitials,
  truncateText,
} from "~/lib/utils";
import { MessageCircle, ExternalLink, ChevronDown, Image as ImageIcon, Play, FileIcon } from "lucide-react";
import { ReactionButton } from "~/components/reactions/ReactionButton";
import { AttachmentCarousel } from "./AttachmentCarousel";

interface PostCardProps {
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
      thumbnailUrl: string | null;
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
    }>;
    _count: {
      comments: number;
      reactions: number;
      attachments: number;
    };
  };
}

function extractPlainText(content: unknown): string {
  if (!content || typeof content !== "object") return "";

  const root = (content as Record<string, unknown>).root;
  if (!root || typeof root !== "object") return "";

  const children = (root as Record<string, unknown>).children;
  if (!Array.isArray(children)) return "";

  const texts: string[] = [];

  function extractFromNode(node: unknown): void {
    if (!node || typeof node !== "object") return;

    const nodeObj = node as Record<string, unknown>;

    if (nodeObj.type === "text" && typeof nodeObj.text === "string") {
      texts.push(nodeObj.text);
    }

    if (Array.isArray(nodeObj.children)) {
      nodeObj.children.forEach(extractFromNode);
    }
  }

  children.forEach(extractFromNode);
  return texts.join(" ");
}

export function PostCard({ post }: PostCardProps) {
  const plainText = extractPlainText(post.content);
  const truncatedContent = truncateText(plainText, 300);
  const projectCount = post.projects.length;

  return (
    <Card className="overflow-hidden transition-shadow">
      <CardHeader className="px-5 pt-5 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/user/${post.author.id}`}>
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.author.avatarUrl ?? undefined} />
                <AvatarFallback>
                  {getInitials(post.author.displayName)}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-sm">
                <Link
                  href={`/user/${post.author.id}`}
                  className="font-medium hover:underline"
                >
                  {post.author.displayName}
                </Link>
                {projectCount > 0 && (
                  <>
                    <span className="text-muted-foreground">·</span>
                    {projectCount === 1 ? (
                      <Link
                        href={`/projects/${post.projects[0]?.project.id}`}
                        className="text-muted-foreground hover:text-foreground hover:underline"
                      >
                        in {post.projects[0]?.project.name}
                      </Link>
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                          in {projectCount} projects
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
              <Link
                href={`/post/${post.id}`}
                className="text-xs text-muted-foreground hover:underline"
              >
                {formatRelativeTime(new Date(post.createdAt))}
              </Link>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-5 pb-3">
        <Link href={`/post/${post.id}`} className="block">
          {post.title && (
            <h2 className="mb-2 text-lg font-semibold hover:underline">
              {post.title}
            </h2>
          )}
          {truncatedContent && (
            <p className="text-sm text-muted-foreground line-clamp-3">
              {truncatedContent}
            </p>
          )}
        </Link>

        {post.attachments.length > 0 && (
          <div className="mt-4">
            <AttachmentCarousel
              attachments={post.attachments}
              postId={post.id}
              totalCount={post._count.attachments}
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="px-5 pt-1 pb-3">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <ReactionButton
              postId={post.id}
              reactions={post.reactions}
              count={post._count.reactions}
            />
            <Link href={`/post/${post.id}#comments`}>
              <Button variant="ghost" size="sm" className="gap-2 rounded-full px-2 text-muted-foreground">
                <MessageCircle className="h-4 w-4" />
                {post._count.comments > 0 && post._count.comments}
              </Button>
            </Link>
          </div>
          {post.liveUrl && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={post.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gap-2"
              >
                View live
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
