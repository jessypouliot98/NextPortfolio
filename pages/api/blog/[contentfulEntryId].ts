import { NextApiRequest } from 'next';
import { NextApiResponse } from 'next';
import { NextPrisma } from '@/lib/prisma-client';

const blogApi = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return getBlog(req, res);
    default:
      res.status(404);
  }
};

const getBlog = async (req: NextApiRequest, res: NextApiResponse) => {
  const { contentfulEntryId } = req.query;
  
  const blog = await NextPrisma.getClient().blog.findFirst({
    where: {
      contentfulEntryId: contentfulEntryId as string,
    },
  });

  res.json(blog);
};

export default blogApi;