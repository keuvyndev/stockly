"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { upsertProductSchema, UpsertProductSchema } from "./schema";

export const upsertProduct = async (data: UpsertProductSchema) => {
  upsertProductSchema.parse(data);
  await db.product.upsert({
    where: { id: data?.id ?? "" },
    update: data,
    create: data,
  });
  // Faz aguardar 3 segundos para teste
  //await new Promise((resolve) => setTimeout(resolve, 3000));

  // Revalida a rota após a criação
  revalidatePath("/products");
};
