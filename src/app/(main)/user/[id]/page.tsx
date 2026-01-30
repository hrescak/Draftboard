import { notFound } from "next/navigation";
import { api } from "~/lib/trpc/server";
import { UserProfile } from "~/components/user/UserProfile";

interface UserPageProps {
  params: Promise<{ id: string }>;
}

export default async function UserPage({ params }: UserPageProps) {
  const { id } = await params;

  const user = await api.user.getById({ id }).catch(() => null);

  if (!user) {
    notFound();
  }

  return <UserProfile user={user} />;
}
