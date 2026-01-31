"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Search, FileText, FolderKanban, Loader2 } from "lucide-react";
import { cn } from "~/lib/utils";
import { api } from "~/lib/trpc/client";
import { UserAvatar } from "~/components/ui/avatar";
import { useDebounce } from "~/lib/hooks/useDebounce";

interface SearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Thumbnail component with error handling
function SearchThumbnail({ 
  url, 
  fallbackIcon: FallbackIcon 
}: { 
  url: string | null; 
  fallbackIcon: React.ElementType;
}) {
  const [hasError, setHasError] = React.useState(false);

  // Reset error state when url changes
  React.useEffect(() => {
    setHasError(false);
  }, [url]);

  if (!url || hasError) {
    return (
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-muted">
        <FallbackIcon className="h-4 w-4 text-muted-foreground" />
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

export function SearchCommand({ open, onOpenChange }: SearchCommandProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const debouncedQuery = useDebounce(query, 300);

  const { data, isLoading } = api.search.global.useQuery(
    { query: debouncedQuery },
    {
      enabled: debouncedQuery.length > 0,
      staleTime: 1000 * 60, // 1 minute
    }
  );

  // Reset query when closing
  React.useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  // Handle keyboard shortcut
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const handleSelect = (href: string) => {
    onOpenChange(false);
    router.push(href);
  };

  const hasResults =
    data &&
    (data.users.length > 0 || data.posts.length > 0 || data.projects.length > 0);
  const showEmpty = debouncedQuery.length > 0 && !isLoading && !hasResults;

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Global Search"
      className={cn(
        "fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2",
        "overflow-hidden rounded-xl border bg-background shadow-2xl"
      )}
    >
      <VisuallyHidden.Root>
        <DialogPrimitive.Title>Search</DialogPrimitive.Title>
      </VisuallyHidden.Root>
      <div className="flex items-center border-b px-3">
        <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
        <Command.Input
          value={query}
          onValueChange={setQuery}
          placeholder="Search people, posts, projects..."
          className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
        />
        {isLoading && (
          <Loader2 className="h-4 w-4 shrink-0 animate-spin text-muted-foreground" />
        )}
      </div>
      <Command.List className="max-h-[400px] overflow-y-auto p-2">
        {query.length === 0 && (
          <div className="py-6 text-center text-sm text-muted-foreground">
            Start typing to search...
          </div>
        )}

        {showEmpty && (
          <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
            No results found.
          </Command.Empty>
        )}

        {data && data.users.length > 0 && (
          <Command.Group className="mb-2">
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
              People
            </div>
            {data.users.map((user) => (
              <Command.Item
                key={user.id}
                value={`user-${user.id}-${user.displayName}`}
                onSelect={() => handleSelect(`/user/${user.id}`)}
                className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm outline-none aria-selected:bg-foreground/5"
              >
                <UserAvatar
                  avatarUrl={user.avatarUrl}
                  name={user.displayName}
                  className="h-8 w-8"
                />
                <div className="flex flex-col">
                  <span className="font-medium">{user.displayName}</span>
                  <span className="text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </Command.Item>
            ))}
          </Command.Group>
        )}

        {data && data.posts.length > 0 && (
          <Command.Group className="mb-2">
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
              Posts
            </div>
            {data.posts.map((post) => (
              <Command.Item
                key={post.id}
                value={`post-${post.id}-${post.title || "untitled"}`}
                onSelect={() => handleSelect(`/post/${post.id}`)}
                className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm outline-none aria-selected:bg-foreground/5"
              >
                <SearchThumbnail
                  url={post.attachments[0]?.thumbnailUrl || post.attachments[0]?.url || null}
                  fallbackIcon={FileText}
                />
                <div className="flex flex-1 flex-col overflow-hidden">
                  <span className="truncate font-medium">
                    {post.title || "Untitled post"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    by {post.author.displayName}
                  </span>
                </div>
              </Command.Item>
            ))}
          </Command.Group>
        )}

        {data && data.projects.length > 0 && (
          <Command.Group className="mb-2">
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
              Projects
            </div>
            {data.projects.map((project) => (
              <Command.Item
                key={project.id}
                value={`project-${project.id}-${project.name}`}
                onSelect={() => handleSelect(`/projects/${project.id}`)}
                className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm outline-none aria-selected:bg-foreground/5"
              >
                <SearchThumbnail
                  url={project.coverUrl}
                  fallbackIcon={FolderKanban}
                />
                <div className="flex flex-1 flex-col overflow-hidden">
                  <span className="truncate font-medium">{project.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {project._count.posts} post{project._count.posts !== 1 ? "s" : ""}
                  </span>
                </div>
              </Command.Item>
            ))}
          </Command.Group>
        )}
      </Command.List>
      <div className="border-t px-3 py-2 text-xs text-muted-foreground">
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
        <span className="ml-2">to toggle search</span>
      </div>
    </Command.Dialog>
  );
}
