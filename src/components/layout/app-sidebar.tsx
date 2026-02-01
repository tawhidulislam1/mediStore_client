import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Route } from "@/types";
import { Roles } from "@/constants/roles";
import { adminRoutes } from "@/routers/adminRouter";
import { sellerRoutes } from "@/routers/sellerRouter";
import { customerRoutes } from "@/routers/customerRouter";

// This is sample data.

export function AppSidebar({
  user,
  ...props
}: {
  user: { user: string } & React.ComponentProps<typeof Sidebar>;
}) {
  let routers: Route[] = [];
  console.log(user);
  switch (user.role) {
    case Roles.customer:
      routers = customerRoutes;
      break;
    case Roles.admin:
      routers = adminRoutes;
      break;

    case Roles.seller:
      routers = sellerRoutes;
      break;

    default:
      routers = [];
      break;
  }
  return (
    <Sidebar {...props}>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routers.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
