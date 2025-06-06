import { db } from "@/app/_lib/prisma";
import "server-only";

export const getTotalInStock = async (): Promise<number> => {
  // Para testes de Skeleton
  //await new Promise((resolve) => setTimeout(resolve, 5000));

  const totalStock = await db.product.aggregate({
    _sum: {
      stock: true,
    },
  });
  return Number(totalStock._sum.stock);
};
