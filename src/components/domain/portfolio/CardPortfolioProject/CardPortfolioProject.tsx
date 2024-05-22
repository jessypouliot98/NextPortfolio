import { BadgeSkill } from "@/components/domain/skill/BadgeSkill/BadgeSkill";
import Image from "next/image";

export type CardPortfolioProjectProps = {
  project: CardPortfolioProject.Project;
}

export function CardPortfolioProject({ project }: CardPortfolioProjectProps) {
  return (
    <a
      className={`
        flex rounded gap-2 shadow bg-white
        transition-transform transform hover:scale-105
      `}
      href={`#${project.name}`}
    >
      <div className="rounded w-24 aspect-square bg-red-500 overflow-hidden">
        <Image
          className="w-full h-full object-fill"
          src="https://images.unsplash.com/photo-1716203034902-003b9e7e1946?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          width={96}
          height={96}
        />
      </div>
      <div className="space-y-2">
        <h3>{project.name}</h3>
        <ul className="flex flex-row gap-1">
          {project.skills.map((skill) => (
            <li key={skill.name}>
              <BadgeSkill skill={skill}/>
            </li>
          ))}
        </ul>
      </div>
    </a>
  )
}

export namespace CardPortfolioProject {

  export type Skill = {
    name: string;
  }

  export type Project = {
    name: string;
    skills: Skill[];
  }

}