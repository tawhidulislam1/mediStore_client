import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.services";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
  let isAuthenticated = false;
  let isAdmin = false;
  const pathname = request.nextUrl.pathname;

  const { data } = await userService.getSession();

  if (data) {
    isAuthenticated = true;
    isAdmin = data.user.role === Roles.admin;
  }
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isAdmin && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }
  if (!isAdmin && pathname.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
  ],
};
