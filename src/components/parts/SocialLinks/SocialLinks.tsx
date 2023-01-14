import React from "react";
import { useTranslation } from "next-i18next";
import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

import { useLang } from "@/hooks";
import { ROUTES } from "@/utils/navigation/routes";

import Anchor from "@/components/general/Anchor/Anchor";

export type SocialLinksProps = {};

export const SocialLinks: React.FC<SocialLinksProps> = () => {
  const { t } = useTranslation();
  const lang = useLang();

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
      link: ROUTES['contact'].url(lang),
      icon: <FaEnvelope size={'1.5rem'} />,
    }
  ];

  return (
    <AnimatePresence initial={true}>
      <motion.div
        className="xl:fixed z-40 bottom-5 right-5"
        initial={{ opacity: 0, scale: 1.1, x: 100 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="mb-2 xl:m-0">
          <ul
            className={clsx(
              'flex',
              'flex-row xl:flex-col',
              'xl:shadow-lg xl:p-2 xl:rounded-lg',
              'xl:bg-white dark:xl:bg-gray-900'
            )}
          >
            {socials.map((social) => (
              <li key={social.title} className="p-1">
                <Anchor
                  className={clsx(
                    'w-11 h-11 rounded flex-center transition',
                    'btn btn-default',
                  )}
                  href={social.link}
                  target={'_blank'}
                  title={social.title}
                >
                  {social.icon}
                </Anchor>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
