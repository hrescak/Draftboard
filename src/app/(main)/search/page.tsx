"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, FolderOpen, Loader2, ArrowLeft } from "lucide-react";
import { api } from "~/lib/trpc/client";
import { skipToken } from "@tanstack/react-query";
import { UserAvatar } from "~/components/ui/avatar";
import { useDebounce } from "~/lib/hooks/useDebounce";
import { pluralize } from "~/lib/utils";
import { SearchThumbnail } from "~/components/search/SearchThumbnail";

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const debouncedQuery = useDebounce(query, 300);

  const { data, isLoading } = api.search.global.useQuery(
    debouncedQuery.length > 0 ? { query: debouncedQuery } : skipToken,
    {
      staleTime: 1000 * 60,
    }
  );

  const handleSelect = (href: string) => {
    router.push(href);
  };

  const hasResults =
    data &&
    (data.users.length > 0 ||
      data.posts.length > 0 ||
      data.projects.length > 0);
  const showEmpty = debouncedQuery.length > 0 && !isLoading && !hasResults;

  return (
    <div className="-mx-4 -mt-4">
      {/* Search header */}
      <div className="sticky top-0 z-30 bg-background">
        <div className="flex items-center gap-2 px-3 py-2">
          <button
            onClick={() => router.back()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="relative flex flex-1 items-center">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search people, posts, projects..."
              className="h-10 w-full rounded-full bg-secondary pl-9 pr-9 text-sm outline-none placeholder:text-muted-foreground"
              autoFocus
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
            />
            {isLoading && (
              <Loader2 className="absolute right-3 h-4 w-4 animate-spin text-muted-foreground" />
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="px-4 pb-24">
        {query.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">
            Start typing to search...
          </div>
        )}

        {showEmpty && (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No results found.
          </div>
        )}

        {data && data.users.length > 0 && (
          <div className="mb-4">
            <div className="px-1 py-2 text-xs font-semibold text-muted-foreground">
              People
            </div>
            <div className="space-y-0.5">
              {data.users.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleSelect(`/user/${user.id}`)}
                  className="flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left text-sm transition-colors active:bg-secondary"
                >
                  <UserAvatar
                    avatarUrl={user.avatarUrl}
                    name={user.displayName}
                    className="h-10 w-10"
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{user.displayName}</span>
                      {user.deactivated && (
                        <span className="inline-flex items-center rounded-full bg-red-100 px-1.5 py-0.5 text-[10px] font-medium text-red-800 dark:bg-red-900/30 dark:text-red-400">
                          Deactivated
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {data && data.posts.length > 0 && (
          <div className="mb-4">
            <div className="px-1 py-2 text-xs font-semibold text-muted-foreground">
              Posts
            </div>
            <div className="space-y-0.5">
              {data.posts.map((post) => (
                <button
                  key={post.id}
                  onClick={() => handleSelect(`/post/${post.id}`)}
                  className="flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left text-sm transition-colors active:bg-secondary"
                >
                  <SearchThumbnail
                    url={
                      post.attachments[0]?.thumbnailUrl ||
                      post.attachments[0]?.url ||
                      null
                    }
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
                </button>
              ))}
            </div>
          </div>
        )}

        {data && data.projects.length > 0 && (
          <div className="mb-4">
            <div className="px-1 py-2 text-xs font-semibold text-muted-foreground">
              Projects
            </div>
            <div className="space-y-0.5">
              {data.projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => handleSelect(`/projects/${project.id}`)}
                  className="flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left text-sm transition-colors active:bg-secondary"
                >
                  <SearchThumbnail
                    url={project.coverUrl}
                    fallbackIcon={FolderOpen}
                  />
                  <div className="flex flex-1 flex-col overflow-hidden">
                    <span className="truncate font-medium">
                      {project.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {project._count.posts}{" "}
                      {pluralize(project._count.posts, "post")}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
