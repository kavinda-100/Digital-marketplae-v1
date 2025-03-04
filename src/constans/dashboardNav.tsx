import {
  BadgeDollarSign,
  CreditCard,
  LayoutDashboard,
  ShoppingBasket,
  ShoppingCart,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";

type NavLinkType = {
  name: string;
  href: string;
  icon: ReactNode;
};

export const sellerNav: NavLinkType[] = [
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
  {
    name: "Orders",
    href: "/dashboard/seller/orders",
    icon: <CreditCard />,
  },
];

export const adminNav: NavLinkType[] = [
  {
    name: "Dashboard", // statistics
    href: "/dashboard/admin",
    icon: <LayoutDashboard />,
  },
  {
    name: "Products",
    href: "/dashboard/admin/products",
    icon: <ShoppingCart />,
  },
  {
    name: "Orders",
    href: "/dashboard/admin/orders",
    icon: <ShoppingBasket />,
  },
  {
    name: "Users",
    href: "/dashboard/admin/users",
    icon: <Users />,
  },
];

export const userNav: NavLinkType[] = [
  {
    name: "Dashboard", // statistics
    href: "/dashboard/user",
    icon: <LayoutDashboard />,
  },
  {
    name: "My Orders",
    href: "/dashboard/user/orders",
    icon: <ShoppingBasket />,
  },
];
