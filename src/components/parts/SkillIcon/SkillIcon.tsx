import React from "react";
import { IconBaseProps } from "react-icons";
import { GiEmptyChessboard } from "react-icons/gi";
import {
  SiCss3, SiDocker,
  SiElasticsearch,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiLinux,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp, SiPostgresql,
  SiPython,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
  SiWordpress,
} from "react-icons/si";

export type SkillIconProps = IconBaseProps & {
  skill: string,
}

const getIcon = (skill: string) => {
  switch (skill) {
    case 'typescript': return SiTypescript;
    case 'javascript': return SiJavascript;
    case 'react':
    case 'react-native': return SiReact;
    case 'vue-js': return SiVuedotjs;
    case 'next-js': return SiNextdotjs;
    case 'node-js': return SiNodedotjs;
    case 'html': return SiHtml5;
    case 'tailwindcss': return SiTailwindcss;
    case 'css': return SiCss3;
    case 'linux': return SiLinux;
    case 'laravel': return SiLaravel;
    case 'php': return SiPhp;
    case 'elastic-search': return SiElasticsearch;
    case 'docker': return SiDocker;
    case 'wordpress': return SiWordpress;
    case 'redux': return SiRedux;
    case 'python': return SiPython;
    case 'sql': return SiPostgresql;
    default: return GiEmptyChessboard;
  }
};

export const SkillIcon: React.FC<SkillIconProps> = ({ skill, ...iconProps }) => {
  const Icon = getIcon(skill);

  if (!Icon) {
    return null;
  }

  return React.createElement(Icon, iconProps);
};
