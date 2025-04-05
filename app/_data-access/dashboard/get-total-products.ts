import "server-only";
import { db } from "@/app/_lib/prisma";

export const getTotalProducts = async (): Promise<number> => {
  // Para testes de Skeleton
  //await new Promise((resolve) => setTimeout(resolve, 5000));

  return await db.product.count();
};
