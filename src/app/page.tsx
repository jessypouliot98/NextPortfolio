import { Hero } from "@/components/part/Hero/Hero";
import { Projects } from "@/components/part/Projects/Projects";

export default async function Home() {

  return (
    <main className="min-h-screen">
      <Hero/>
      <Projects/>
    </main>
  );
}
