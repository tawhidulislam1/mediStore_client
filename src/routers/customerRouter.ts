import { Route } from "@/types";

export const customerRoutes: Route[] = [
  {
    title: "Customer Routers",
    items: [
      {
        title: "My Orders",
        url: "/customer-dashboard/order",
      },
      {
        title: "Profile",
        url: "/customer-dashboard/profile",
      },
      {
        title: "Home",
        url: "/",
      },
      {
        title: "SHop",
        url: "/shop",
      },
    ],
  },
];
