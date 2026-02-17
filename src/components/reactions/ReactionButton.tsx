"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSession } from "next-auth/react";
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
import { Heart, Sparkles, CircleCheck, SmilePlus, type LucideIcon } from "lucide-react";
import { cn, pluralize } from "~/lib/utils";
import { EmojiImage } from "~/components/settings/EmojiUpload";
import { ReactionsDialog } from "./ReactionsDialog";

interface ReactionButtonProps {
  postId?: string;
  commentId?: string;
  reactions: Array<{
    type: string;
    userId: string;
  }>;
  count: number;
}

interface DefaultReaction {
  type: string;
  icon: LucideIcon;
  label: string;
}

interface CustomEmojiReaction {
  type: string;
  imageUrl: string;
  label: string;
}

type ReactionOption = DefaultReaction | CustomEmojiReaction;

function isCustomEmoji(reaction: ReactionOption): reaction is CustomEmojiReaction {
  return "imageUrl" in reaction;
}

const DEFAULT_REACTIONS: DefaultReaction[] = [
  { type: "like", icon: Heart, label: "Like" },
  { type: "wow", icon: Sparkles, label: "Wow" },
  { type: "approve", icon: CircleCheck, label: "Approve" },
];

export function ReactionButton({
  postId,
  commentId,
  reactions,
  count,
}: ReactionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogInitialTab, setDialogInitialTab] = useState<string | undefined>();
  const { data: session } = useSession();
  const utils = api.useUtils();
  const currentUserId = session?.user?.id;

  // Fetch custom emojis
  const { data: customEmojis } = api.reaction.listEmoji.useQuery();

  // Fetch detailed reactions for tooltip display (with user names)
  const { data: detailedReactions } = api.reaction.byPost.useQuery(
    { postId: postId! },
    { enabled: !!postId }
  );

  const { data: detailedCommentReactions } = api.reaction.byComment.useQuery(
    { commentId: commentId! },
    { enabled: !!commentId }
  );

  const reactionDetails = postId ? detailedReactions : detailedCommentReactions;

  // Combine default reactions with custom emojis
  const allReactions = useMemo<ReactionOption[]>(() => {
    const customReactions: CustomEmojiReaction[] = (customEmojis ?? []).map((emoji) => ({
      type: `emoji:${emoji.name}`,
      imageUrl: emoji.imageUrl,
      label: emoji.name,
    }));
    return [...DEFAULT_REACTIONS, ...customReactions];
  }, [customEmojis]);

  // Get the user's current reaction from server data
  const serverUserReaction = useMemo(
    () => reactions.find((r) => r.userId === currentUserId)?.type ?? null,
    [reactions, currentUserId]
  );

  // Optimistic state for the user's reaction
  const [optimisticReaction, setOptimisticReaction] = useState<string | null>(
    serverUserReaction
  );

  // Sync optimistic state when server data changes (after successful mutation)
  useEffect(() => {
    setOptimisticReaction(serverUserReaction);
  }, [serverUserReaction]);

  const toggleMutation = api.reaction.toggle.useMutation({
    onSuccess: () => {
      if (postId) {
        utils.post.feed.invalidate();
        utils.post.getById.invalidate({ id: postId });
        utils.reaction.byPost.invalidate({ postId });
      }
      if (commentId) {
        utils.comment.byPost.invalidate();
        utils.reaction.byComment.invalidate({ commentId });
      }
    },
    onError: () => {
      // Revert to server state on error
      setOptimisticReaction(serverUserReaction);
    },
  });

  // Compute optimistic reactions list and counts
  const { optimisticCount, reactionCounts } = useMemo(() => {
    // Start with reactions from other users
    const otherReactions = reactions.filter((r) => r.userId !== currentUserId);

    // Add optimistic user reaction if present
    const allReactions =
      optimisticReaction && currentUserId
        ? [...otherReactions, { type: optimisticReaction, userId: currentUserId }]
        : otherReactions;

    // Calculate counts
    const counts = allReactions.reduce(
      (acc, r) => {
        acc[r.type] = (acc[r.type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return {
      optimisticCount: allReactions.length,
      reactionCounts: counts,
    };
  }, [reactions, currentUserId, optimisticReaction]);

  const handleReaction = (type: string) => {
    // Optimistically update
    if (optimisticReaction === type) {
      // Toggle off
      setOptimisticReaction(null);
    } else {
      // Set new reaction (or change existing)
      setOptimisticReaction(type);
    }

    toggleMutation.mutate({ type, postId, commentId });
    setIsOpen(false);
  };

  const hasReactions = optimisticCount > 0;

  // Helper to render a reaction icon (either Lucide icon or custom emoji)
  const renderReactionIcon = (type: string, size: "sm" | "md" = "md") => {
    const reaction = allReactions.find((r) => r.type === type);
    if (!reaction) {
      // Fallback for unknown reaction types
      return <SmilePlus className={size === "sm" ? "h-3 w-3" : "h-5 w-5"} />;
    }

    if (isCustomEmoji(reaction)) {
      return (
        <EmojiImage
          url={reaction.imageUrl}
          alt={reaction.label}
          className={size === "sm" ? "h-4 w-4" : "h-5 w-5"}
        />
      );
    }

    const Icon = reaction.icon;
    return <Icon className={size === "sm" ? "h-3 w-3" : "h-5 w-5"} />;
  };

  // Get reaction label for display
  const getReactionLabel = (type: string): string => {
    const reaction = allReactions.find((r) => r.type === type);
    return reaction?.label ?? type;
  };

  // Format the tooltip text for a reaction type
  const formatReactionTooltip = (type: string): { text: string; hasMore: boolean; moreCount: number } => {
    const users = reactionDetails?.[type] ?? [];
    if (users.length === 0) {
      return { text: getReactionLabel(type), hasMore: false, moreCount: 0 };
    }

    const names = users.map((u) => u.userName);

    if (names.length <= 3) {
      return { text: names.join(", "), hasMore: false, moreCount: 0 };
    }

    const displayedNames = names.slice(0, 3).join(", ");
    const moreCount = names.length - 3;
    return {
      text: displayedNames,
      hasMore: true,
      moreCount,
    };
  };

  const openDialogWithTab = (tab: string) => {
    setDialogInitialTab(tab);
    setDialogOpen(true);
  };

  return (
    <TooltipProvider>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "gap-1 rounded-full px-2 text-muted-foreground",
              hasReactions && "[&:not(:hover)]:text-primary"
            )}
          >
            {hasReactions ? (
              <div className="flex gap-0.5">
                {Object.keys(reactionCounts)
                  .slice(0, 3)
                  .map((type) => (
                    <ReactionIconWithTooltip
                      key={type}
                      type={type}
                      renderIcon={renderReactionIcon}
                      formatTooltip={formatReactionTooltip}
                      onShowAll={() => openDialogWithTab(type)}
                    />
                  ))}
              </div>
            ) : (
              <SmilePlus className="h-4 w-4" />
            )}
            {optimisticCount > 0 && <span>{optimisticCount}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2" side="top" align="start">
          <div className="flex flex-wrap gap-1 max-w-[200px]">
            {allReactions.map((reaction) => {
              const userReacted = optimisticReaction === reaction.type;
              const reactionCount = reactionCounts[reaction.type] || 0;

              return (
                <Tooltip key={reaction.type}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => handleReaction(reaction.type)}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-110 hover:bg-muted hover:text-foreground",
                        userReacted && "[&:not(:hover)]:bg-primary/10 [&:not(:hover)]:text-primary"
                      )}
                    >
                      {isCustomEmoji(reaction) ? (
                        <EmojiImage
                          url={reaction.imageUrl}
                          alt={reaction.label}
                          className="h-5 w-5"
                        />
                      ) : (
                        <reaction.icon className="h-5 w-5" />
                      )}
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

      {/* Reactions dialog */}
      {reactionDetails && (
        <ReactionsDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          reactions={reactionDetails}
          customEmojis={customEmojis}
          initialTab={dialogInitialTab}
        />
      )}
    </TooltipProvider>
  );
}

// Separate component to handle individual reaction icon with hover tooltip
function ReactionIconWithTooltip({
  type,
  renderIcon,
  formatTooltip,
  onShowAll,
}: {
  type: string;
  renderIcon: (type: string, size: "sm" | "md") => React.ReactNode;
  formatTooltip: (type: string) => { text: string; hasMore: boolean; moreCount: number };
  onShowAll: () => void;
}) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const tooltip = formatTooltip(type);

  const handleMouseEnter = () => {
    const timeout = setTimeout(() => {
      setTooltipOpen(true);
    }, 500);
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setTooltipOpen(false);
  };

  return (
    <Popover open={tooltipOpen} onOpenChange={setTooltipOpen}>
      <PopoverTrigger asChild>
        <div
          className="flex h-5 w-5 items-center justify-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {renderIcon(type, "sm")}
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto max-w-xs p-2 text-sm"
        side="top"
        align="center"
        onMouseEnter={() => setTooltipOpen(true)}
        onMouseLeave={handleMouseLeave}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <p>
          {tooltip.text}
          {tooltip.hasMore && (
            <>
              {" and "}
              <button
                className="font-medium text-primary hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  setTooltipOpen(false);
                  onShowAll();
                }}
              >
                {tooltip.moreCount} {pluralize(tooltip.moreCount, "other")}
              </button>
            </>
          )}
        </p>
      </PopoverContent>
    </Popover>
  );
}
