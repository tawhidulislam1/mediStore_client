"use client";

import React from "react";
import { Menu, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  userInfo?: {
    name: string;
    image?: string | null;
  };
  cartCount?: number;
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar1 = ({
  userInfo,
  cartCount = 0,
  logo = {
    url: "/",
    src: "https://i.ibb.co/sdDnmQTJ/4022533.png",
    alt: "MediStore Logo",
    title: "MediStore",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "Shop", url: "/shop" },
    { title: "Blog", url: "#" },
    { title: "Dashboard", url: "/dashboard" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/signup" },
  },
  className,
}: Navbar1Props) => {
  return (
    <section
      className={cn(
        "py-4 bg-white dark:bg-gray-900 shadow-sm z-50 relative",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        {/* ================= DESKTOP ================= */}
        <nav className="hidden lg:flex items-center justify-between">
          {/* Logo + Menu */}
          <div className="flex items-center gap-10">
            <a href={logo.url} className="flex items-center gap-2">
              <Image src={logo.src} alt={logo.alt} width={36} height={36} />
              <span className="text-xl font-bold">{logo.title}</span>
            </a>

            <NavigationMenu>
              <NavigationMenuList className="flex gap-4">
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <a href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </a>

            {/* Auth / User */}
            {userInfo?.name ? (
              <div className="relative group">
                <img
                  src={userInfo.image || "/default-avatar.png"}
                  alt={userInfo.name}
                  className="w-10 h-10 rounded-full cursor-pointer"
                />

                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border rounded-md shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition">
                  <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                    Profile
                  </a>
                  <button
                    onClick={async () => {
                      await authClient.signOut();
                      window.location.href = "/";
                    }}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button asChild variant="outline">
                  <a href={auth.login.url}>{auth.login.title}</a>
                </Button>
                <Button asChild>
                  <a href={auth.signup.url}>{auth.signup.title}</a>
                </Button>
              </div>
            )}
          </div>
        </nav>

        {/* ================= MOBILE ================= */}
        <div className="flex lg:hidden items-center justify-between">
          <a href={logo.url} className="flex items-center gap-2">
            <Image src={logo.src} alt={logo.alt} width={36} height={36} />
          </a>

          <div className="flex items-center gap-3">
            {/* Cart */}
            <a href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </a>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu />
                </Button>
              </SheetTrigger>

              <SheetContent className="max-w-xs">
                <SheetHeader>
                  <SheetTitle>{logo.title}</SheetTitle>
                </SheetHeader>

                <Accordion type="single" collapsible className="mt-4">
                  {menu.map((item) => renderMobileMenuItem(item))}
                </Accordion>

                {!userInfo?.name && (
                  <div className="mt-4 flex flex-col gap-2">
                    <Button asChild variant="outline">
                      <a href={auth.login.url}>{auth.login.title}</a>
                    </Button>
                    <Button asChild>
                      <a href={auth.signup.url}>{auth.signup.title}</a>
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ================= HELPERS ================= */

const renderMenuItem = (item: MenuItem) => (
  <NavigationMenuItem key={item.title}>
    <NavigationMenuLink
      href={item.url}
      className="px-4 py-2 rounded-md hover:bg-gray-100"
    >
      {item.title}
    </NavigationMenuLink>
  </NavigationMenuItem>
);

const renderMobileMenuItem = (item: MenuItem) => (
  <AccordionItem key={item.title} value={item.title}>
    <AccordionTrigger>{item.title}</AccordionTrigger>
    <AccordionContent>
      <a href={item.url} className="block py-2">
        {item.title}
      </a>
    </AccordionContent>
  </AccordionItem>
);

export { Navbar1 };
