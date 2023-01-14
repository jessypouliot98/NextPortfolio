import type { CreateNextContextOptions } from "@trpc/server/src/adapters/next";
import { NextPrisma } from "@/lib/prisma-client";

import { getLanguageFromRequest } from "@/utils/request/getLanguageFromRequest";

export const createContext = (opts: CreateNextContextOptions) => {
  return {
    lang: getLanguageFromRequest(opts.req),
    prisma: NextPrisma.getClient(),
  };
};

export type TRPCContext = ReturnType<typeof createContext>;