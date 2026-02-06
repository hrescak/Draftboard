"use client";

import * as React from "react";
import { cn } from "~/lib/utils";

interface SearchThumbnailProps {
  url: string | null;
  fallbackIcon: React.ElementType;
  /** Size variant: "sm" (32px) for the command dialog, "md" (40px) for the search page */
  size?: "sm" | "md";
}

const sizeConfig = {
  sm: {
    container: "h-8 w-8 rounded",
    icon: "h-4 w-4",
  },
  md: {
    container: "h-10 w-10 rounded-lg",
    icon: "h-5 w-5",
  },
} as const;

export function SearchThumbnail({
  url,
  fallbackIcon: FallbackIcon,
  size = "md",
}: SearchThumbnailProps) {
  const [hasError, setHasError] = React.useState(false);

  // Reset error state when url changes
  React.useEffect(() => {
    setHasError(false);
  }, [url]);

  const config = sizeConfig[size];

  if (!url || hasError) {
    return (
      <div
        className={cn(
          "flex shrink-0 items-center justify-center bg-muted",
          config.container,
        )}
      >
        <FallbackIcon className={cn("text-muted-foreground", config.icon)} />
      </div>
    );
  }

  return (
    <div
      className={cn("shrink-0 overflow-hidden bg-muted", config.container)}
    >
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
