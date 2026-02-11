"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { UserAvatar } from "~/components/ui/avatar";
import { api } from "~/lib/trpc/client";
import { Loader2, Copy, Check, MoreHorizontal, KeyRound, Shield, ShieldOff, UserX, UserCheck } from "lucide-react";

interface ResetLinkData {
  url: string;
  userName: string;
  expiresAt: Date;
}

export default function AdminUsersPage() {
  const { data, isLoading } = api.user.list.useQuery({ limit: 50 });
  const { data: authModeData } = api.user.authMode.useQuery();
  const utils = api.useUtils();
  const [resetLinkData, setResetLinkData] = useState<ResetLinkData | null>(null);
  const [copied, setCopied] = useState(false);

  const isCredentialsAuth = authModeData?.mode === "credentials";

  const updateRoleMutation = api.user.updateRole.useMutation({
    onSuccess: () => {
      utils.user.list.invalidate();
    },
  });

  const setDeactivatedMutation = api.user.setDeactivated.useMutation({
    onSuccess: () => {
      utils.user.list.invalidate();
    },
  });

  const generateResetTokenMutation = api.user.generatePasswordResetToken.useMutation({
    onSuccess: (data) => {
      const baseUrl = window.location.origin;
      const resetUrl = `${baseUrl}/reset-password/${data.token}`;
      setResetLinkData({
        url: resetUrl,
        userName: data.user.displayName,
        expiresAt: data.expiresAt,
      });
    },
  });

  const handleCopyLink = async () => {
    if (resetLinkData) {
      await navigator.clipboard.writeText(resetLinkData.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCloseDialog = () => {
    setResetLinkData(null);
    setCopied(false);
  };

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
    <>
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            Manage user roles and permissions. Users can be promoted to Admin to
            give them access to these settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {data?.users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between py-4"
              >
                <div className="flex items-center gap-3">
                  <UserAvatar avatarUrl={user.avatarUrl} name={user.displayName} />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{user.displayName}</p>
                      {user.deactivated && <DeactivatedBadge />}
                    </div>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <RoleBadge role={user.role} />
                  {user.role !== "OWNER" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {!user.deactivated && (
                          <>
                            {isCredentialsAuth && (
                              <DropdownMenuItem
                                onClick={() =>
                                  generateResetTokenMutation.mutate({ userId: user.id })
                                }
                                disabled={generateResetTokenMutation.isPending}
                              >
                                <KeyRound className="h-4 w-4" />
                                Reset Password
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() =>
                                updateRoleMutation.mutate({
                                  userId: user.id,
                                  role: user.role === "ADMIN" ? "MEMBER" : "ADMIN",
                                })
                              }
                              disabled={updateRoleMutation.isPending}
                            >
                              {user.role === "ADMIN" ? (
                                <>
                                  <ShieldOff className="h-4 w-4" />
                                  Remove Admin
                                </>
                              ) : (
                                <>
                                  <Shield className="h-4 w-4" />
                                  Make Admin
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                          </>
                        )}
                        <DropdownMenuItem
                          onClick={() =>
                            setDeactivatedMutation.mutate({
                              userId: user.id,
                              deactivated: !user.deactivated,
                            })
                          }
                          disabled={setDeactivatedMutation.isPending}
                          className={user.deactivated ? "" : "text-destructive focus:bg-destructive focus:text-destructive-foreground"}
                        >
                          {user.deactivated ? (
                            <>
                              <UserCheck className="h-4 w-4" />
                              Reactivate
                            </>
                          ) : (
                            <>
                              <UserX className="h-4 w-4" />
                              Deactivate
                            </>
                          )}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={resetLinkData !== null} onOpenChange={(open) => !open && handleCloseDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Password Reset Link Generated</DialogTitle>
            <DialogDescription>
              Share this one-time link with {resetLinkData?.userName} to reset their password.
              This link will expire in 24 hours.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={resetLinkData?.url ?? ""}
                readOnly
                className="font-mono text-sm"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyLink}
                className="shrink-0"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              This link can only be used once. After the password is reset, the link becomes invalid.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function RoleBadge({ role }: { role: string }) {
  const styles = {
    OWNER: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    ADMIN: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    MEMBER: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[role as keyof typeof styles] || styles.MEMBER}`}
    >
      {role}
    </span>
  );
}

function DeactivatedBadge() {
  return (
    <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-400">
      Deactivated
    </span>
  );
}
