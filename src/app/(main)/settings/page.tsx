"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { api } from "~/lib/trpc/client";
import { getInitials } from "~/lib/utils";
import { Loader2, User, Users, Smile, Palette, Sun, Moon, Monitor } from "lucide-react";

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
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
          {isAdmin && (
            <>
              <TabsTrigger value="users" className="gap-2">
                <Users className="h-4 w-4" />
                Users
              </TabsTrigger>
              <TabsTrigger value="emoji" className="gap-2">
                <Smile className="h-4 w-4" />
                Emoji
              </TabsTrigger>
            </>
          )}
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Update your profile information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={avatarUrl || user?.avatarUrl || undefined} />
                    <AvatarFallback className="text-xl">
                      {getInitials(displayName || user?.displayName || "")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="avatarUrl">Avatar URL</Label>
                    <Input
                      id="avatarUrl"
                      type="url"
                      placeholder="https://example.com/avatar.jpg"
                      value={avatarUrl}
                      onChange={(e) => setAvatarUrl(e.target.value)}
                    />
                  </div>
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
        </TabsContent>

        <TabsContent value="appearance">
          <AppearanceSettings />
        </TabsContent>

        {isAdmin && (
          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
        )}

        {isAdmin && (
          <TabsContent value="emoji">
            <EmojiManagement />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}

function UserManagement() {
  const { data, isLoading } = api.user.list.useQuery({ limit: 50 });
  const utils = api.useUtils();

  const updateRoleMutation = api.user.updateRole.useMutation({
    onSuccess: () => {
      utils.user.list.invalidate();
    },
  });

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
        <CardTitle>User Management</CardTitle>
        <CardDescription>
          Manage user roles and permissions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="divide-y">
          {data?.users.map((user) => (
            <div key={user.id} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={user.avatarUrl || undefined} />
                  <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.displayName}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{user.role}</span>
                {user.role !== "OWNER" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateRoleMutation.mutate({
                        userId: user.id,
                        role: user.role === "ADMIN" ? "MEMBER" : "ADMIN",
                      })
                    }
                    disabled={updateRoleMutation.isPending}
                  >
                    {user.role === "ADMIN" ? "Remove Admin" : "Make Admin"}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
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

function EmojiManagement() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const utils = api.useUtils();

  const { data: emoji, isLoading } = api.reaction.listEmoji.useQuery();

  const createMutation = api.reaction.createEmoji.useMutation({
    onSuccess: () => {
      setName("");
      setImageUrl("");
      utils.reaction.listEmoji.invalidate();
    },
  });

  const deleteMutation = api.reaction.deleteEmoji.useMutation({
    onSuccess: () => {
      utils.reaction.listEmoji.invalidate();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !imageUrl) return;
    createMutation.mutate({ name, imageUrl });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Custom Emoji</CardTitle>
        <CardDescription>
          Add custom emoji for reactions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="emoji_name"
            value={name}
            onChange={(e) => setName(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
            className="w-40"
          />
          <Input
            type="url"
            placeholder="Image URL (32x32)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={!name || !imageUrl || createMutation.isPending}>
            {createMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Add"
            )}
          </Button>
        </form>

        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {emoji?.map((e) => (
              <div
                key={e.id}
                className="flex items-center justify-between rounded-lg border p-2"
              >
                <div className="flex items-center gap-2">
                  <img src={e.imageUrl} alt={e.name} className="h-8 w-8" />
                  <span className="text-sm">:{e.name}:</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteMutation.mutate({ id: e.id })}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
