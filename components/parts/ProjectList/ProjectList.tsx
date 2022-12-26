import React from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { Project } from "@/lib/contentful";

import { FlexGrid } from "@/components/general";
import { ProjectCard } from "@/components/parts/ProjectList/ProjectCard";

export type ProjectListProps = {
  projects: Project[],
};

export const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <AnimatePresence initial={true}>
      <FlexGrid columns={{ default: 1, sm: 2, lg: 3 }}>
        {projects.map((project, i, { length }) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i / length }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </FlexGrid>
    </AnimatePresence>
  );
};
