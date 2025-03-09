import "server-only";
import { db } from "@/app/_lib/prisma";
import { Product } from "@prisma/client";
import { unstable_cache } from "next/cache";

export interface ProductDto extends Product {
  status: "IN_STOCK" | "OUT_OF_STOCK";
}

export const getProducts = async (): Promise<ProductDto[]> => {
  const products = await db.product.findMany({});
  return products.map((product) => ({
    ...product,
    status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
  }));
};

export const cachedGetProducts = unstable_cache(getProducts, ["get-products"], {
  revalidate: 5,
});
