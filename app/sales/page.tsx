import { getProducts } from "../_data-access/product/getProducts";
import { ComboboxOption } from "../_components/ui/combobox";
import UpsertSaleButton from "./_components/create-sale-button";
import { getSales } from "../_data-access/sale/get-sales";
import { DataTable } from "../_components/ui/data-table";
import { saleTableColumns } from "./_components/table-columns";
import Header, {
  HeaderLeft,
  HeaderRight,
  HeaderSubtitle,
  HeaderTitle,
} from "../_components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "STOCKLY - Sales",
};

const SalesPage = async () => {
  const sales = await getSales();
  const products = await getProducts();
  const productOptions: ComboboxOption[] = products.map((product) => ({
    label: product.name,
    value: product.id,
  }));
  const tableData = sales.map((sale) => ({
    ...sale,
    products,
    productOptions,
  }));
  return (
    <>
      <div className="m-8 w-full space-y-8 overflow-auto rounded-lg bg-white p-8">
        <Header>
          <HeaderLeft>
            <HeaderSubtitle>Gestão de Vendas</HeaderSubtitle>
            <HeaderTitle>Vendas</HeaderTitle>
          </HeaderLeft>
          <HeaderRight>
            <UpsertSaleButton
              products={products}
              productOptions={productOptions}
            />
          </HeaderRight>
        </Header>
        <DataTable columns={saleTableColumns} data={tableData} />
      </div>
    </>
  );
};

export default SalesPage;
