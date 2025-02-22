import { db } from "@/app/_lib/prisma";

/*
   * Criar rotas HTTP, só faz sentido quando:
      1. Quando está trabalhando com algum Webhook (Exemplo: Integrando com Stripe, que precisa chamar uma rota da sua aplicação após o pagamento ser realizado com sucesso ou com falha)
      2. Quando você tem outra aplicação (Exemplo: Exportar dados da sua aplicação para um app mobile)
*/

// Consulta os produtos no banco de dados
export async function GET() {
  const products = await db.product.findMany({});
  return Response.json(products, {
    status: 200,
  });
}

// Cria um produto no banco de dados
export async function POST(request: Request) {
  // TO DO: Implementar o zod para validar a requisição
  const body = await request.json();
  const name = body.name;
  const price = body.price;
  const stock = body.stock;
  await db.product.create({
    data: {
      name,
      price,
      stock,
    },
  });
  return Response.json({}, { status: 201 });
}
