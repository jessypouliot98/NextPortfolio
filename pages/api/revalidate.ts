import { NextApiRequest, NextApiResponse } from "next";
import { getBlogListPage, getProjectsPage } from "@/lib/contentful";

import { SUPPORTED_LANGUAGES } from "@/utils/constants";
import { ROUTES } from "@/utils/navigation/routes";

import { AppLanguage } from "@/types";

const getAllProjectSingleRoutesForLang = async (lang: AppLanguage) => {
  const page = await getProjectsPage({ lang });

  return page.projects.map((project) => ROUTES['projects.single'].url(lang, { slug: project.slug }));
};

const getAllBlogPostRoutesForLang = async (lang: AppLanguage) => {
  const page = await getBlogListPage({ lang });

  return page.blogPosts.map((blogPost) => ROUTES['blog.single'].url(lang, { slug: blogPost.slug }));
};

const getAllStaticRoutes = async () => {
  const languages: AppLanguage[] = SUPPORTED_LANGUAGES;
  const routes = languages.map(async (lang) => [
    ROUTES['home'].url(lang),
    ROUTES['projects'].url(lang),
    ROUTES['blog'].url(lang),
    ...(await getAllProjectSingleRoutesForLang(lang)),
    ...(await getAllBlogPostRoutesForLang(lang)),
  ]).flat();

  return (await Promise.all(routes)).flat();
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.headers.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid secret' });
  }

  try {
    const routesToRevalidate = await getAllStaticRoutes();
    for (const route of routesToRevalidate) {
      console.log(`Revalidating: ${route}`);
      await res.revalidate(route);
    }

    return res.json({
      revalidated: true,
      routes: routesToRevalidate,
    });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
};

export default handler;
