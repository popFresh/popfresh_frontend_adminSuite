import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Boxes,
  Users,
  CreditCard,
  BarChart3,
  UserCog,
  Plug,
  Settings,
  Truck
} from "lucide-react";

export const navigation = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },

  {
    label: "Orders",
    path: "/orders",
    icon: ShoppingBag,
  },

  {
    label: "Products",
    path: "/products",
    icon: Package,
  },

  {
    label: "Inventory",
    path: "/inventory",
    icon: Boxes,
  },

  {
    label: "Customers",
    path: "/customers",
    icon: Users,
  },

  {
    label: "Payments",
    path: "/payments",
    icon: CreditCard,
  },

 

  {
    label: "Team",
    path: "/team",
    icon: UserCog,
  },
{
    label: "Shipping",
    path: "/shipping",
    icon: Truck,
  },
  

  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];