import { db } from "@/app/_lib/prisma";
import "server-only";
import { ProductStatusDto } from "../product/getProducts";

export interface MostSoldProductDto {
  productId: string;
  name: string;
  totalSold: number;
  status: ProductStatusDto;
  price: number;
}

export const getMostSoldProducts = async (): Promise<MostSoldProductDto[]> => {
   // Para testes de Skeleton
  //await new Promise((resolve) => setTimeout(resolve, 5000));
  
  // Retorna os 10 produtos mais vendidos
  const mostSoldProductQuery = `
  SELECT "Product"."name", SUM("SaleProduct"."quantity") as "totalSold", "Product"."price", "Product"."stock", "Product"."id" as "productId"
  FROM "SaleProduct"
  JOIN "Product" ON "SaleProduct"."productId" = "Product"."id"
  GROUP BY "Product"."name", "Product"."price", "Product"."stock", "Product"."id"
  ORDER BY "totalSold" DESC
  LIMIT 5
  `;
  const mostSoldProducts = await db.$queryRawUnsafe<
    {
      productId: string;
      name: string;
      totalSold: number;
      stock: number;
      price: number;
    }[]
  >(mostSoldProductQuery);

  return mostSoldProducts.map((product) => ({
    ...product,
    totalSold: Number(product.totalSold),
    price: Number(product.price),
    status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
  }));
};
