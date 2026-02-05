import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.services";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
  let isAuthenticated = false;
  let isAdmin = false;
  let isSeller = false;
  let isCustomer = false;
  const pathname = request.nextUrl.pathname;

  const { data } = await userService.getSession();

  if (data) {
    isAuthenticated = true;
    isAdmin = data.user.role === Roles.admin;
    isSeller = data.user.role === Roles.seller;
    isCustomer = data.user.role === Roles.customer;
  }
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (pathname.startsWith("/dashboard")) {
    if (isAdmin)
      return NextResponse.redirect(
        new URL("/admin-dashboard/profile", request.url),
      );
    if (isSeller)
      return NextResponse.redirect(
        new URL("/seller-dashboard/profile", request.url),
      );
    if (isCustomer)
      return NextResponse.redirect(
        new URL("/customer-dashboard/profile", request.url),
      );
    if (!isAdmin || !isSeller || !isCustomer) {
      return NextResponse.redirect(
        new URL("/login", request.url),
      );
    }
  }
  if (
    (pathname.startsWith("/cart") || pathname.startsWith("/order")) &&
    !isCustomer
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/seller-dashboard") && !isSeller) {
    return NextResponse.redirect(new URL("/customer-dashboard", request.url));
  }

  if (pathname.startsWith("/admin-dashboard") && !isAdmin) {
    return NextResponse.redirect(new URL("/customer-dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart",
    "/cart/:path*",
    "/order",
    "/order/:path*",
    "/customer-dashboard",
    "/customer-dashboard/:path*",
    "/seller-dashboard",
    "/seller-dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
  ],
};
