"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { api } from "~/lib/trpc/client";

interface FeedbackPlayerSession {
  id: string;
  videoUrl: string | null;
  durationMs: number | null;
}

interface FeedbackPlayerProps {
  session: FeedbackPlayerSession;
  seekToMs?: number | null;
  onTimeUpdate: (timeMs: number) => void;
  onWatchChunk: (deltaMs: number) => void;
}

function extractR2Key(url: string): string | null {
  const urlWithoutParams = url.split("?")[0];
  const match = urlWithoutParams?.match(/uploads\/[^\/]+\/[^\/]+$/);
  return match ? match[0] : null;
}

function isSignedUrl(url: string): boolean {
  return url.includes("X-Amz-") || url.includes("x-amz-");
}

export function FeedbackPlayer({
  session,
  seekToMs,
  onTimeUpdate,
  onWatchChunk,
}: FeedbackPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const watchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pendingWatchMsRef = useRef(0);
  const lastTickTsRef = useRef<number | null>(null);
  const isPlayingRef = useRef(false);
  const playbackRetryCountRef = useRef(0);
  const [playbackError, setPlaybackError] = useState<string | null>(null);
  const [resolvedVideoUrl, setResolvedVideoUrl] = useState<string | null>(null);

  const r2Key = useMemo(() => {
    if (!session.videoUrl || isSignedUrl(session.videoUrl)) {
      return null;
    }
    return extractR2Key(session.videoUrl);
  }, [session.videoUrl]);

  const { data: signedUrlData, isLoading, refetch } = api.upload.getDownloadUrl.useQuery(
    { key: r2Key! },
    {
      enabled: !!r2Key,
      staleTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );

  const flushPendingWatchTime = useCallback(() => {
    const pendingMs = Math.floor(pendingWatchMsRef.current);
    if (pendingMs > 0) {
      onWatchChunk(pendingMs);
      pendingWatchMsRef.current = 0;
    }
  }, [onWatchChunk]);

  const stopWatchTimer = useCallback(
    (flush = false) => {
      if (watchTimerRef.current) {
        clearInterval(watchTimerRef.current);
        watchTimerRef.current = null;
      }

      if (isPlayingRef.current && lastTickTsRef.current !== null) {
        pendingWatchMsRef.current += Date.now() - lastTickTsRef.current;
      }

      isPlayingRef.current = false;
      lastTickTsRef.current = null;

      if (flush) {
        flushPendingWatchTime();
      }
    },
    [flushPendingWatchTime]
  );

  const startWatchTimer = useCallback(() => {
    stopWatchTimer(false);
    isPlayingRef.current = true;
    lastTickTsRef.current = Date.now();

    watchTimerRef.current = setInterval(() => {
      if (!isPlayingRef.current || lastTickTsRef.current === null) {
        return;
      }

      const now = Date.now();
      pendingWatchMsRef.current += now - lastTickTsRef.current;
      lastTickTsRef.current = now;

      while (pendingWatchMsRef.current >= 5000) {
        onWatchChunk(5000);
        pendingWatchMsRef.current -= 5000;
      }
    }, 1000);
  }, [onWatchChunk, stopWatchTimer]);

  useEffect(() => {
    return () => {
      stopWatchTimer(true);
    };
  }, [stopWatchTimer]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        stopWatchTimer(true);
        return;
      }

      const video = videoRef.current;
      if (video && !video.paused && !video.ended) {
        startWatchTimer();
      }
    };

    const handlePageHide = () => {
      stopWatchTimer(true);
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("beforeunload", handlePageHide);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("beforeunload", handlePageHide);
    };
  }, [startWatchTimer, stopWatchTimer]);

  useEffect(() => {
    if (!videoRef.current || seekToMs === null || seekToMs === undefined) {
      return;
    }

    videoRef.current.currentTime = seekToMs / 1000;
  }, [seekToMs]);

  useEffect(() => {
    stopWatchTimer(true);
    pendingWatchMsRef.current = 0;
    playbackRetryCountRef.current = 0;
    setPlaybackError(null);
    setResolvedVideoUrl(null);
  }, [session.id, stopWatchTimer]);

  useEffect(() => {
    if (signedUrlData?.url && !resolvedVideoUrl) {
      setResolvedVideoUrl(signedUrlData.url);
      setPlaybackError(null);
    }
  }, [resolvedVideoUrl, signedUrlData?.url]);

  useEffect(() => {
    if (!r2Key || isSignedUrl(session.videoUrl ?? "")) {
      setResolvedVideoUrl(session.videoUrl);
    }
  }, [r2Key, session.videoUrl]);

  if (!session.videoUrl) {
    return (
      <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
        This session has no video recording.
      </p>
    );
  }

  if (isLoading && r2Key && !resolvedVideoUrl) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border bg-muted/20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const displayUrl = resolvedVideoUrl || signedUrlData?.url || session.videoUrl;

  return (
    <div className="space-y-2">
      <video
        ref={videoRef}
        key={session.id}
        src={displayUrl}
        controls
        playsInline
        preload="metadata"
        className="w-full rounded-lg border bg-black"
        onTimeUpdate={(event) => {
          onTimeUpdate(event.currentTarget.currentTime * 1000);
        }}
        onPlay={() => {
          startWatchTimer();
        }}
        onPause={() => {
          stopWatchTimer(true);
        }}
        onEnded={() => {
          stopWatchTimer(true);
        }}
        onError={() => {
          stopWatchTimer(true);

          if (r2Key && playbackRetryCountRef.current < 1) {
            playbackRetryCountRef.current += 1;
            void refetch();
            return;
          }

          setPlaybackError("Unable to play this recording.");
        }}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <track kind="captions" />
      </video>

      {playbackError && (
        <p className="text-xs text-destructive">{playbackError}</p>
      )}
    </div>
  );
}
