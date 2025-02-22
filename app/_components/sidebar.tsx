import { LayoutGrid, PackageIcon, ShoppingBasketIcon } from "lucide-react";
import SideBarButton from "./sidebar-button";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white">
      {/* IMAGEM */}

      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold text-[#00A180]">STOCKLY</h1>
      </div>

      {/* BOTÕES */}
      <div className="flex flex-col gap-2 p-2">
        <SideBarButton href="/">
          <LayoutGrid size={20} />
          Dashboard
        </SideBarButton>

        <SideBarButton href="/products">
          <PackageIcon size={20} />
          Produtos
        </SideBarButton>

        <SideBarButton href="/sales">
          <ShoppingBasketIcon size={20} />
          Vendas
        </SideBarButton>
      </div>
    </div>
  );
};

export default Sidebar;
