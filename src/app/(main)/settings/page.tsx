"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { api } from "~/lib/trpc/client";
import { Loader2, Sun, Moon, Monitor } from "lucide-react";
import { AvatarUpload } from "~/components/settings/AvatarUpload";
import { StickyPageHeader } from "~/components/layout/sticky-page-header";

export default function SettingsPage() {
  const { update: updateSession } = useSession();
  const { data: user } = api.user.me.useQuery();
  const [displayName, setDisplayName] = useState("");
  const [profileSlug, setProfileSlug] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [publishSiteSlug, setPublishSiteSlug] = useState("my-site");
  const [publishToken, setPublishToken] = useState<string | null>(null);
  const [publishTokenExpiresAt, setPublishTokenExpiresAt] = useState<string | null>(null);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [isGeneratingPublishToken, setIsGeneratingPublishToken] = useState(false);

  const updateMutation = api.user.updateProfile.useMutation({
    onSuccess: () => {
      updateSession();
    },
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({
      displayName: displayName || undefined,
      profileSlug: profileSlug || undefined,
      avatarUrl: avatarUrl || undefined,
    });
  };

  const handleGeneratePublishToken = async () => {
    try {
      setIsGeneratingPublishToken(true);
      setPublishError(null);
      const response = await fetch("/api/static-sites/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expiresInMinutes: 60 }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to create publish token");
      }

      const result = (await response.json()) as {
        token: string;
        expiresAt: string;
        profileSlug: string;
      };
      setPublishToken(result.token);
      setPublishTokenExpiresAt(result.expiresAt);
    } catch (error) {
      setPublishError(error instanceof Error ? error.message : "Failed to create publish token");
    } finally {
      setIsGeneratingPublishToken(false);
    }
  };

  const publishProfileSlug = user?.profileSlug ?? profileSlug;
  const publishBaseUrl =
    typeof window !== "undefined" ? window.location.origin : process.env.NEXTAUTH_URL || "";
  const publisherScriptUrl = `${publishBaseUrl}/api/static-sites/publisher-script`;
  const publishBasePath = `/u/${publishProfileSlug || "your-name"}/${publishSiteSlug || "my-site"}`;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <StickyPageHeader>
        <h1 className="text-2xl font-bold">Settings</h1>
      </StickyPageHeader>

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
              <Label htmlFor="profileSlug">Profile Slug</Label>
              <Input
                id="profileSlug"
                placeholder={user?.profileSlug || "your-name"}
                value={profileSlug}
                onChange={(e) => setProfileSlug(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Your websites publish under <code>/u/{user?.profileSlug || "your-name"}/&lt;site&gt;</code>
              </p>
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

      <Card>
        <CardHeader>
          <CardTitle>Static Publishing</CardTitle>
          <CardDescription>
            Generate a publish token for your machine, then deploy static exports under your profile.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="siteSlug">Site Slug</Label>
            <Input
              id="siteSlug"
              value={publishSiteSlug}
              onChange={(e) => setPublishSiteSlug(e.target.value)}
              placeholder="my-site"
            />
            <p className="text-xs text-muted-foreground">
              URL preview: <code>/u/{publishProfileSlug || "your-name"}/{publishSiteSlug || "my-site"}</code>
            </p>
          </div>

          <Button
            type="button"
            onClick={handleGeneratePublishToken}
            disabled={isGeneratingPublishToken}
          >
            {isGeneratingPublishToken && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Generate 1-Hour Publish Token
          </Button>

          {publishError && (
            <p className="text-sm text-destructive">{publishError}</p>
          )}

          {publishToken && (
            <div className="space-y-3 rounded-md border p-3">
              <div className="space-y-1">
                <p className="text-sm font-medium">Publish Token</p>
                <code className="block overflow-x-auto rounded bg-muted p-2 text-xs">
                  {publishToken}
                </code>
                <p className="text-xs text-muted-foreground">
                  Expires at {publishTokenExpiresAt ? new Date(publishTokenExpiresAt).toLocaleString() : "unknown"}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Run from your Next.js project</p>
                <code className="block overflow-x-auto rounded bg-muted p-2 text-xs">
                  {`curl -fsSL ${publisherScriptUrl} -o ./draftboard-publish.mjs\nSTATIC_BASE_PATH=${publishBasePath} npm run build\nnode ./draftboard-publish.mjs --base-url ${publishBaseUrl} --token ${publishToken} --profile ${publishProfileSlug || "your-name"} --slug ${publishSiteSlug || "my-site"} --post-mode compose --open-compose true --out-dir ./out`}
                </code>
                <p className="text-xs text-muted-foreground">
                  In your Next.js app, read <code>STATIC_BASE_PATH</code> in <code>next.config.ts</code> and set it as <code>basePath</code>. Compose mode outputs a prefilled <code>/compose</code> URL.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Appearance Section */}
      <AppearanceSettings />
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
