import { z } from 'zod';

import { procedure, router } from '../trpc';

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const count = await ctx.prisma.comment.count();
      return {
        count,
        greeting: `hello ${input.text}`,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;