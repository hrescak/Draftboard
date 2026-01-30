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

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <MainNav user={session.user} />
        <main className="min-h-screen sm:ml-16">
          <div className="mx-auto max-w-3xl px-4 pt-4 pb-20 sm:px-6 sm:pb-6">{children}</div>
        </main>
      </div>
    </TooltipProvider>
  );
}
