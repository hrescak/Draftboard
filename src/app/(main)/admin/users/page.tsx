"use client";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { UserAvatar } from "~/components/ui/avatar";
import { api } from "~/lib/trpc/client";
import { Loader2 } from "lucide-react";

export default function AdminUsersPage() {
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
                  <p className="font-medium">{user.displayName}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <RoleBadge role={user.role} />
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
