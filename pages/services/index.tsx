import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import {
  ContentfulDisplay, getContentfulImageAlt, getContentfulImageSrc,
  getServicesPage,
  ServicesPage
} from "@/lib/contentful";

import { useLang } from "@/hooks";
import { ROUTES } from "@/utils/navigation/routes";
import { generateGetStaticProps } from "@/utils/nextjs/getStaticProps";

import { Card, Section, SectionTitle, StylishBox } from "@/components/general";
import { CardCTA } from "@/components/general/CardCTA/CardCTA";
import { PageDefaultLayout } from "@/components/layout";

export type ServicesPageProps = {
  page: ServicesPage;
};

const ServicesPage: NextPage<ServicesPageProps> = ({ page }) => {
  const lang = useLang();
  
  return (
    <PageDefaultLayout title={page.title} description={page.seoDescription}>
      <Section className="pb-0">
        <SectionTitle component="h2">
          {page.title}
        </SectionTitle>
        <CardCTA {...page.contactCTA} className="mb-16" />
        <StylishBox className="mb-16" effects={[
          { left: -25 },
          { top: 200, right: -50 },
          { top: 450, left: '30%' },
          { bottom: -30, right: '15%', blur: true },
        ]}>
          {page.services.map((service) => (
            <Card key={service.title} className="flex mb-8 flex-col sm:flex-row py-4">
              <div className="mb-6 px-4 sm:pr-0">
                <div className="w-full aspect-video sm:w-32 sm:aspect-square rounded-lg bg-gray-200 p-2">
                  <img
                    src={getContentfulImageSrc(service.image)}
                    alt={getContentfulImageAlt((service.image))}
                    className="w-full h-full object-contain rounded"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="flex-1 px-4 sm:pl-0 sm:py-4">
                <div className="flex items-center mb-4">
                  <div className="hidden sm:block h-0.5 w-8 mx-4 bg-gray-300" />
                  <h3 className="text-h3">{service.title}</h3>
                </div>
                <ContentfulDisplay className="sm:pl-16" document={service.content} />
              </div>
            </Card>
          ))}
        </StylishBox>
        <div className="bg-gray-300 dark:bg-gray-900 px-8 py-12 flex flex-col flex-center breakout">
          <p className="text-center mb-8 text-gray-700 dark:text-gray-400 max-w-prose">
            {page.contactMeParagraph}
          </p>
          <Link className="btn btn-primary btn-lg" href={ROUTES['contact'].url(lang)}>
            {page.contactMeButton}
          </Link>
        </div>
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