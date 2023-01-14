import { blogRouter } from "@/lib/trpc/server/routers/blog/router";
import { commentRouter } from "@/lib/trpc/server/routers/comments/router";
import { router } from "@/lib/trpc/server/trpc";


export const appRouter = router({
  comments: commentRouter,
  blog: blogRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;