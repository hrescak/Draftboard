"use client";

import { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { api } from "~/lib/trpc/client";
import { cn } from "~/lib/utils";

interface FeedbackAudioPlayerProps {
  url?: string | null;
  mimeType?: string | null;
  className?: string;
}

function extractR2Key(url: string): string | null {
  const urlWithoutParams = url.split("?")[0];
  const match = urlWithoutParams?.match(/uploads\/[^\/]+\/[^\/]+$/);
  return match ? match[0] : null;
}

function isSignedUrl(url: string): boolean {
  return url.includes("X-Amz-") || url.includes("x-amz-");
}

export function FeedbackAudioPlayer({
  url,
  mimeType,
  className,
}: FeedbackAudioPlayerProps) {
  const [playbackError, setPlaybackError] = useState<string | null>(null);

  const r2Key = useMemo(() => {
    if (!url || isSignedUrl(url)) {
      return null;
    }
    return extractR2Key(url);
  }, [url]);

  const { data: signedUrlData, isLoading } = api.upload.getDownloadUrl.useQuery(
    { key: r2Key! },
    {
      enabled: !!r2Key,
      staleTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );

  if (!url) {
    return null;
  }

  if (isLoading && r2Key) {
    return (
      <div className={cn("flex h-9 items-center justify-center", className)}>
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const displayUrl = signedUrlData?.url || url;

  return (
    <div className="space-y-1">
      <audio
        controls
        className={cn("w-full", className)}
        onError={() => {
          setPlaybackError("Unable to play this audio note.");
        }}
      >
        <source src={displayUrl} type={mimeType || "audio/webm"} />
      </audio>
      {playbackError && <p className="text-xs text-destructive">{playbackError}</p>}
    </div>
  );
}
