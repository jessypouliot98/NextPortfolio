import { NextApiRequest } from 'next';
import { NextApiResponse } from 'next';
import { NextPrisma } from '@/lib/prisma-client';

const blogListViewsApi = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
    case 'POST':
      return getBlogListViews(req, res);
    default:
      res.status(404);
  }
};

const getBlogListViews = async (req: NextApiRequest, res: NextApiResponse) => {  
  const blogList = await NextPrisma.getClient().blog.findMany({
    select: {
      contentfulEntryId: true,
      views: true,
    }
  });

  res.json(blogList);
};

export default blogListViewsApi;