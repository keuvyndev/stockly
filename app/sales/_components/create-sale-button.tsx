"use client";

import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { PlusIcon } from "lucide-react";
import UpsertSheetContent from "./upsert-sheet-content";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { useState } from "react";
import { ProductDto } from "@/app/_data-access/product/getProducts";

interface UpsertSaleButtonProps {
  products: ProductDto[];
  productOptions: ComboboxOption[];
}

const UpsertSaleButton = (props: UpsertSaleButtonProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false);

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button variant={"primary"} className="gap-2">
          <PlusIcon size={20} />
          Adicionar Venda
        </Button>
      </SheetTrigger>
      <UpsertSheetContent
        isOpen={sheetIsOpen}
        setSheetIsOpen={setSheetIsOpen}
        {...props}
      />
    </Sheet>
  );
};

export default UpsertSaleButton;
