import type { NextPage } from 'next'
import { PageDefaultLayout } from "../components/layout";
import {Section, SectionTitle} from "../components/general";
import {Curriculum, SkillSet} from "../components/parts";
import {ProjectList} from "../components/parts/ProjectList/ProjectList";
import {useProjectList} from "../hooks/projects/useProjectList";
import {useMemo} from "react";
import {StylishBox} from "../components/general/StylishBox/StylishBox";

const SHORT_PROJECT_LIST_COUNT = 6;

const Home: NextPage = () => {
  const { projects: allProjects } = useProjectList();
  const projects = useMemo(() => {
    return allProjects.filter((_, i) => i < SHORT_PROJECT_LIST_COUNT);
  }, [allProjects]);

  return (
    <PageDefaultLayout>
      <Section>
        <SectionTitle>About me</SectionTitle>
        <p className={'mb-2'}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus delectus deleniti dignissimos, enim fugit hic in minima modi nesciunt nobis non quam quas, qui sint soluta tempora voluptatum! Perferendis, suscipit!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores aut consectetur quia suscipit. Aperiam at corporis culpa dolore, eius ex fugiat, neque officiis optio quam quos rem sapiente sunt.</p>
      </Section>

      <Section>
        <SectionTitle>Portfolio</SectionTitle>
        <StylishBox effects={[
          { top: -10, left: '33%', blur: true },
        ]}>
          <ProjectList projects={projects}/>
        </StylishBox>
      </Section>

      <Section>
        <SectionTitle>Curriculum</SectionTitle>
        <StylishBox effects={[
          { bottom: 50, left: -30 },
          { top: -50, right: -80 },
          { bottom: -80, right: -80 },
        ]}>
          <Curriculum />
        </StylishBox>
      </Section>

      <Section>
        <SectionTitle>Skill set</SectionTitle>
        <SkillSet />
      </Section>
    </PageDefaultLayout>
  )
}

export default Home
