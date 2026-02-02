import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Admin Routers",
    items: [
      {
        title: "Medicine Management",
        url: "/admin-dashboard/medicine",
      },
      {
        title: "User",
        url: "/admin-dashboard/user",
      },
    ],
  },
];
