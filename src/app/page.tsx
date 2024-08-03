import { Hero } from "@/components/part/Hero/Hero";
import { Projects } from "@/components/part/Projects/Projects";
import { getProjects } from "@/modules/cms/queries";
import { serialize } from "@/modules/cms/utils/serialize";

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen">
      <Hero/>
      <Projects projects={serialize(projects)} />
    </main>
  );
}
