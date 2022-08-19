import React from "react";
import { IconBaseProps } from "react-icons";
import { GiEmptyChessboard } from "react-icons/gi";
import { SiCss3, SiHtml5, SiJavascript, SiLaravel, SiLinux, SiNextdotjs, SiNodedotjs, SiPhp, SiReact,SiTailwindcss,SiTypescript, SiVuedotjs } from "react-icons/si";

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