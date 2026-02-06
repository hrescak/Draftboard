"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import { Home, FolderOpen, Bell, Plus, Settings, User, Shield, FileText, Search, LogOut } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { UserAvatar } from "~/components/ui/avatar";
import { Logo } from "~/components/ui/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { signOut } from "next-auth/react";
import { api } from "~/lib/trpc/client";
import { useState } from "react";
import { SearchCommand } from "~/components/search/SearchCommand";

// Thumbnail component with error handling for draft images
function DraftThumbnail({ url }: { url: string | null }) {
  const [hasError, setHasError] = useState(false);

  if (!url || hasError) {
    return (
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-muted">
        <FileText className="h-4 w-4 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="h-8 w-8 shrink-0 overflow-hidden rounded bg-muted">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt=""
        className="h-full w-full object-cover"
        onError={() => setHasError(true)}
      />
    </div>
  );
}

const navItemsBeforeSearch = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: FolderOpen },
];

const navItemsAfterSearch = [
  { href: "/notifications", label: "Notifications", icon: Bell },
];

const mobileNavItemsBeforeSearch = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: FolderOpen },
];

const mobileNavItemsAfterSearch = [
  { href: "/notifications", label: "Notifications", icon: Bell },
];

interface MainNavProps {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    role: "MEMBER" | "ADMIN" | "OWNER";
  };
}

export function MainNav({ user }: MainNavProps) {
  const pathname = usePathname();
  const [composeOpen, setComposeOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Fetch current user data to get fresh avatar URL (session may be stale)
  const { data: currentUser } = api.user.me.useQuery();

  // Fetch unread notification count
  const { data: unreadCount } = api.notification.unreadCount.useQuery();

  // Hide badge when on notifications page
  const isOnNotifications = pathname === "/notifications";
  const showNotificationBadge = !isOnNotifications && (unreadCount ?? 0) > 0;

  // Use fresh avatar from API if available, otherwise fall back to session
  const avatarUrl = currentUser?.avatarUrl ?? user.image;

  // Always fetch drafts to know whether to show popover or direct link
  const { data: drafts, error: draftsError } = api.draft.list.useQuery();

  // Log error for debugging
  if (draftsError) {
    console.error("Failed to fetch drafts:", draftsError.message);
  }

  const hasDrafts = drafts && drafts.length > 0;

  // Helper to format relative time
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  // Get display info for a draft
  const getDraftDisplayInfo = (draft: {
    id: string;
    title: string | null;
    preview: string | null;
    firstImageUrl: string | null;
    updatedAt: Date;
  }) => {
    if (draft.title) return draft.title;
    if (draft.preview) return draft.preview.slice(0, 40) + (draft.preview.length > 40 ? "..." : "");
    return "Untitled draft";
  };

  return (
    <>
      {/* Desktop Sidebar - hidden on mobile */}
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-16 flex-col bg-background sm:flex">
        {/* Logo at top - aligned with content header */}
        <div className="flex items-start justify-center pt-4">
          <Link href="/" className="text-foreground transition-transform hover:scale-105">
            <Logo width={30} height={30} />
          </Link>
        </div>

        {/* Centered navigation items */}
        <nav className="flex flex-1 flex-col items-center justify-center gap-1">
          {navItemsBeforeSearch.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Tooltip key={item.href} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                      isActive
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}

          {/* Search button - after Projects */}
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button
                onClick={() => setSearchOpen(true)}
                className="flex h-12 w-12 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground"
              >
                <Search className="h-6 w-6" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              Search
              <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                <span className="text-xs">⌘</span>K
              </kbd>
            </TooltipContent>
          </Tooltip>

          {navItemsAfterSearch.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            const Icon = item.icon;
            const isNotifications = item.href === "/notifications";

            return (
              <Tooltip key={item.href} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                      isActive
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    )}
                  >
                    <Icon className="h-6 w-6" />
                    {isNotifications && showNotificationBadge && (
                      <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-500 px-1 text-[10px] font-medium text-white">
                        {(unreadCount ?? 0) > 99 ? "99+" : unreadCount}
                      </span>
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}

          {/* Compose button - direct link if no drafts, popover if drafts exist */}
          {hasDrafts ? (
            <Popover open={composeOpen} onOpenChange={setComposeOpen}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <PopoverTrigger asChild>
                    <button
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl transition-colors hover:bg-secondary/50 hover:text-foreground",
                        composeOpen ? "bg-secondary text-foreground" : "text-muted-foreground"
                      )}
                    >
                      <Plus className="h-6 w-6" />
                    </button>
                  </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent side="right">New Post</TooltipContent>
              </Tooltip>
              <PopoverContent side="right" align="start" className="w-72 p-0">
                <div className="p-2">
                  <Link
                    href="/compose"
                    onClick={() => setComposeOpen(false)}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary"
                  >
                    <Plus className="h-4 w-4" />
                    New post
                  </Link>
                </div>
                <div className="border-t" />
                <div className="p-2">
                  <p className="px-3 py-1.5 text-xs font-medium text-muted-foreground">
                    Drafts
                  </p>
                  <div className="space-y-0.5">
                    {drafts.map((draft) => (
                      <Link
                        key={draft.id}
                        href={`/compose?draft=${draft.id}`}
                        onClick={() => setComposeOpen(false)}
                        className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-secondary"
                      >
                        <DraftThumbnail url={draft.firstImageUrl} />
                        <div className="flex-1 overflow-hidden">
                          <p className="truncate font-medium">
                            {getDraftDisplayInfo(draft)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatRelativeTime(draft.updatedAt)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href="/compose"
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground"
                >
                  <Plus className="h-6 w-6" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">New Post</TooltipContent>
            </Tooltip>
          )}
        </nav>

        {/* Profile at bottom */}
        <div className="flex flex-col items-center gap-1 pb-4">
          <DropdownMenu>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <button className="flex h-12 w-12 items-center justify-center rounded-xl transition-colors cursor-pointer hover:bg-secondary/50">
                    <UserAvatar avatarUrl={avatarUrl} name={user.name} className="h-8 w-8" />
                  </button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="right">Profile</TooltipContent>
            </Tooltip>
            <DropdownMenuContent side="right" align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/user/${user.id}`}>
                  <User className="mr-2 h-4 w-4" />
                  View Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              {(user.role === "ADMIN" || user.role === "OWNER") && (
                <DropdownMenuItem asChild>
                  <Link href="/admin/settings">
                    <Shield className="mr-2 h-4 w-4" />
                    Site Admin
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:bg-destructive focus:text-destructive-foreground"
                onClick={() => signOut({ callbackUrl: "/sign-in" })}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Search Command Dialog (desktop) */}
      <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />

      {/* Mobile Bottom Tab Bar - shown only on mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t bg-background px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom,0.5rem))] sm:hidden">
        {mobileNavItemsBeforeSearch.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex h-12 w-12 flex-col items-center justify-center rounded-xl transition-colors",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              <Icon className="h-6 w-6" />
            </Link>
          );
        })}

        {/* Mobile Search button - navigates to search page */}
        <Link
          href="/search"
          className={cn(
            "flex h-12 w-12 flex-col items-center justify-center rounded-xl transition-colors",
            pathname === "/search"
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        >
          <Search className="h-6 w-6" />
        </Link>

        {mobileNavItemsAfterSearch.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;
          const isNotifications = item.href === "/notifications";

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex h-12 w-12 flex-col items-center justify-center rounded-xl transition-colors",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              <Icon className="h-6 w-6" />
              {isNotifications && showNotificationBadge && (
                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-500 px-1 text-[10px] font-medium text-white">
                  {(unreadCount ?? 0) > 99 ? "99+" : unreadCount}
                </span>
              )}
            </Link>
          );
        })}

        {/* Mobile Compose button - direct link if no drafts, popover if drafts exist */}
        {hasDrafts ? (
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex h-12 w-12 flex-col items-center justify-center rounded-xl text-muted-foreground transition-colors">
                <Plus className="h-6 w-6" />
              </button>
            </PopoverTrigger>
            <PopoverContent side="top" align="center" className="w-72 p-0">
              <div className="p-2">
                <Link
                  href="/compose"
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary"
                >
                  <Plus className="h-4 w-4" />
                  New post
                </Link>
              </div>
              <div className="border-t" />
              <div className="max-h-64 overflow-y-auto p-2">
                <p className="px-3 py-1.5 text-xs font-medium text-muted-foreground">
                  Drafts
                </p>
                <div className="space-y-0.5">
                  {drafts.map((draft) => (
                    <Link
                      key={draft.id}
                      href={`/compose?draft=${draft.id}`}
                      className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-secondary"
                    >
                      <DraftThumbnail url={draft.firstImageUrl} />
                      <div className="flex-1 overflow-hidden">
                        <p className="truncate font-medium">
                          {getDraftDisplayInfo(draft)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatRelativeTime(draft.updatedAt)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <Link
            href="/compose"
            className="flex h-12 w-12 flex-col items-center justify-center rounded-xl text-muted-foreground transition-colors"
          >
            <Plus className="h-6 w-6" />
          </Link>
        )}

        {/* Profile tab */}
        <Link
          href={`/user/${user.id}`}
          className={cn(
            "flex h-12 w-12 flex-col items-center justify-center rounded-xl transition-colors",
            pathname.startsWith("/user/")
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        >
          <User className="h-6 w-6" />
        </Link>
      </nav>
    </>
  );
}
