import { z } from "zod";
import { procedure, router } from "@/lib/trpc/server/trpc";

export const blogViewRouter = router({
  list: procedure.query(async ({ ctx }) => {
    return ctx.prisma.blog.findMany({
      select: {
        contentfulEntryId: true,
        views: true
      },
    });
  }),

  get: procedure.input(z.object({ contentfulEntryId: z.string() })).query(async ({ ctx, input }) => {
    const { contentfulEntryId } = input;

    const blog = await ctx.prisma.blog.findFirstOrThrow({
      where: { contentfulEntryId },
      select: { views: true },
    });

    return blog.views;
  }),

  increment: procedure.input(z.object({ contentfulEntryId: z.string() })).mutation(async ({ ctx, input }) => {
    const { contentfulEntryId } = input;

    await ctx.prisma.blog.upsert({
      where: { contentfulEntryId },
      create: {
        contentfulEntryId,
        views: 1,
      },
      update: {
        views: { increment: 1 },
      }
    });
  }),
});