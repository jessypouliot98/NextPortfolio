import React from "react";
import { NextPage } from "next";

import { useLang } from "@/hooks";
import { ROUTES } from "@/utils/navigation/routes";
import { generateGetStaticProps } from "@/utils/nextjs/getStaticProps";

import { Section, SectionTitle } from "@/components/general";
import Link from "@/components/general/Link/Link";
import { PageDefaultLayout } from "@/components/layout";

export type ServicesPageProps = {};

const ServicesPage: NextPage<ServicesPageProps> = () => {
  const lang = useLang();
  
  return (
    <PageDefaultLayout>
      <Section>
        <SectionTitle component="h2">
          Services
        </SectionTitle>
        <div className="card card-primary flex">
          <div className="flex-1 hidden md:block">
            <img className="object-cover w-full h-full" alt="contact" src="https://images.unsplash.com/photo-1664575600796-ffa828c5cb6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"/>
          </div>
          <div className="card-body flex-1 flex flex-col justify-center">
            <h1 className="font-h1 mb-4">
              {"I'm here to help"}
            </h1>
            <p className="font-p mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus commodi consectetur dignissimos eos labore quia quidem rerum tempora voluptatem. Aliquam asperiores beatae ea eveniet fugit laborum odit, optio quam reprehenderit!</p>
            <div>
              <Link className="btn btn-white btn-lg" href={ROUTES['contact'].url(lang)}>
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </PageDefaultLayout>
  );
};

export const getStaticProps = generateGetStaticProps<ServicesPageProps>(async () => {
  return { props: { } };
}, {
  i18nNamespaces: ['common', 'global', 'page', 'navigation'],
});

export default ServicesPage;