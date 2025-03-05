import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "O nome do produto do produto é obrigatório.",
    })
    .trim(),
  price: z.number().min(0.01, {
    message: "O preço do produto é obrigatório.",
  }),
  stock: z.coerce
    .number()
    .positive({
      message: "A quantidade em estoque deve ser positiva.",
    })
    .min(0, {
      message: "A quantidade em estoque é obrigatória",
    }),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;
