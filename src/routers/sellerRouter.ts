import { Route } from "@/types";

export const sellerRoutes: Route[] = [
  {
    title: "Seller Routers",
    items: [
      {
        title: "Medicine Management",
        url: "/seller-dashboard/medicine",
      },
      {
        title: "Profile",
        url: "/seller-dashboard/profile",
      },

      {
        title: "Order Management",
        url: "/seller-dashboard/order",
      },
      {
        title: "Home",
        url: "/",
      },
    ],
  },
];
