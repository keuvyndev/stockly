import "server-only";

import { db } from "@/app/_lib/prisma";

export const getTotalRevenue = async (): Promise<number> => {
  // Para testes de Skeleton
  //await new Promise((resolve) => setTimeout(resolve, 5000));

  // Retorna o somátorio do valor de todas as vendas.
  const totalRevenueQuery = `
   SELECT SUM("SaleProduct"."unitPrice" * "SaleProduct"."quantity") as "totalRevenue"
   FROM "SaleProduct"
   JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id";
 `;
  const totalRevenue =
    await db.$queryRawUnsafe<{ totalRevenue: number }[]>(totalRevenueQuery);
  return totalRevenue[0].totalRevenue;
};
