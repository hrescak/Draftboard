import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { MainNav } from "~/components/layout/main-nav";
import { TooltipProvider } from "~/components/ui/tooltip";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Auth middleware handles redirects for unauthenticated and deactivated users
  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen overflow-x-clip bg-background">
        <MainNav user={session.user} />
        <main className="sm:ml-16">
          <div className="mx-auto max-w-3xl px-4 pt-4 pb-[calc(5rem+env(safe-area-inset-bottom,0px))] sm:px-6 sm:pb-6">{children}</div>
        </main>
      </div>
    </TooltipProvider>
  );
}
