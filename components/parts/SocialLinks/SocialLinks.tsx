import React from "react";
import clsx from "clsx";

export type SocialLinksProps = {};

const socials = [
  {
    title: 'GitHub',
    link: 'https://github.com/jessypouliot98',
    icon: '⨷',
  },
  {
    title: 'LinkedIn',
    link: 'https://www.linkedin.com/in/jessypouliot/',
    icon: '📤',
  },
  {
    title: 'Mail',
    link: 'mailto:jessypouliot98@gmail.com',
    icon: '✉️',
  }
];

export const SocialLinks: React.FC<SocialLinksProps> = () => {
  return (
    <div className={'lg:fixed bottom-0 right-0'}>
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
              <a
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
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
