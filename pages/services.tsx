import { NextPage } from "next";

import { generateGetStaticProps } from "@/utils/nextjs/getStaticProps";

import { PageDefaultLayout } from "@/components/layout";

export type ServicesPageProps = {};

const ServicesPage: NextPage<ServicesPageProps> = () => {
  return (
    <PageDefaultLayout>
      <h1>sada</h1>
    </PageDefaultLayout>
  );
};

export const getStaticProps = generateGetStaticProps<ServicesPageProps>(async () => {
  return { props: { } };
}, {
  i18nNamespaces: ['common', 'global', 'page', 'navigation'],
});

export default ServicesPage;