import React, {useState} from "react";
import clsx from "clsx";

import {useRootSelector} from "@/store/store";

import {getMonthYear} from "@/utils/date";

import {Card} from "@/components/general";
import Link from "@/components/general/Link/Link";
import {ContentfulDisplay} from "@/lib/contentful/components/ContentfulDisplay";

import styles from './Curriculum.module.css';

export type CurricuclumProps = { };

export const Curriculum: React.FC<CurricuclumProps> = () => {
  const { jobs } = useRootSelector((state) => state.curriculumState);
  const [activeJob, setActiveJob] = useState(jobs[0].slug);

  return (
    <Card>
      <div className={'flex flex-col md:flex-row'}>
        <ul className={clsx(
          '-m-5 mb-5 md:-mb-5 md:mr-5 py-5 min-w-[200px]',
          'bg-gray-200 dark:bg-gray-900',
        )}>
          {jobs.map((job) => {
            const isActive = job.slug === activeJob;

            return (
              <li key={job.slug} className={clsx(isActive && '-mx-2')}>
                <button className={clsx(
                  'w-full py-2 text-center md:text-right',
                  isActive ? 'text-white bg-blue-500' : 'text-blue-500 bg-transparent hover:bg-gray-100 dark:hover:bg-blue-900',
                  isActive ? 'pl-5 pr-7' : 'px-5',
                  isActive && 'rounded-r',
                )} onClick={() => setActiveJob(job.slug)}>
                  {job.companyName}
                </button>
              </li>
            )
          })}
        </ul>
        <ul className={'flex-1'}>
          {jobs.map((job) => {
            const isActive = job.slug === activeJob;

            return (
              <li key={job.slug} className={clsx(isActive ? 'block' : 'hidden')}>
                <div className={'mb-2'}>
                  <h3 className={clsx(
                    'text-2xl',
                    'text-gray-900 dark:text-gray-100',
                  )}>
                    <span>{job.title}</span>
                    <span>{' at '}</span>
                    <Link className={'font-bold text-blue-500 hover:text-blue-400'} href={job.companyLink} target={'_blank'}>{job.companyName}</Link>
                  </h3>
                  {job.startDate && (
                    <h6 className={clsx(
                      'text-sm',
                      'text-gray-600 dark:text-gray-400',
                    )}>
                      <span>{getMonthYear(new Date(job.startDate))}</span>
                      <span>{' - '}</span>
                      {job.endDate ? (
                        <span>{getMonthYear(new Date(job.endDate))}</span>
                      ) : (
                        <span>{'Present'}</span>
                      )}
                    </h6>
                  )}
                </div>
                <ContentfulDisplay className={styles.richText} document={job.content} />
                <div className={'flex flex-row-reverse'}>
                  <Link className={'text-blue-500 hover:text-blue-400'} href={`/projects?filter=${job.companySlug}`}>
                    {`See all ${job.companyName} projects`}
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Card>
  )
}
