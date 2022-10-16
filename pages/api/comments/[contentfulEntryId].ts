import { NextApiRequest } from 'next';
import { NextApiResponse } from 'next';
import { NextPrisma } from '@/lib/prisma-client';

const commentApi = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return getComments(req, res);
    case 'POST':
      return createComment(req, res);
    default:
      res.status(404);
  }
};

const getComments = async (req: NextApiRequest, res: NextApiResponse) => {
  const { contentfulEntryId } = req.query;
  
  const comments = await NextPrisma.getClient().comment.findMany({
    where: {
      contentfulEntryId: contentfulEntryId as string,
      parentCommentId: null,
    },
    include: {
      childComments: {
        include: {
          childComments: {
            include: {
              childComments: {
                include: {
                  childComments: true
                }
              }
            }
          }
        }
      }
    }
  });

  res.json(comments);
};

const createComment = async (req: NextApiRequest, res: NextApiResponse) => {
  const { contentfulEntryId } = req.query;
  const { content, authorName } = JSON.parse(req.body);  
  
  await NextPrisma.getClient().comment.create({
    data: {
      contentfulEntryId: contentfulEntryId as string,
      authorName,
      content,
    }
  });
  
  res.status(201).end();
};

export default commentApi;