import { db } from "@/app/_lib/prisma";
import { NextRequest } from "next/server";

// Exporta rota API/products/{id} para obtenção de dados de um produto
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const productId = params.id;
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    return Response.json({ message: "Product not found" }, { status: 404 });
  }
  return Response.json(product, { status: 200 });
}

// Exporta rota API/products/{id} para deleção de dados de um produto
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const product = await db.product.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!product) {
    return Response.json({ message: "Product not found" }, { status: 404 });
  }
  await db.product.delete({
    where: {
      id: params.id,
    },
  });
  return Response.json({}, { status: 200 });
}

// Exporta rota API/products/{id}?teste=123 para obtenção de dados de um produto
export async function GET_WITH_SEARCH_PARAMS(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const searchParams = request.nextUrl.searchParams;
  const getTeste = searchParams.get("teste");
  console.log({ getTeste });
  const productId = params.id;
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    return Response.json({ message: "Product not found" }, { status: 404 });
  }
  return Response.json(product, { status: 200 });
}
