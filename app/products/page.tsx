import { DataTable } from "../_components/ui/data-table";
import { productsTableColumns } from "./_components/tableColumns";
import { getProducts } from "../_data-access/product/getProducts";
import AddProductButton from "./_components/create-product-button";

// Força o comportamento SSR no Database Caching
//export const dynamic = "force-dynamic";

const ProductsPage = async () => {
  // Consulta no método Database Caching
  const products = await getProducts();

  /*
    // CONSULTA NO MÉTODO DATABASE CACHING COM ISR
    const products = await cachedGetProducts();
  */

  /*
    // MODELO DE CONSULTA VIA API COM ROUTE HANDLER (FETCH)
    const response = await fetch("http://localhost:3000/api/products", {
      method: "GET",
      cache: "no-cache", // Define se será SSR ou STATIC
    });
    const { products } = await response.json();
  */

  return (
    <>
      <div className="m-8 w-full space-y-8 rounded-lg bg-white p-8">
        <div className="flex w-full items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-[#00A180]">
              Produtos
            </span>
            <h2 className="text-xl font-semibold">Gestão de Produtos</h2>
          </div>
          <AddProductButton />
        </div>
        <DataTable
          columns={productsTableColumns}
          data={JSON.parse(JSON.stringify(products))}
        />
      </div>
    </>
  );
};

export default ProductsPage;
