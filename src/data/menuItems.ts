import {
  Banknote,
  GalleryHorizontal,
  Home,
  type LucideProps,
  Package,
  Settings2,
  ShoppingCart,
  Users,
} from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
export interface MenuItems {
  id: string;
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  href: string;
  badge?: string;
  count?: number;
}
export const menuItems: MenuItems[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    id: "customers",
    label: "Customers",
    icon: Users,
    href: "/dashboard/customers",
  },
  {
    id: "products",
    label: "Products",
    icon: Package,
    href: "/dashboard/products",
  },
  {
    id: "categories",
    label: "Categories",
    icon: Package,
    href: "/dashboard/categories",
  },
  {
    id: "orders",
    label: "Orders",
    icon: ShoppingCart,
    href: "/dashboard/orders",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings2,
    href: "/dashboard/settings",
  },
  {
    id: "banner",
    label: "Banner",
    icon: Banknote,
    href: "/dashboard/banner",
  },
  
];
