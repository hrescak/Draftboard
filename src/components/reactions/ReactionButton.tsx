"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { api } from "~/lib/trpc/client";
import { Heart, Sparkles, ThumbsUp, SmilePlus } from "lucide-react";
import { cn } from "~/lib/utils";

interface ReactionButtonProps {
  postId?: string;
  commentId?: string;
  reactions: Array<{
    type: string;
    userId: string;
  }>;
  count: number;
}

const DEFAULT_REACTIONS = [
  { type: "like", icon: ThumbsUp, label: "Like" },
  { type: "wow", icon: Sparkles, label: "Wow" },
  { type: "cool", icon: Heart, label: "Cool" },
];

export function ReactionButton({
  postId,
  commentId,
  reactions,
  count,
}: ReactionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const utils = api.useUtils();

  const toggleMutation = api.reaction.toggle.useMutation({
    onSuccess: () => {
      if (postId) {
        utils.post.feed.invalidate();
        utils.post.getById.invalidate({ id: postId });
      }
      if (commentId) {
        utils.comment.byPost.invalidate();
      }
    },
  });

  // Group reactions by type
  const reactionCounts = reactions.reduce(
    (acc, r) => {
      acc[r.type] = (acc[r.type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const handleReaction = (type: string) => {
    toggleMutation.mutate({ type, postId, commentId });
    setIsOpen(false);
  };

  const hasReactions = count > 0;

  return (
    <TooltipProvider>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "gap-2 text-muted-foreground",
              hasReactions && "text-primary"
            )}
          >
            {hasReactions ? (
              <div className="flex -space-x-1">
                {Object.keys(reactionCounts)
                  .slice(0, 3)
                  .map((type) => {
                    const reaction = DEFAULT_REACTIONS.find((r) => r.type === type);
                    if (!reaction) return null;
                    const Icon = reaction.icon;
                    return (
                      <div
                        key={type}
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary"
                      >
                        <Icon className="h-3 w-3" />
                      </div>
                    );
                  })}
              </div>
            ) : (
              <SmilePlus className="h-4 w-4" />
            )}
            {count > 0 && <span>{count}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2" align="start">
          <div className="flex gap-1">
            {DEFAULT_REACTIONS.map((reaction) => {
              const Icon = reaction.icon;
              const userReacted = reactions.some(
                (r) => r.type === reaction.type
              );
              const reactionCount = reactionCounts[reaction.type] || 0;

              return (
                <Tooltip key={reaction.type}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => handleReaction(reaction.type)}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-110 hover:bg-muted",
                        userReacted && "bg-primary/10 text-primary"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {reaction.label}
                      {reactionCount > 0 && ` (${reactionCount})`}
                    </p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
}
