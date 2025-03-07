"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  CircleIcon,
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import DeleteProductDialogContent from "./delete-dialog-content";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import UpserProductDialogContent from "./upsert-product-dialog";
import { useState } from "react";
import ProductsTableDropdownMenu from "./table-dropwdown-menu";

const getStatusLabel = (status: string) => {
  if (status === "IN_STOCK") {
    return "Em estoque";
  }
  return "Esgotado";
};
export const productsTableColumns: ColumnDef<Product>[] = [
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
    cell: (row) => <ProductsTableDropdownMenu product={row.row.original} />
  },
];
