"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn, getInitials } from "~/lib/utils";
import { api } from "~/lib/trpc/client";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

// Helper to extract R2 key from URL
function extractR2Key(url: string): string | null {
  const urlWithoutParams = url.split("?")[0];
  const match = urlWithoutParams?.match(/uploads\/[^\/]+\/[^\/]+$/);
  return match ? match[0] : null;
}

// Check if URL is already a signed URL
function isSignedUrl(url: string): boolean {
  return url.includes("X-Amz-") || url.includes("x-amz-");
}

interface UserAvatarProps {
  avatarUrl?: string | null;
  name: string;
  className?: string;
}

/**
 * UserAvatar - A complete avatar component that handles R2 signed URLs automatically
 * Use this component whenever displaying a user's avatar
 */
function UserAvatar({ avatarUrl, name, className }: UserAvatarProps) {
  const needsSigning = avatarUrl && !isSignedUrl(avatarUrl);
  const r2Key = needsSigning ? extractR2Key(avatarUrl) : null;

  const { data: signedUrlData } = api.upload.getDownloadUrl.useQuery(
    { key: r2Key! },
    {
      enabled: !!r2Key,
      staleTime: 30 * 60 * 1000, // Cache for 30 minutes
      refetchOnWindowFocus: false,
    }
  );

  // Determine the URL to display
  const displayUrl = React.useMemo(() => {
    if (!avatarUrl) return undefined;
    if (isSignedUrl(avatarUrl)) return avatarUrl;
    if (signedUrlData?.url) return signedUrlData.url;
    // If no R2 key found (external URL), use as-is
    if (!r2Key) return avatarUrl;
    return undefined;
  }, [avatarUrl, signedUrlData?.url, r2Key]);

  return (
    <Avatar className={className} key={displayUrl ?? "no-avatar"}>
      <AvatarImage src={displayUrl} alt={name} />
      <AvatarFallback>{getInitials(name)}</AvatarFallback>
    </Avatar>
  );
}

export { Avatar, AvatarImage, AvatarFallback, UserAvatar };
