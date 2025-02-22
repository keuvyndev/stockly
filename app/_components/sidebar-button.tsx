"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

interface SideBarButtonProps {
  children: React.ReactNode;
  href: string;
}

const SideBarButton = ({ href, children }: SideBarButtonProps) => {
  const pathname = usePathname();
  return (
    <Button
      variant={pathname === `${href}` ? "secondary" : "ghost"}
      className={
        pathname === `${href}`
          ? "justify-start gap-2 rounded-sm bg-green-100/35 font-semibold text-[#00A180]"
          : "justify-start gap-2 rounded-sm text-gray-500"
      }
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

export default SideBarButton;
