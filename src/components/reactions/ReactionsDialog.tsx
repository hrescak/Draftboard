"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { UserAvatar } from "~/components/ui/avatar";
import { Heart, Sparkles, CircleCheck, SmilePlus, type LucideIcon } from "lucide-react";
import { EmojiImage } from "~/components/settings/EmojiUpload";
import { cn, pluralize } from "~/lib/utils";

interface ReactionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reactions: Record<string, { userId: string; userName: string; avatarUrl: string | null }[]>;
  customEmojis?: Array<{ name: string; imageUrl: string }>;
  initialTab?: string;
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

export function ReactionsDialog({
  open,
  onOpenChange,
  reactions,
  customEmojis,
  initialTab,
}: ReactionsDialogProps) {
  const reactionTypes = Object.keys(reactions);
  const [activeTab, setActiveTab] = useState(initialTab || reactionTypes[0] || "");

  // Update active tab when initialTab changes (dialog reopened with different tab)
  useEffect(() => {
    if (initialTab && open) {
      setActiveTab(initialTab);
    }
  }, [initialTab, open]);

  // Build the list of all reaction options
  const allReactions: ReactionOption[] = [
    ...DEFAULT_REACTIONS,
    ...(customEmojis ?? []).map((emoji) => ({
      type: `emoji:${emoji.name}`,
      imageUrl: emoji.imageUrl,
      label: emoji.name,
    })),
  ];

  const getReactionInfo = (type: string): ReactionOption => {
    const reaction = allReactions.find((r) => r.type === type);
    if (reaction) return reaction;
    // Fallback for unknown types
    return { type, icon: SmilePlus, label: type };
  };

  const renderReactionIcon = (type: string, size: "sm" | "md" = "sm") => {
    const reaction = getReactionInfo(type);
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
    return <Icon className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} />;
  };

  const totalReactions = reactionTypes.reduce(
    (sum, type) => sum + (reactions[type]?.length ?? 0),
    0
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm p-0">
        <DialogHeader className="px-4 pt-4 pb-0">
          <DialogTitle className="text-base">
            {totalReactions} {pluralize(totalReactions, "reaction")}
          </DialogTitle>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mx-4 h-auto w-auto flex-wrap justify-start gap-1 bg-transparent p-0">
            {reactionTypes.map((type) => {
              const count = reactions[type]?.length ?? 0;
              return (
                <TabsTrigger
                  key={type}
                  value={type}
                  className={cn(
                    "gap-1.5 rounded-full px-3 py-1.5 data-[state=active]:bg-muted"
                  )}
                >
                  {renderReactionIcon(type)}
                  <span className="text-xs">{count}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
          {reactionTypes.map((type) => (
            <TabsContent key={type} value={type} className="mt-0 px-4 pb-4">
              <div className="max-h-64 overflow-y-auto">
                <div className="space-y-2 pt-3">
                  {reactions[type]?.map((user) => (
                    <Link
                      key={user.userId}
                      href={`/user/${user.userId}`}
                      onClick={() => onOpenChange(false)}
                      className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted"
                    >
                      <UserAvatar
                        avatarUrl={user.avatarUrl}
                        name={user.userName}
                        className="h-8 w-8"
                      />
                      <span className="text-sm font-medium">{user.userName}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
