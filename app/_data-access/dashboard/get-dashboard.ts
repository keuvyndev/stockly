import { db } from "@/app/_lib/prisma";

interface DashboardDto {
  totalRevenue: number;
  todayRevenue: number;
  totalSales: number;
  totalStock: number;
  totalProducts: number;
}

export const getDashboard = async (): Promise<DashboardDto> => {
  // Retorna o somátorio do valor de todas as vendas.
  const totalRevenuePromise = db.saleProduct.aggregate({
    _sum: {
      unitPrice: true,
    },
  });

  // Retorna o somátorio do valor de todas as vendas que sejam de hoje, e estejam entre 00h e 23h59.
  const todayRevenuePromise = db.saleProduct.aggregate({
    _sum: {
      unitPrice: true,
    },
    where: {
      createdAt: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
        lte: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    },
  });

  // Retorna a quantidade total de vendas realizadas.
  const totalSalesPromise = db.sale.count();

  // Retorna a quantidade total de produtos em estoque
  const totalStockPromise = db.product.aggregate({
    _sum: {
      stock: true,
    },
  });

  // Retorna a quantidade total de produtos
  const totalProductsPromise = db.product.count();

  const [totalRevenue, todayRevenue, totalSales, totalStock, totalProducts] =
    await Promise.all([
      totalRevenuePromise,
      todayRevenuePromise,
      totalSalesPromise,
      totalStockPromise,
      totalProductsPromise,
    ]);

  return {
    totalRevenue: Number(totalRevenue._sum.unitPrice),
    todayRevenue: Number(totalRevenue._sum.unitPrice),
    totalSales,
    totalStock: Number(totalStock._sum.stock),
    totalProducts,
  };
};
