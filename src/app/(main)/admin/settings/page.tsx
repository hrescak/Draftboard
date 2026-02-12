"use client";

import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/lib/trpc/client";
import { Loader2, Copy, RefreshCw, Check, Trash2, Plus, CheckCircle2, XCircle } from "lucide-react";
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

      <FeedbackFeatureSettings />

      <IntegrationsSettings />
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

function FeedbackFeatureSettings() {
  const { data: settings, isLoading } = api.site.getSettings.useQuery();
  const utils = api.useUtils();

  const [enabled, setEnabled] = useState(false);
  const [maxVideoDurationSec, setMaxVideoDurationSec] = useState(300);
  const [maxAudioDurationSec, setMaxAudioDurationSec] = useState(30);
  const [maxVideoSizeMb, setMaxVideoSizeMb] = useState(1024);

  useEffect(() => {
    if (!settings) return;
    setEnabled(settings.visualFeedbackEnabled);
    setMaxVideoDurationSec(Math.max(30, settings.feedbackMaxVideoDurationSec));
    setMaxAudioDurationSec(Math.max(5, settings.feedbackMaxAudioDurationSec));
    setMaxVideoSizeMb(
      Math.max(10, Math.floor(settings.feedbackMaxVideoSizeBytes / (1024 * 1024)))
    );
  }, [settings]);

  const updateMutation = api.site.updateFeedbackSettings.useMutation({
    onSuccess: async () => {
      await utils.site.getSettings.invalidate();
      await utils.site.getFeedbackConfig.invalidate();
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const normalizedVideoDurationSec = Math.min(
      3600,
      Math.max(30, Math.floor(maxVideoDurationSec || 300))
    );
    const normalizedAudioDurationSec = Math.min(
      300,
      Math.max(5, Math.floor(maxAudioDurationSec || 30))
    );
    const normalizedVideoSizeMb = Math.min(
      2047,
      Math.max(10, Math.floor(maxVideoSizeMb || 1024))
    );

    updateMutation.mutate({
      visualFeedbackEnabled: enabled,
      feedbackMaxVideoDurationSec: normalizedVideoDurationSec,
      feedbackMaxAudioDurationSec: normalizedAudioDurationSec,
      feedbackMaxVideoSizeBytes: normalizedVideoSizeMb * 1024 * 1024,
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visual Feedback</CardTitle>
        <CardDescription>
          Configure the global rollout and recording limits for visual feedback.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center justify-between rounded-md border p-3">
            <div>
              <p className="text-sm font-medium">Enable Visual Feedback</p>
              <p className="text-xs text-muted-foreground">
                Authors can opt in per post when this is enabled.
              </p>
            </div>
            <Switch
              checked={enabled}
              onCheckedChange={setEnabled}
              aria-label="Enable visual feedback feature"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="max-video-duration">Max video duration (seconds)</Label>
              <Input
                id="max-video-duration"
                type="number"
                min={30}
                max={3600}
                value={maxVideoDurationSec}
                onChange={(event) => setMaxVideoDurationSec(Number(event.target.value || 300))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="max-audio-duration">Max audio duration (seconds)</Label>
              <Input
                id="max-audio-duration"
                type="number"
                min={5}
                max={300}
                value={maxAudioDurationSec}
                onChange={(event) => setMaxAudioDurationSec(Number(event.target.value || 30))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="max-video-size">Max video size (MB)</Label>
              <Input
                id="max-video-size"
                type="number"
                min={10}
                max={2047}
                value={maxVideoSizeMb}
                onChange={(event) => setMaxVideoSizeMb(Number(event.target.value || 1024))}
              />
            </div>
          </div>

          <Button type="submit" disabled={updateMutation.isPending}>
            {updateMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save Visual Feedback Settings
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function IntegrationsSettings() {
  const { data: settings, isLoading } = api.site.getSettings.useQuery();
  const [discordUrl, setDiscordUrl] = useState("");
  const [slackUrl, setSlackUrl] = useState("");
  const [discordTestResult, setDiscordTestResult] = useState<{ success: boolean; error?: string } | null>(null);
  const [slackTestResult, setSlackTestResult] = useState<{ success: boolean; error?: string } | null>(null);

  const utils = api.useUtils();

  // Initialize form values when settings load
  useEffect(() => {
    if (settings) {
      setDiscordUrl(settings.discordWebhookUrl || "");
      setSlackUrl(settings.slackWebhookUrl || "");
    }
  }, [settings]);

  const updateMutation = api.site.updateWebhooks.useMutation({
    onSuccess: () => {
      utils.site.getSettings.invalidate();
    },
  });

  const testMutation = api.site.testWebhook.useMutation();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setDiscordTestResult(null);
    setSlackTestResult(null);
    updateMutation.mutate({
      discordWebhookUrl: discordUrl,
      slackWebhookUrl: slackUrl,
    });
  };

  const handleTestDiscord = async () => {
    if (!discordUrl) return;
    setDiscordTestResult(null);
    const result = await testMutation.mutateAsync({ type: "discord", url: discordUrl });
    setDiscordTestResult(result);
  };

  const handleTestSlack = async () => {
    if (!slackUrl) return;
    setSlackTestResult(null);
    const result = await testMutation.mutateAsync({ type: "slack", url: slackUrl });
    setSlackTestResult(result);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Integrations</CardTitle>
        <CardDescription>
          Configure webhook notifications to send new post alerts to Discord and Slack channels.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-6">
          {/* Discord Webhook */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              <Label htmlFor="discord-webhook">Discord Webhook URL</Label>
            </div>
            <div className="flex gap-2">
              <Input
                id="discord-webhook"
                type="url"
                placeholder="https://discord.com/api/webhooks/..."
                value={discordUrl}
                onChange={(e) => setDiscordUrl(e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleTestDiscord}
                disabled={!discordUrl || testMutation.isPending}
              >
                {testMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Test"
                )}
              </Button>
            </div>
            {discordTestResult && (
              <div className={`flex items-center gap-2 text-sm ${discordTestResult.success ? "text-green-600" : "text-red-600"}`}>
                {discordTestResult.success ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Test message sent successfully!
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4" />
                    Failed: {discordTestResult.error}
                  </>
                )}
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Create a webhook in your Discord server: Server Settings → Integrations → Webhooks → New Webhook
            </p>
          </div>

          {/* Slack Webhook */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
              </svg>
              <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
            </div>
            <div className="flex gap-2">
              <Input
                id="slack-webhook"
                type="url"
                placeholder="https://hooks.slack.com/services/..."
                value={slackUrl}
                onChange={(e) => setSlackUrl(e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleTestSlack}
                disabled={!slackUrl || testMutation.isPending}
              >
                {testMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Test"
                )}
              </Button>
            </div>
            {slackTestResult && (
              <div className={`flex items-center gap-2 text-sm ${slackTestResult.success ? "text-green-600" : "text-red-600"}`}>
                {slackTestResult.success ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Test message sent successfully!
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4" />
                    Failed: {slackTestResult.error}
                  </>
                )}
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Create a Slack app and enable Incoming Webhooks: api.slack.com/apps → Create App → Incoming Webhooks
            </p>
          </div>

          <Button type="submit" disabled={updateMutation.isPending}>
            {updateMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save Webhook Settings
          </Button>

          {updateMutation.isSuccess && (
            <p className="text-sm text-green-600">Settings saved successfully!</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
