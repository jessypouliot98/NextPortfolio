import { NextPrisma } from "@/lib/prisma-client";

export const createContext = () => {
  return {
    prisma: NextPrisma.getClient(),
  };
};

export type TRPCContext = ReturnType<typeof createContext>;