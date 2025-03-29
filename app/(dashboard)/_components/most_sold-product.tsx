import ProductStatusBadge from "@/app/_components/product-status-badge";
import { MostSoldProductDto } from "@/app/_data-access/dashboard/get-dashboard";
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
