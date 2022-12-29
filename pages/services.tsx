import React from "react";
import { NextPage } from "next";
import {
  ContentfulDisplay, getContentfulImageAlt, getContentfulImageSrc,
  getServicesPage,
  ServicesPage
} from "@/lib/contentful";

import { generateGetStaticProps } from "@/utils/nextjs/getStaticProps";

import { Card, Section, SectionTitle, StylishBox } from "@/components/general";
import { CardCTA } from "@/components/general/CardCTA/CardCTA";
import { PageDefaultLayout } from "@/components/layout";

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
        <StylishBox effects={[
          { left: -25 },
          { top: 200, right: -50 },
          { top: 450, left: '30%' },
          { bottom: -30, right: '15%', blur: true },
        ]}>
          {page.services.map((service) => (
            <Card key={service.title} className="flex mb-8">
              <div className="p-4 pr-0">
                <div className="w-32 h-32 rounded-lg bg-gray-200 p-1">
                  <img
                    src={getContentfulImageSrc(service.image)}
                    alt={getContentfulImageAlt((service.image))}
                    className="w-full h-full object-contain rounded"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="flex-1 py-8 pr-4">
                <div className="flex items-center mb-4">
                  <div className="h-0.5 w-8 mx-4 bg-gray-300" />
                  <h3 className="text-h3">{service.title}</h3>
                </div>
                <ContentfulDisplay className="pl-16" document={service.content} />
              </div>
            </Card>
          ))}
        </StylishBox>
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