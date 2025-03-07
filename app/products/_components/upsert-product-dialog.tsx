"use client";

import { useForm } from "react-hook-form";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../_components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import {
  upsertProductSchema,
  UpsertProductSchema,
} from "@/app/_actions/product/upsert-product/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { upsertProduct } from "@/app/_actions/product/upsert-product";
import { Input } from "@/app/_components/ui/input";
import { NumericFormat } from "react-number-format";
import { Button } from "@/app/_components/ui/button";
import { Loader2Icon } from "lucide-react";

interface UpsertProductDialogContentProps {
  defaultValues?: UpsertProductSchema;
  onSuccess?: () => void;
}

const UpserProductDialogContent = ({
  defaultValues,
  onSuccess,
}: UpsertProductDialogContentProps) => {
  const form = useForm<UpsertProductSchema>({
    shouldUnregister: true,
    resolver: zodResolver(upsertProductSchema),
    defaultValues: defaultValues ?? {
      name: "",
      price: 0.0,
      stock: 1,
    },
  });

  const isEditting = !!defaultValues;

  // Função de submit do form
  const onSubmit = async (data: UpsertProductSchema) => {
    try {
      await upsertProduct({ ...data, id: defaultValues?.id });
      onSuccess?.();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="font-semibold">
          {isEditting ? "Editar" : "Cadastrar"} Produto
        </DialogTitle>
        <DialogDescription>Insira as informações abaixo</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Produto</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do Produto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor unitário</FormLabel>
                <FormControl>
                  <NumericFormat
                    thousandSeparator="."
                    decimalSeparator=","
                    fixedDecimalScale
                    decimalScale={2}
                    prefix="R$ "
                    allowNegative={false}
                    customInput={Input}
                    onValueChange={(values) =>
                      field.onChange(values.floatValue)
                    }
                    {...field}
                    onChange={() => {}}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estoque</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Estoque" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="reset" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              variant={"primary"}
              disabled={form.formState.isSubmitting}
              type="submit"
              className="gap-1.5"
            >
              {form.formState.isSubmitting && (
                <Loader2Icon className="animate-spin" size={16} />
              )}
              Criar Produto
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpserProductDialogContent;
