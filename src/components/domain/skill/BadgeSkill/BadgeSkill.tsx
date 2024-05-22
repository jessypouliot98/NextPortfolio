export type BadgeSkill = {
  skill: BadgeSkill.Skill;
}

export function BadgeSkill({ skill }: BadgeSkill) {
  return (
    <div>
      {skill.name}
    </div>
  )
}

export namespace BadgeSkill {

  export type Skill = {
    name: string;
  }

}