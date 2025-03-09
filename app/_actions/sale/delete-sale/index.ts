"use server";

import { actionClient } from "@/app/_lib/safe-action";
import { deleteProductSchema } from "../../product/delete-product/schema";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteSale = actionClient
  .schema(deleteProductSchema)
  .action(async ({ parsedInput: { id } }) => {
    await db.sale.delete({
      where: {
        id,
      },
    });
    revalidatePath("/sales");
  });
