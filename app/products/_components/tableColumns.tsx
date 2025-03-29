"use client";

import { ColumnDef } from "@tanstack/react-table";
import ProductsTableDropdownMenu from "./table-dropdown-menu";
import { ProductDto } from "@/app/_data-access/product/getProducts";
import ProductStatusBadge from "@/app/_components/product-status-badge";

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
    cell: ({ row: { original: product } }) => {
      return <ProductStatusBadge status={product.status} />;
    },
  },
  {
    accessorKey: "action",
    header: "Ações",
    cell: (row) => <ProductsTableDropdownMenu product={row.row.original} />,
  },
];
