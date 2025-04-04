import Header, {
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "../_components/header";
import { SummaryCardSkeleton } from "./_components/summary-card";
import { getDashboard } from "../_data-access/dashboard/get-dashboard";
import RevenueChart from "./_components/revenue-chart";
import MostSoldProductItem from "./_components/most_sold-product";
import TotalRevenueCard from "./_components/total-revenue-card";
import { Suspense } from "react";
import TodayRevenueCard from "./_components/today-revenue";
import TotalSalesCard from "./_components/total-sales-card";
import TotalInStockCard from "./_components/total-in-stock-card";
import TotalProducts from "./_components/total-products";
import Last14DaysRevenueCard from "./_components/last-14-days-revenue-card";
import { Skeleton } from "../_components/ui/skeleton";

const Home = async () => {
  const { totalLast14DaysRevenue, mostSoldProducts } = await getDashboard();
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
          <Suspense fallback={<SummaryCardSkeleton />}>
            <TotalRevenueCard />
          </Suspense>

          <Suspense fallback={<SummaryCardSkeleton />}>
            <TodayRevenueCard />
          </Suspense>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <Suspense fallback={<SummaryCardSkeleton />}>
            <TotalSalesCard />
          </Suspense>

          <Suspense fallback={<SummaryCardSkeleton />}>
            <TotalInStockCard />
          </Suspense>

          <Suspense fallback={<SummaryCardSkeleton />}>
            <TotalProducts />
          </Suspense>
        </div>
        <div className="grid min-h-0 grid-cols-[minmax(0,2.5fr),minmax(0,1fr)] gap-6">
          <Suspense
            fallback={
              <Skeleton className="bg-white">
                <div className="space-y-2 p-6">
                  <Skeleton className="h-5 w-[86.26px]" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </Skeleton>
            }
          >
            <Last14DaysRevenueCard />
          </Suspense>
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
