import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AppLanguage } from "types";

import { StylishCode } from "@/components/general";
import { PageDefaultLayout } from "@/components/layout";

export type BlogPostPageProps = {

}

const examples = {
  flexGrid: {
    css: `
.example-flex-grid .grid-container {
  display: flex;
  flex-wrap: wrap;
  margin: -10px;
}

.example-flex-grid .grid-item-wrapper {
  width: 50%;
  background-color: #FF0000;
  padding: 10px;
}

.example-flex-grid .grid-item {
  background-color: #FF7A7A;
}
`,
  html: `
<div class="example-flex-grid">
  <div class="grid-container">

    <div class="grid-item-wrapper">
      <div class="grid-item">Item 1</div>
    </div>

    <div class="grid-item-wrapper">
      <div class="grid-item">Item 2</div>
    </div>

    <div class="grid-item-wrapper">
      <div class="grid-item">Item 3</div>
    </div>

  </div>
</div>
  `
  },
};

const BlogPostPage: NextPage<BlogPostPageProps> = () => {
  return (
    <PageDefaultLayout>
      <h1 className="mb-4">Grid layout</h1>

      <section id="flex-grid">
        <h2>Flex Grid</h2>

        <h3>Css</h3>
        <StylishCode className="mb-4" language="css">
          {examples.flexGrid.css}
        </StylishCode>

        <h3>Html</h3>
        <StylishCode className="mb-4" language="xml">
          {examples.flexGrid.html}
        </StylishCode>

        <h3>Example result</h3>
        <div className="example p-5 border shadow-lg rounded-lg mb-4">
          <div dangerouslySetInnerHTML={{
            __html: `<style>${examples.flexGrid.css}</style>${examples.flexGrid.html}`
          }} />
        </div>

        <h3>End result</h3>
        <div className="example p-5 border shadow-lg rounded-lg mb-4">
          <div className="flex flex-wrap -m-2">
            <div className="p-1 w-[50%]">
              <div className="bg-white rounded shadow p-2">Item 1</div>
            </div>
            <div className="p-2 w-[50%]">
              <div className="bg-white rounded shadow p-2">Item 2</div>
            </div>
            <div className="p-2 w-[50%]">
              <div className="bg-white rounded shadow p-2">Item 3</div>
            </div>
          </div>
        </div>
      </section>
    </PageDefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps<BlogPostPageProps> = async (context) => {
  const lang = context.locale as AppLanguage;

  return {
    props: {
      ...(await serverSideTranslations(lang, ['common', 'global', 'page', 'router']) as any),
    },
  };
};

export default BlogPostPage;