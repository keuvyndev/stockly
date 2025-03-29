import { CircleIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { ProductStatusDto } from "../_data-access/product/getProducts";

const getStatusLabel = (status: string) => {
  if (status === "IN_STOCK") {
    return "Em estoque";
  }
  return "Esgotado";
};

interface ProductStatusBadgeProps {
  status: ProductStatusDto;
}

const ProductStatusBadge = ({ status }: ProductStatusBadgeProps) => {
  const label = getStatusLabel(status);
  return (
    <Badge
      variant="outline"
      className={`${label === "Em estoque" ? "gap-2 bg-[#EBFAF7] text-primary" : "gap-2"}`}
    >
      <CircleIcon
        size={12}
        className={`${label === "Em estoque" ? "fill-inherit fill-primary-foreground text-primary" : "fill-inherit fill-slate-500 text-slate-500"}`}
      />
      <span className={`${label !== "Em estoque" ? "text-slate-500" : ""}`}>
        {" "}
        {label}
      </span>
    </Badge>
  );
};

export default ProductStatusBadge;
