import React from "react";
import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa";
import clsx from "clsx";

import Link from "@/components/general/Link/Link";

export type SocialLinksProps = {};

const socials = [
  {
    title: 'GitHub',
    link: 'https://github.com/jessypouliot98',
    icon: <FaGithub size={'1.5rem'} />,
  },
  {
    title: 'LinkedIn',
    link: 'https://www.linkedin.com/in/jessypouliot/',
    icon: <FaLinkedinIn size={'1.5rem'} />,
  },
  {
    title: 'Mail',
    link: 'mailto:jessypouliot98@gmail.com',
    icon: <FaEnvelope size={'1.5rem'} />,
  }
];

export const SocialLinks: React.FC<SocialLinksProps> = () => {
  return (
    <div className={'lg:fixed z-50 bottom-0 right-0'}>
      <div className={'mb-2 lg:mb-0 lg:p-5'}>
        <ul
          className={clsx(
            'flex',
            'flex-row lg:flex-col',
            'lg:shadow-lg lg:p-2 lg:rounded-lg',
            'lg:bg-white dark:lg:bg-gray-900'
          )}
        >
          {socials.map((social) => (
            <li key={social.title} className={'p-1'}>
              <Link
                className={clsx(
                  'w-11 h-11 rounded flex-center transition',
                  'bg-transparent',
                  'hover:bg-gray-100 lg:hover:bg-gray-100',
                  'dark:hover:bg-gray-700 dark:lg:hover:bg-gray-800',
                )}
                href={social.link}
                target={'_blank'}
                title={social.title}
              >
                {social.icon}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
