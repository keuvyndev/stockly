"use client";

import { Badge } from "@/app/_components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon } from "lucide-react";
import ProductsTableDropdownMenu from "./table-dropwdown-menu";
import { ProductDto } from "@/app/_data-access/product/getProducts";

const getStatusLabel = (status: string) => {
  if (status === "IN_STOCK") {
    return "Em estoque";
  }
  return "Esgotado";
};
export const productsTableColumns: ColumnDef<ProductDto>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Valor unitário",
    cell: (row) => {
      const product = row.row.original;
      return Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(product.price));
    },
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => {
      const product = row.row.original;
      const label = getStatusLabel(product.status);
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
    },
  },
  {
    accessorKey: "action",
    header: "Ações",
    cell: (row) => <ProductsTableDropdownMenu product={row.row.original} />,
  },
];
