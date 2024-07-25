import { SkillSpinner } from "@/components/domain/skill/SkillSpinner/SkillSpinner";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-blue-900">
      <SkillSpinner
        rings={3}
        classNames={{
          "ring-nth-odd": "border-4 border-dashed border-orange-500/30",
          "ring-nth-even": "border-4 border-orange-500/30",
        }}
        spinDurations={{
          "nth-1": "10s",
          "nth-2": "10s",
          "nth-3": "10s",
        }}
        sizes={{
          ringCircle: {
            "nth-1": "36rem",
            "nth-2": "24rem",
            "nth-3": "10rem",
          },
          ringBubble: {
            default: "4rem",
            "nth-1": "6rem",
          },
        }}
        skills={[
          {
            name: "TypeScript",
            slug: "typescript",
            image: {
              url: "https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg",
              alt: "ts",
            }
          },
          {
            name: "Javascript",
            slug: "javascript",
            image: {
              url: "https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg",
              alt: "javascript",
            }
          },
          {
            name: "Tailwind CSS",
            slug: "tailwindcss",
            image: {
              url: "https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg",
              alt: "tailwindcss",
            }
          },
          {
            name: "React",
            slug: "reactjs",
            image: {
              url: "https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg",
              alt: "react",
            }
          },
          {
            name: "React Native",
            slug: "react-native",
            image: {
              url: "https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg",
              alt: "react-native",
            }
          }
        ]}
      />
    </main>
  );
}
