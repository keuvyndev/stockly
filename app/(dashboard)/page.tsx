import {
  CircleDollarSignIcon,
  DollarSign,
  PackageIcon,
  ShoppingBasketIcon,
} from "lucide-react";
import Header, {
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "../_components/header";
import SummaryCard, {
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./_components/summary-card";
import { getDashboard } from "../_data-access/dashboard/get-dashboard";
import { formatCurrency } from "../_helpers/formatCurrency";
import RevenueChart from "./_components/revenue-chart";
import MostSoldProductItem from "./_components/most_sold-product";
import TotalRevenueCard from "./_components/total-revenue-card";
import { Suspense } from "react";
import { Skeleton } from "../_components/ui/skeleton";

const Home = async () => {
  const {
    todayRevenue,
    totalSales,
    totalStock,
    totalProducts,
    totalLast14DaysRevenue,
    mostSoldProducts,
  } = await getDashboard();
  return (
    <>
      <div className="m-8 flex w-full flex-col space-y-8 rounded-lg">
        <Header>
          <HeaderLeft>
            <HeaderSubtitle>Visão Geral</HeaderSubtitle>
            <HeaderTitle>DashBoard</HeaderTitle>
          </HeaderLeft>
        </Header>

        <div className="grid grid-cols-2 gap-6">
          <Suspense fallback={<Skeleton className="rounded-xl bg-black/5" />}>
            <TotalRevenueCard />
          </Suspense>

          <SummaryCard>
            <SummaryCardIcon>
              <DollarSign />
            </SummaryCardIcon>
            <SummaryCardTitle>Receita Hoje</SummaryCardTitle>
            <SummaryCardValue>{formatCurrency(todayRevenue)}</SummaryCardValue>
          </SummaryCard>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <SummaryCard>
            <SummaryCardIcon>
              <CircleDollarSignIcon />
            </SummaryCardIcon>
            <SummaryCardTitle>Vendas Totais</SummaryCardTitle>
            <SummaryCardValue>{totalSales}</SummaryCardValue>
          </SummaryCard>

          <SummaryCard>
            <SummaryCardIcon>
              <PackageIcon />
            </SummaryCardIcon>
            <SummaryCardTitle>Total em Estoque</SummaryCardTitle>
            <SummaryCardValue>{totalStock}</SummaryCardValue>
          </SummaryCard>

          <SummaryCard>
            <SummaryCardIcon>
              <ShoppingBasketIcon />
            </SummaryCardIcon>
            <SummaryCardTitle>Produtos</SummaryCardTitle>
            <SummaryCardValue>{totalProducts}</SummaryCardValue>
          </SummaryCard>
        </div>
        <div className="grid min-h-0 grid-cols-[minmax(0,2.5fr),minmax(0,1fr)] gap-6">
          <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
            <p className="text-lg font-semibold text-slate-900">
              Receita Total
            </p>
            <p className="text-sm text-slate-400">Últimos 14 dias</p>
            <RevenueChart data={totalLast14DaysRevenue} />
          </div>
          <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white">
            <p className="p-6 text-lg font-semibold text-slate-900">
              Produtos mais vendidos
            </p>

            <div className="space-y-7 overflow-y-auto px-6 pb-6">
              {mostSoldProducts.map((product) => (
                <MostSoldProductItem
                  key={product.productId}
                  product={product}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
