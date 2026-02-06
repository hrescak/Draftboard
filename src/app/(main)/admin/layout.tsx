import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { AdminNav } from "./admin-nav";
import { StickyPageHeader } from "~/components/layout/sticky-page-header";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Only admins and owners can access admin pages
  if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "OWNER")) {
    redirect("/");
  }

  return (
    <div className="space-y-6">
      <StickyPageHeader>
        <h1 className="text-2xl font-bold mb-4">Site Administration</h1>
        <AdminNav />
      </StickyPageHeader>
      {children}
    </div>
  );
}
