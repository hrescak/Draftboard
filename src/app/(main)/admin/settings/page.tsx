"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/lib/trpc/client";
import { Loader2, Copy, RefreshCw, Check, Trash2, Plus } from "lucide-react";
import { EmojiUpload, EmojiImage } from "~/components/settings/EmojiUpload";

export default function AdminSettingsPage() {
  const [copied, setCopied] = useState(false);
  const utils = api.useUtils();

  const { data: settings, isLoading } = api.site.getSettings.useQuery();

  const regenerateMutation = api.site.regenerateInvite.useMutation({
    onSuccess: () => {
      utils.site.getSettings.invalidate();
    },
  });

  const updateMutation = api.site.updateSettings.useMutation({
    onSuccess: () => {
      utils.site.getSettings.invalidate();
    },
  });

  const inviteUrl = settings
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/invite/${settings.inviteToken}`
    : "";

  const copyInviteLink = async () => {
    await navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Invite Link</CardTitle>
          <CardDescription>
            Share this link with people you want to invite to Draftboard.
            Anyone with this link can create an account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="inviteLink">Invite URL</Label>
            <div className="flex gap-2">
              <Input
                id="inviteLink"
                value={inviteUrl}
                readOnly
                className="font-mono text-sm"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={copyInviteLink}
                title="Copy invite link"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => regenerateMutation.mutate()}
              disabled={regenerateMutation.isPending}
            >
              {regenerateMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4" />
              )}
              Regenerate Link
            </Button>
            <p className="text-sm text-muted-foreground">
              Regenerating will invalidate the current link.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Site Settings</CardTitle>
          <CardDescription>
            Configure your Draftboard instance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SiteNameForm 
            currentName={settings?.siteName || "Draftboard"} 
            onSave={(siteName) => updateMutation.mutate({ siteName })}
            isPending={updateMutation.isPending}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Custom Emoji</CardTitle>
          <CardDescription>
            Add custom emoji that can be used as reactions throughout Draftboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CustomEmojiSection />
        </CardContent>
      </Card>
    </div>
  );
}

function SiteNameForm({
  currentName,
  onSave,
  isPending,
}: {
  currentName: string;
  onSave: (name: string) => void;
  isPending: boolean;
}) {
  const [siteName, setSiteName] = useState(currentName);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(siteName);
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="siteName">Site Name</Label>
        <Input
          id="siteName"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
          placeholder="Draftboard"
        />
      </div>
      <Button type="submit" disabled={isPending || siteName === currentName}>
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save Changes
      </Button>
    </form>
  );
}

function CustomEmojiSection() {
  const [isAdding, setIsAdding] = useState(false);
  const [newEmojiName, setNewEmojiName] = useState("");
  const [newEmojiUrl, setNewEmojiUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const utils = api.useUtils();

  const { data: emojis, isLoading } = api.reaction.listEmoji.useQuery();

  const createMutation = api.reaction.createEmoji.useMutation({
    onSuccess: () => {
      utils.reaction.listEmoji.invalidate();
      setIsAdding(false);
      setNewEmojiName("");
      setNewEmojiUrl(null);
      setError(null);
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const deleteMutation = api.reaction.deleteEmoji.useMutation({
    onSuccess: () => {
      utils.reaction.listEmoji.invalidate();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmojiName || !newEmojiUrl) {
      setError("Please provide both a name and an image");
      return;
    }
    if (!/^[a-z0-9_]+$/.test(newEmojiName)) {
      setError("Name can only contain lowercase letters, numbers, and underscores");
      return;
    }
    createMutation.mutate({ name: newEmojiName, imageUrl: newEmojiUrl });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {emojis && emojis.length > 0 && (
        <div className="space-y-2">
          <Label>Current Emoji</Label>
          <div className="flex flex-wrap gap-2">
            {emojis.map((emoji) => (
              <div
                key={emoji.id}
                className="group flex items-center gap-2 rounded-md border bg-muted/50 px-2 py-1"
              >
                <EmojiImage url={emoji.imageUrl} alt={emoji.name} className="h-6 w-6" />
                <span className="text-sm">:{emoji.name}:</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => deleteMutation.mutate({ id: emoji.id })}
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {isAdding ? (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border p-4">
          <div className="flex items-start gap-4">
            <div className="space-y-2">
              <Label>Image</Label>
              <EmojiUpload value={newEmojiUrl} onChange={setNewEmojiUrl} />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="emojiName">Name</Label>
              <Input
                id="emojiName"
                value={newEmojiName}
                onChange={(e) => setNewEmojiName(e.target.value.toLowerCase())}
                placeholder="my_emoji"
                pattern="^[a-z0-9_]+$"
              />
              <p className="text-xs text-muted-foreground">
                Lowercase letters, numbers, and underscores only
              </p>
            </div>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="flex gap-2">
            <Button type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Add Emoji
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsAdding(false);
                setNewEmojiName("");
                setNewEmojiUrl(null);
                setError(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <Button variant="outline" onClick={() => setIsAdding(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Custom Emoji
        </Button>
      )}
    </div>
  );
}
