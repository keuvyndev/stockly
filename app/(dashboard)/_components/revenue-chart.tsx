"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { DayTotalRevenueDto } from "@/app/_data-access/dashboard/get-last-14-days-revenue";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  totalRevenue: {
    label: "Receita",
  },
} satisfies ChartConfig;

interface RevenueChartProps {
  data: DayTotalRevenueDto[];
}

const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <ChartContainer config={chartConfig} className="min-h-0 w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar
          dataKey="totalRevenue"
          radius={[10, 10, 10, 10]}
          barSize={50}
          fill="#00A180"
        />
      </BarChart>
    </ChartContainer>
  );
};

export default RevenueChart;
