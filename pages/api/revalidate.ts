import { NextApiRequest, NextApiResponse } from "next";
import { getProjectsPage } from "@/lib/contentful";

import { Routes } from "@/utils/link";

import { AppLanguage } from "../../types";

const getAllProjectSingleRoutesForLang = async (lang: AppLanguage) => {
  const page = await getProjectsPage({ lang });

  return page.projects.map((project) => Routes.getProjectSingle(lang, project.slug).localizedHref);
};

const getAllStaticRoutes = async () => {
  const languages: AppLanguage[] = ['en', 'fr'];
  const routes = languages.map(async (lang) => [
    Routes.getHome(lang).localizedHref,
    Routes.getProjectList(lang).localizedHref,
    ...(await getAllProjectSingleRoutesForLang(lang))
  ]).flat();

  return (await Promise.all(routes)).flat();
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.headers);
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
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
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
};

export default handler;
