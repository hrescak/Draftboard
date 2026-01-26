import { notFound } from "next/navigation";
import { api } from "~/lib/trpc/server";
import { ProjectDetail } from "~/components/projects/ProjectDetail";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;

  const project = await api.project.getById({ id }).catch(() => null);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
