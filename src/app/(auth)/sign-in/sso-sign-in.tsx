"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Loader2 } from "lucide-react";
import { Logo } from "~/components/ui/logo";
import type { AuthMode } from "~/lib/auth-provider";

const providerConfig = {
  okta: {
    id: "okta",
    label: "Okta",
    icon: (
      <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.389 0 0 5.389 0 12s5.389 12 12 12 12-5.389 12-12S18.611 0 12 0zm0 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z" />
      </svg>
    ),
  },
  google: {
    id: "google",
    label: "Google",
    icon: (
      <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
    ),
  },
} as const;

function SSOSignInContent({ authMode }: { authMode: Exclude<AuthMode, "credentials"> }) {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const provider = providerConfig[authMode];

  // Handle error messages from redirects
  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam === "deactivated") {
      setError(
        "Your account has been deactivated. Please contact an administrator if you believe this is a mistake."
      );
    } else if (errorParam === "domain_not_allowed") {
      setError(
        "Your email domain is not allowed. Please sign in with your organization email."
      );
    } else if (errorParam === "OAuthAccountNotLinked") {
      setError(
        "This email is already associated with a different sign-in method."
      );
    } else if (errorParam && errorParam !== "Callback") {
      setError("Something went wrong. Please try again.");
    }
  }, [searchParams]);

  async function handleSignIn() {
    setIsLoading(true);
    setError("");
    try {
      await signIn(provider.id, { callbackUrl: "/" });
    } catch {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md border-border/50 shadow-2xl">
      <CardHeader className="space-y-1 pt-12 text-center">
        <Logo className="mx-auto mb-4" width={48} height={48} />
        <CardTitle className="text-2xl font-bold tracking-tight">
          Welcome to Draftboard
        </CardTitle>
        <CardDescription>
          Sign in with your {provider.label} account to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-8 pb-8">
        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}
        <Button
          onClick={handleSignIn}
          className="w-full"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            provider.icon
          )}
          Sign in with {provider.label}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          {authMode === "google"
            ? "Use your Google Workspace account to sign in. New accounts are created automatically."
            : "Use your organization's Okta account to sign in. New accounts are created automatically."}
        </p>
      </CardContent>
    </Card>
  );
}

export function SSOSignIn({ authMode }: { authMode: Exclude<AuthMode, "credentials"> }) {
  return (
    <Suspense
      fallback={
        <Card className="w-full max-w-md border-border/50 shadow-2xl">
          <CardContent className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin" />
          </CardContent>
        </Card>
      }
    >
      <SSOSignInContent authMode={authMode} />
    </Suspense>
  );
}
