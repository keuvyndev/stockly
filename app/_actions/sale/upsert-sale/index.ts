/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { db } from "@/app/_lib/prisma";
import { upsertSaleSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/app/_lib/safe-action";
import { returnValidationErrors } from "next-safe-action";

export const upsertSale = actionClient
  .schema(upsertSaleSchema)
  .action(async ({ parsedInput: { products, id } }) => {
    const isUpdate = Boolean(id);
    await db.$transaction(async (trx) => {
      // Se tiver uma 'id' é uma atualização
      if (isUpdate) {
        const existingSale = await trx.sale.findUnique({
          where: { id },
          include: { saleProducts: true },
        });
        if (!existingSale) return;
        await trx.sale.delete({
          where: {
            id,
          },
        });
        // Restaura o stock de produtos da venda
        for (const product of existingSale?.saleProducts) {
          await trx.product.update({
            where: { id: product.productId },
            data: {
              stock: {
                increment: product.quantity,
              },
            },
          });
        }
      }

      // Cria uma nova venda
      const sale = await trx.sale.create({
        data: {
          date: new Date(),
        },
      });
      for (const product of products) {
        // Consulta o produto no back-end
        const productFromDb = await trx.product.findUnique({
          where: {
            id: product.id,
          },
        });

        // Valida se o produto existe
        if (!productFromDb) {
          returnValidationErrors(upsertSaleSchema, {
            _errors: ["Product not found"],
          });
        }

        // Valida se a quantidade informada existe em estoque
        const productIsOutOfStock = product.quantity > productFromDb.stock;
        if (productIsOutOfStock) {
          returnValidationErrors(upsertSaleSchema, {
            _errors: ["Product out of stock"],
          });
        }
        await trx.saleProduct.create({
          data: {
            saleId: sale.id,
            productId: product.id,
            quantity: product.quantity,

            // Obtem o preço do back-end
            unitPrice: productFromDb.price,
          },
        });

        // Atualiza a quantidade em estoque no banco de dados
        await trx.product.update({
          where: {
            id: product.id,
          },
          data: {
            stock: {
              decrement: product.quantity,
            },
          },
        });
      }
    });
    revalidatePath("/", "layout");
  });
