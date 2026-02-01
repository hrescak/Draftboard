"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { api } from "~/lib/trpc/client";
import { Loader2, Sun, Moon, Monitor, CheckCircle2, XCircle } from "lucide-react";
import { AvatarUpload } from "~/components/settings/AvatarUpload";

export default function SettingsPage() {
  const { data: session, update: updateSession } = useSession();
  const { data: user } = api.user.me.useQuery();
  const [displayName, setDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const updateMutation = api.user.updateProfile.useMutation({
    onSuccess: () => {
      updateSession();
    },
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({
      displayName: displayName || undefined,
      avatarUrl: avatarUrl || undefined,
    });
  };

  const isAdmin = session?.user?.role === "ADMIN" || session?.user?.role === "OWNER";

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <h1 className="text-2xl font-bold">Settings</h1>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Update your profile information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="space-y-2">
              <Label>Profile Photo</Label>
              <AvatarUpload
                value={avatarUrl || user?.avatarUrl || null}
                onChange={(url) => setAvatarUrl(url || "")}
                fallbackName={displayName || user?.displayName || ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                placeholder={user?.displayName || "Your name"}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={user?.email || ""} disabled />
              <p className="text-xs text-muted-foreground">
                Email cannot be changed
              </p>
            </div>

            <Button type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Appearance Section */}
      <AppearanceSettings />

      {/* Integrations Section (Admin only) */}
      {isAdmin && <IntegrationsSettings />}
    </div>
  );
}

function AppearanceSettings() {
  const { theme, setTheme } = useTheme();

  const themes = [
    {
      value: "light",
      label: "Light",
      description: "Light theme for bright environments",
      icon: Sun,
    },
    {
      value: "dark",
      label: "Dark",
      description: "Dark theme for low-light environments",
      icon: Moon,
    },
    {
      value: "system",
      label: "System",
      description: "Automatically match your system preference",
      icon: Monitor,
    },
  ] as const;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize how Draftboard looks on your device
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Label>Theme</Label>
          <div className="grid grid-cols-3 gap-4">
            {themes.map((t) => {
              const Icon = t.icon;
              const isSelected = theme === t.value;
              return (
                <button
                  key={t.value}
                  onClick={() => setTheme(t.value)}
                  className={`flex flex-col items-center gap-3 rounded-lg border-2 p-4 transition-colors hover:bg-muted ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                >
                  <Icon className={`h-6 w-6 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                  <div className="text-center">
                    <p className={`font-medium ${isSelected ? "text-primary" : ""}`}>
                      {t.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
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
      discordWebhookUrl: discordUrl || null,
      slackWebhookUrl: slackUrl || null,
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
