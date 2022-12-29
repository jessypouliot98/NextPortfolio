import React from "react";
import { NextPage } from "next";
import {
  ContentfulDisplay,
  getServicesPage,
  ServicesPage
} from "@/lib/contentful";

import { generateGetStaticProps } from "@/utils/nextjs/getStaticProps";

import { Section, SectionTitle } from "@/components/general";
import { CardCTA } from "@/components/general/CardCTA/CardCTA";
import { PageDefaultLayout } from "@/components/layout";
import { SkillIcon } from "@/components/parts/SkillIcon/SkillIcon";

export type ServicesPageProps = {
  page: ServicesPage;
};

const ServicesPage: NextPage<ServicesPageProps> = ({ page }) => {
  return (
    <PageDefaultLayout title={page.title} description={page.seoDescription}>
      <Section>
        <SectionTitle component="h2">
          {page.title}
        </SectionTitle>
        <CardCTA {...page.contactCTA} className="mb-16" />
        <ul>
          {page.services.map((service) => (
            <li key={service.title} className="mb-16">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 rounded-full bg-gray-200 p-4">
                  <SkillIcon skill="next-js" className="w-full h-full" />
                </div>
                <div className="h-0.5 w-8 mx-4 bg-gray-300"/>
                <h3 className="text-h3">{service.title}</h3>
              </div>

              <ContentfulDisplay className="pl-32" document={service.content} />
            </li>
          ))}
        </ul>
      </Section>
    </PageDefaultLayout>
  );
};

export const getStaticProps = generateGetStaticProps<ServicesPageProps>(async (context) => {
  const page = await getServicesPage({ lang: context.locale });

  return {
    props: { page },
  };
}, {
  i18nNamespaces: ['common', 'global', 'page', 'navigation'],
});

export default ServicesPage;