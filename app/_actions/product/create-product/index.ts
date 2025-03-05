"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { createProductSchema, CreateProductSchema } from "./schema";

export const createProduct = async (data: CreateProductSchema) => {
  createProductSchema.parse(data);
  await db.product.create({
    data,
  });

  // Faz aguardar 3 segundos para teste
  //await new Promise((resolve) => setTimeout(resolve, 3000));

  // Revalida a rota após a criação
  revalidatePath("/products");
};
