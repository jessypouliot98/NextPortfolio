import React from "react";
import { NextPage } from "next";
import {
  getServicesPage,
  ServicesPage
} from "@/lib/contentful";

import { generateGetStaticProps } from "@/utils/nextjs/getStaticProps";

import { Section, SectionTitle } from "@/components/general";
import { CardCTA } from "@/components/general/CardCTA/CardCTA";
import { PageDefaultLayout } from "@/components/layout";

export type ServicesPageProps = {
  page: ServicesPage;
};

const ServicesPage: NextPage<ServicesPageProps> = ({ page }) => {
  console.log(page.contactCTA);
  return (
    <PageDefaultLayout title={page.title} description={page.seoDescription}>
      <Section>
        <SectionTitle component="h2">
          {page.title}
        </SectionTitle>
        <CardCTA {...page.contactCTA} />
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