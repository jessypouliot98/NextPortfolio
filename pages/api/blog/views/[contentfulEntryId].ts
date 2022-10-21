import { NextApiRequest } from 'next';
import { NextApiResponse } from 'next';
import { NextPrisma } from '@/lib/prisma-client';

const blogViewApi = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      return incrementBlogView(req, res);
    default:
      res.status(404);
  }
};

const incrementBlogView = async (req: NextApiRequest, res: NextApiResponse) => {  
  const { contentfulEntryId } = req.query;

  const action = NextPrisma.getClient().blog.update({
    where: {
      contentfulEntryId: contentfulEntryId as string,
    },
    data: {
      views: { increment: 1 },
    }
  });

  await action
    .then(() => {
      return res.status(200).send('updated');
    })
    .catch(() => {
      return NextPrisma.getClient().blog.create({
        data: {
          contentfulEntryId: contentfulEntryId as string,
          views: 1,
        }
      });
    })
    .then(() => {
      return res.status(201).send('created');
    });
};

export default blogViewApi;