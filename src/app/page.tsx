import { SkillSpinner } from "@/components/domain/skill/SkillSpinner/SkillSpinner";
import { getHeroSkillCircle } from "@/modules/cms/queries";

export default async function Home() {
  const entryHeroSkillCircle = await getHeroSkillCircle();
  return (
    <main className="min-h-screen bg-gray-900">
      <div className="w-full flex justify-center items-center h-screen max-h-screen overflow-x-hidden">
        <SkillSpinner className="size-[80vh]">
          {entryHeroSkillCircle.fields.rings.map((ring) => {
            const conf = ring.fields.configuration;

            let sizeRing: string;
            if (typeof conf?.size?.ring === "string") {
              sizeRing = conf.size.ring;
            } else if (typeof conf?.size.ring === "number") {
              sizeRing = `${conf.size.ring}px`;
            } else {
              sizeRing = "500px";
            }

            let sizeBubble: string;
            if (typeof conf?.size?.bubble === "string") {
              sizeBubble = conf.size?.bubble;
            } else if (typeof conf?.size.bubble === "number") {
              sizeBubble = `${conf.size.bubble}px`;
            } else {
              sizeBubble = "4rem";
            }

            let spinDuration: string;
            if (typeof conf?.spinDuration === "string") {
              spinDuration = conf.spinDuration;
            } else if (typeof conf?.spinDuration === "number") {
              spinDuration = `${conf.spinDuration}ms`;
            } else {
              spinDuration = "30s";
            }

            return (
              <SkillSpinner.Ring
                key={ring.fields.title}
                classNames={{
                  ring: "border-2 border-dashed border-orange-500/50"
                }}
                size={{
                  ring: sizeRing,
                  bubble: sizeBubble,
                }}
                spinDuration={spinDuration}
                skills={ring.fields.skills}
              />
            )
          })}
        </SkillSpinner>
      </div>
    </main>
  );
}
