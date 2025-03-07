"use client";

import { Dialog, DialogTrigger } from "../../_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import { PlusIcon } from "lucide-react";

import { useState } from "react";
import UpserProductDialog from "./upsert-product-dialog";

const CreateProductButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
        <DialogTrigger asChild>
          <Button variant="primary">
            <PlusIcon size={20} />
            Novo Produto
          </Button>
        </DialogTrigger>
        <UpserProductDialog onSuccess={() => setDialogIsOpen(false)} />
      </Dialog>
    </>
  );
};

export default CreateProductButton;
