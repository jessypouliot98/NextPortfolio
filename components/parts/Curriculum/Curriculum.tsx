import React, {useState} from "react";
import clsx from "clsx";
import {Card} from "../../general";
import {useRootSelector} from "../../../store/store";
import Link from "../../general/Link/Link";

export type CurricuclumProps = { };

export const Curriculum: React.FC<CurricuclumProps> = () => {
  const { jobs } = useRootSelector((state) => state.curriculumState);
  const [activeJobId, setActiveJobId] = useState(jobs[0].id);

  return (
    <Card>
      <div className={'flex flex-col md:flex-row'}>
        <ul className={clsx(
          '-m-5 mb-5 md:-mb-5 md:mr-5 py-5 min-w-[200px]',
          'bg-gray-200 dark:bg-gray-900',
        )}>
          {jobs.map((job) => {
            const isActive = job.id === activeJobId;

            return (
              <li key={job.id} className={clsx(isActive && '-mx-2')}>
                <button className={clsx(
                  'w-full py-2 text-center md:text-right',
                  isActive ? 'text-white bg-blue-500' : 'text-blue-500 bg-transparent hover:bg-gray-100 dark:hover:bg-blue-900',
                  isActive ? 'pl-5 pr-7' : 'px-5',
                  isActive && 'rounded-r',
                )} onClick={() => setActiveJobId(job.id)}>
                  {job.companyName}
                </button>
              </li>
            )
          })}
        </ul>
        <ul className={'flex-1'}>
          {jobs.map((job) => {
            const isActive = job.id === activeJobId;
            const hasDate = !!(job.fromDate && job.toDate);

            return (
              <li key={job.id} className={clsx(isActive ? 'block' : 'hidden')}>
                <div className={'mb-2'}>
                  <h3 className={clsx(
                    'text-2xl',
                    'text-gray-900 dark:text-gray-100',
                  )}>
                    <span>{job.jobTitle}</span>
                    <span>{' at '}</span>
                    <a href={job.companyLink} target={'_blank'} className={'font-bold text-blue-500 hover:text-blue-400'}>{job.companyName}</a>
                  </h3>
                  {hasDate && (
                    <h6 className={clsx(
                      'text-sm',
                      'text-gray-600 dark:text-gray-400',
                    )}>
                      {[job.fromDate, job.toDate].join(' - ')}
                    </h6>
                  )}
                </div>
                <ul className={'pl-3 list-outside list-custom'}>
                  <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A architecto consectetur consequatur cum
                    eaque enim error explicabo ipsam ipsum laboriosam, laborum necessitatibus obcaecati provident
                    quaerat quam quos recusandae, rem totam.
                  </li>
                  <li>Adipisci atque consequuntur corporis delectus deserunt dignissimos dolorem eaque earum enim fugiat
                    harum itaque, maxime molestiae nobis nulla odit, porro possimus quibusdam quidem rem repellat sed
                    sequi tenetur voluptates voluptatum.
                  </li>
                  <li>Architecto eveniet in porro. Aliquam animi commodi culpa dolor dolores exercitationem harum id
                    inventore iste magni modi nam odio praesentium quibusdam quisquam recusandae, sed sunt tempora
                    tempore tenetur veniam veritatis?
                  </li>
                  <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio libero neque perferendis
                    praesentium suscipit voluptate voluptatibus. Architecto asperiores enim odio, praesentium quos
                    sapiente ut voluptate! Architecto ea eos modi ut.
                  </li>
                  <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias ducimus et facere sapiente
                    veritatis? Architecto autem, deserunt dicta esse ex excepturi expedita fugiat incidunt iste labore
                    molestiae unde ut veniam.
                  </li>
                </ul>
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
