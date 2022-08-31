import React from "react";
import { useTranslation } from "next-i18next";
import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

import Link from "@/components/general/Link/Link";

export type SocialLinksProps = {};

export const SocialLinks: React.FC<SocialLinksProps> = () => {
  const { t } = useTranslation();

  const socials = [
    {
      title: t('global:footer.github'),
      link: 'https://github.com/jessypouliot98',
      icon: <FaGithub size={'1.5rem'} />,
    },
    {
      title: t('global:footer.linkedin'),
      link: 'https://www.linkedin.com/in/jessypouliot/',
      icon: <FaLinkedinIn size={'1.5rem'} />,
    },
    {
      title: t('global:footer.email'),
      link: 'mailto:jessypouliot98@gmail.com',
      icon: <FaEnvelope size={'1.5rem'} />,
    }
  ];

  return (
    <AnimatePresence initial={true}>
      <motion.div
        className={'lg:fixed z-50 bottom-0 right-0'}
        initial={{ opacity: 0, scale: 1.1, x: 100 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
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
                    'btn btn-default',
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
      </motion.div>
    </AnimatePresence>
  );
};
