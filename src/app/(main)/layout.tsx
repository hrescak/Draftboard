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
        <main className="ml-16 min-h-screen">
          <div className="mx-auto max-w-5xl px-6 pt-4 pb-6">{children}</div>
        </main>
      </div>
    </TooltipProvider>
  );
}
