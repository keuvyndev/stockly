import ProductStatusBadge from "@/app/_components/product-status-badge";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { MostSoldProductDto } from "@/app/_data-access/dashboard/get-most-sold-products";
import { formatCurrency } from "@/app/_helpers/formatCurrency";

interface MostSoldProductProps {
  product: MostSoldProductDto;
}

const MostSoldProductItem = ({ product }: MostSoldProductProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-[6px]">
        <ProductStatusBadge status={product.status} />
        <p className="font-semibold">{product.name}</p>
        <p className="font-medium text-slate-500">
          {formatCurrency(Number(product.price))}
        </p>
      </div>
      <div className="text-sm font-semibold">
        {product.totalSold} vendido(s)
      </div>
    </div>
  );
};

export default MostSoldProductItem;

export const MostSoldProductItemSkeleton = () => {
  return (
    <Skeleton className="bg-white p-6">
      <div className="space-y-2">
        <Skeleton className="h-5 w-[86.26px]" />
        <Skeleton className="h-4 w-48" />
      </div>

      <div className="flex items-center justify-between pt-5">
        <div className="space-y-2">
          <Skeleton className="h-[22px] w-[91.23px]" />
          <Skeleton className="h-6 w-[91.23px]" />
          <Skeleton className="h-6 w-[105.23px]" />
        </div>
        <div>
          <Skeleton className="h-5 w-[86.26px]" />
        </div>
      </div>
    </Skeleton>
  );
};
