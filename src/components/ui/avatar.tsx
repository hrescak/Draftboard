"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn, getInitials } from "~/lib/utils";
import { api } from "~/lib/trpc/client";
import { extractStorageKey, needsUrlSigning } from "~/lib/storage-url";

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
    className={cn("aspect-square h-full w-full object-cover", className)}
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

interface UserAvatarProps {
  avatarUrl?: string | null;
  name: string;
  className?: string;
}

/**
 * UserAvatar - A complete avatar component that handles storage signed URLs automatically.
 * For R2, URLs are signed on-the-fly. For Vercel Blob, URLs are public and used as-is.
 */
function UserAvatar({ avatarUrl, name, className }: UserAvatarProps) {
  const requiresSigning = avatarUrl ? needsUrlSigning(avatarUrl) : false;
  const storageKey = avatarUrl && requiresSigning ? extractStorageKey(avatarUrl) : null;

  const { data: signedUrlData } = api.upload.getDownloadUrl.useQuery(
    { key: storageKey! },
    {
      enabled: !!storageKey,
      staleTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );

  const displayUrl = React.useMemo(() => {
    if (!avatarUrl) return undefined;
    if (!requiresSigning) return avatarUrl;
    if (signedUrlData?.url) return signedUrlData.url;
    if (!storageKey) return avatarUrl;
    return undefined;
  }, [avatarUrl, requiresSigning, signedUrlData?.url, storageKey]);

  return (
    <Avatar className={className} key={displayUrl ?? "no-avatar"}>
      <AvatarImage src={displayUrl} alt={name} />
      <AvatarFallback>{getInitials(name)}</AvatarFallback>
    </Avatar>
  );
}

export { Avatar, AvatarImage, AvatarFallback, UserAvatar };
