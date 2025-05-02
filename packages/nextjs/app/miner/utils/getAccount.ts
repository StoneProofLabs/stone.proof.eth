import { prisma } from "~~/server/db";

export const getAccount = async (userId: string) => {
  const account = await prisma.account.findFirst({
    where: { userId },
    select: { address: true },
  });
  
  if (!account) {
    throw new Error("No connected wallet found");
  }
  
  return account;
};