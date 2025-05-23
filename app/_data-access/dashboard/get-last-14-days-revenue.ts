import { db } from "@/app/_lib/prisma";
import dayjs from "dayjs";
import "server-only";

export interface DayTotalRevenueDto {
  day: string;
  totalRevenue: number;
}

export const getLast14DaysRevenue = async (): Promise<DayTotalRevenueDto[]> => {
  // Para testes de Skeleton
  //await new Promise((resolve) => setTimeout(resolve, 5000));

  // Captura o dia atual
  const today = dayjs().endOf("day").toDate();

  // Cria um array com os últimos 14 dias
  const last14Days = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(
    (day) => {
      return dayjs(today).subtract(day, "day");
    },
  );

  const totalLast14DaysRevenue: DayTotalRevenueDto[] = [];

  for (const day of last14Days) {
    const dayTotalRevenue = await db.$queryRawUnsafe<
      { totalRevenue: number }[]
    >(
      `SELECT SUM("unitPrice" * "quantity") as "totalRevenue"
      FROM "SaleProduct"
      JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
      WHERE "Sale"."date" >= $1 AND "Sale"."date" <= $2;`,
      day.startOf("day").toDate(),
      day.endOf("day").toDate(),
    );
    totalLast14DaysRevenue.push({
      day: day.format("DD/MM"),
      totalRevenue: dayTotalRevenue[0].totalRevenue,
    });
  }

  return totalLast14DaysRevenue;
};
