import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";

import {
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import DeleteProductDialogContent from "./delete-dialog-content";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import UpserProductDialogContent from "./upsert-product-dialog";
import { Button } from "@/app/_components/ui/button";
import { useState } from "react";
import { Product } from "@prisma/client";

interface ProductsTableDropdownMenuProps {
  product: Product;
}

const ProductsTableDropdownMenu = ({
  product,
}: ProductsTableDropdownMenuProps) => {
  const [editDialogOpen, setEditDialogIsOpen] = useState(false);

  return (
    <AlertDialog>
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogIsOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontalIcon size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-1.5"
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              <ClipboardCopyIcon size={16} /> Copiar ID
            </DropdownMenuItem>
            <DialogTrigger asChild>
              <DropdownMenuItem className="gap-1.5">
                <EditIcon size={16} />
                Editar
              </DropdownMenuItem>
            </DialogTrigger>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem>
                <TrashIcon size={16} /> Deletar
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <UpserProductDialogContent
          defaultValues={{
            id: product.id,
            name: product.name,
            price: Number(product.price),
            stock: product.stock,
          }}
          setDialogIsOpen={setEditDialogIsOpen}
        />
        <DeleteProductDialogContent productId={product.id} />
      </Dialog>
    </AlertDialog>
  );
};

export default ProductsTableDropdownMenu;
