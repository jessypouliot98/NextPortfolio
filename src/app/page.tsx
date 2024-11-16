import { Hero } from "@/components/part/Hero/Hero";
import { Projects } from "@/components/part/Projects/Projects";
import { getProjects } from "@/modules/cms/queries";
import { serialize } from "@/modules/cms/utils/serialize";
import { TextGradient } from "@/components/common/TextGradient/TextGradient";

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen space-y-8 max-w-[100vw] overflow-hidden">
      <Hero id="home"/>
      <Projects id="portfolio" projects={serialize(projects)} />
      <div className="[--wiggle-angle:1deg] animate-wiggle max-w-screen-xl px-8 mx-auto min-h-96 grid place-items-center">
        <TextGradient className="-rotate-12 bg-gradient-to-r from-blue-500 to-cyan-500 text-4xl text-center py-8 font-bold">
          Website still in development...
        </TextGradient>
      </div>
    </main>
  );
}
