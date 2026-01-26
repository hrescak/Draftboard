"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import { Home, FolderKanban, Bell, PenSquare, Settings } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { getInitials } from "~/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/notifications", label: "Notifications", icon: Bell },
];

interface MainNavProps {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
}

export function MainNav({ user }: MainNavProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-16 flex-col bg-background">
      {/* Logo at top - aligned with content header */}
      <div className="flex items-start justify-center pt-4">
        <Link href="/" className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary transition-transform hover:scale-105">
          <span className="text-lg font-bold text-primary-foreground">D</span>
        </Link>
      </div>

      {/* Centered navigation items */}
      <nav className="flex flex-1 flex-col items-center justify-center gap-1">
        {navItems.map((item) => {
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

        {/* Compose button */}
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Link
              href="/compose"
              className="mt-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <PenSquare className="h-6 w-6" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">New Post</TooltipContent>
        </Tooltip>
      </nav>

      {/* Profile at bottom */}
      <div className="flex flex-col items-center gap-1 pb-4">
        <DropdownMenu>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <button className="flex h-12 w-12 items-center justify-center rounded-xl transition-colors hover:bg-secondary/50">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image ?? undefined} alt={user.name} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
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
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => signOut({ callbackUrl: "/sign-in" })}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
