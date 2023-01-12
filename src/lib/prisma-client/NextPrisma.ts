import { PrismaClient } from '@prisma/client';

export namespace NextPrisma {
  const state = {
    client: null as PrismaClient | null,
  };
  
  export const connect = () => {
    state.client = new PrismaClient();
  };
  
  export const disconnect = async () => {
    if (!state.client) {
      return;
    }

    await state.client.$disconnect();
  
    state.client = null;
  };
  
  export const getClient = () => {
    if (!state.client) {
      NextPrisma.connect();
    }
  
    return state.client!;
  };
}
