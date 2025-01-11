import { BadgeDollarSign, LayoutDashboard, ShoppingCart } from "lucide-react";
import type { ReactNode } from "react";

type sellerNavType = {
  name: string;
  href: string;
  icon: ReactNode;
};

export const sellerNav: sellerNavType[] = [
  {
    name: "Dashboard", // statistics
    href: "/dashboard/seller",
    icon: <LayoutDashboard />,
  },
  {
    name: "Sell",
    href: "/dashboard/seller/sell",
    icon: <BadgeDollarSign />,
  },
  {
    name: "Products",
    href: "/dashboard/seller/product",
    icon: <ShoppingCart />,
  },
];
