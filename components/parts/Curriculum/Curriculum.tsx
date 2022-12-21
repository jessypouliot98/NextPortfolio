import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import clsx from "clsx";
import { AnimatePresence, motion } from 'framer-motion';
import { ContentfulDisplay, Job } from "@/lib/contentful";

import { useLang } from "@/hooks/app";
import { ROUTES } from "@/utils/navigation/routes";

import Link from "@/components/general/Link/Link";
import { SkillIcon } from "@/components/parts/SkillIcon/SkillIcon";

import styles from './Curriculum.module.css';

import { DateRange } from "../DateRange/DateRange";

export type CurriculumProps = {
  jobs: Job[],
};

export const Curriculum: React.FC<CurriculumProps> = ({ jobs }) => {
  const lang = useLang();
  const { t } = useTranslation();
  const [activeJob, setActiveJob] = useState(jobs[0].slug);

  return (
    <AnimatePresence initial={true}>
      <motion.div
        initial={{ y: 100, opacity: 0, scale: 1.1 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="card card-default">
          <div className={'flex flex-col md:flex-row'}>
            <ul className={clsx(
              'py-5 min-w-[200px]',
              'bg-gray-200 dark:bg-gray-900',
            )}>
              {jobs.map((job) => {
                const isActive = job.slug === activeJob;

                return (
                  <li key={job.slug} className={clsx(isActive && '-mx-2')}>
                    <button className={clsx(
                      'transition w-full py-2 text-center md:text-right',
                      isActive ? 'bg-primary-interactive text-white' : 'text-blue-500 bg-transparent hover:bg-gray-100 dark:hover:bg-blue-900',
                      isActive ? 'md:pl-5 md:pr-7' : 'px-5',
                      isActive && 'rounded-r',
                    )} onClick={() => setActiveJob(job.slug)}>
                      {job.companyName}
                    </button>
                  </li>
                );
              })}
            </ul>
            <ul className={'flex-1 card-body'}>
              {jobs.map((job) => {
                const isActive = job.slug === activeJob;

                return (
                  <li
                    key={job.slug}
                    className={clsx(isActive ? 'block' : 'hidden')}
                  >
                    <div className={'mb-2'}>
                      <h3 className={clsx(
                        'text-2xl',
                        'text-gray-900 dark:text-gray-100',
                      )}>
                        <Trans
                          i18nKey={'page:curriculum.jobAtCompanyLinked'}
                          values={{
                            job: job.title,
                            companyName: job.companyName,
                          }}
                          components={{
                            Link: (
                              <Link
                                className={'font-bold link link-primary'}
                                href={job.companyLink}
                                target={'_blank'}
                              />
                            ),
                          }}
                        />
                      </h3>
                      <DateRange
                        startDate={job.startDate}
                        endDate={job.endDate}
                        className={'text-sm text-gray-600 dark:text-gray-400'}
                      />
                    </div>
                    <ul className={'flex mb-2'}>
                      {job.skills.map((skill) => (
                        <li key={skill.slug} className={'p-1'}>
                          <SkillIcon
                            className={'dark:!text-gray-100'}
                            title={skill.name}
                            skill={skill.slug}
                            color={skill.color}
                            size={'1.3em'}
                          />
                        </li>
                      ))}
                    </ul>
                    <ContentfulDisplay className={styles.richText} document={job.content} />
                    <div className={'flex flex-row-reverse'}>
                      <Link
                        className={'link link-primary'}
                        href={ROUTES['projects'].url(lang, {}, { filter: job.companySlug })}
                      >
                        {t('page:projects.seeAllCompanyProjects', {
                          companyName: job.companyName,
                        })}
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
