import { SkillSpinner } from "@/components/domain/skill/SkillSpinner/SkillSpinner";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SkillSpinner
        rings={3}
        classNames={{
          "ring-nth-odd": "border-4 border-dashed border-blue-500",
          "ring-nth-even": "border-4 border-blue-500",
        }}
        spinDurations={{
          "nth-1": "80s",
          "nth-2": "70s",
          "nth-3": "60s",
        }}
        sizes={{
          ringCircle: {
            "nth-1": "36rem",
            "nth-2": "24rem",
            "nth-3": "12rem",
          },
          ringBubble: {
            default: "6rem",
          },
        }}
        skills={[
          {
            name: "TypeScript",
            slug: "typescript",
            image: {
              url: "",
              alt: "ts",
            }
          },
          {
            name: "Javascript",
            slug: "javascript",
            image: {
              url: "",
              alt: "javascript",
            }
          },
          {
            name: "Tailwind CSS",
            slug: "tailwindcss",
            image: {
              url: "",
              alt: "tailwindcss",
            }
          },
          {
            name: "React",
            slug: "reactjs",
            image: {
              url: "",
              alt: "react",
            }
          },
          {
            name: "React Native",
            slug: "react-native",
            image: {
              url: "",
              alt: "react-native",
            }
          }
        ]}
      />
    </main>
  );
}
