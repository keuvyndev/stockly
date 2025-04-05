import "server-only";

import { db } from "@/app/_lib/prisma";

export const getTotalSales = async (): Promise<number> => {
  // Para testes de Skeleton
  //await new Promise((resolve) => setTimeout(resolve, 5000));

  return db.sale.count();
};
