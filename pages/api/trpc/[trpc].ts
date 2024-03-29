import * as trpcNext from '@trpc/server/adapters/next';
import { createContext } from "@/lib/trpc/context/createContext";
import { appRouter } from "@/lib/trpc/server/routers/_app";

// export API handler
// @see https://trpc.io/docs/api-handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});