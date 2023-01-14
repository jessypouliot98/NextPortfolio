import { z } from "zod";
import { blogViewRouter } from "@/lib/trpc/server/routers/blog/views/router";
import { procedure, router } from "@/lib/trpc/server/trpc";

export const blogRouter = router({
  views: blogViewRouter,
  
  list: procedure.query(async ({ ctx }) => {
    return ctx.prisma.blog.findMany();
  }),

  get: procedure.input(z.object({ contentfulEntryId: z.string() })).query(async ({ ctx, input }) => {
    const { contentfulEntryId } = input;

    return ctx.prisma.blog.findFirst({
      where: { contentfulEntryId },
      include: {
        comments: {
          where: { deletedAt: null },
        }
      }
    });
  }),
});