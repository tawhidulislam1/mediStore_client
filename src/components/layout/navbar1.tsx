"use client";

import React, { useState, useRef, useEffect } from "react";
import { Menu, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { authClient } from "@/lib/auth-client";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  items?: MenuItem[];
}

interface Navbar1Props {
  userInfo?: { role?: string; name: string; image?: string | null };
  logo?: { url: string; src: string; alt: string; title: string };
  menu?: MenuItem[];
  auth?: { login: { title: string; url: string }; signup: { title: string; url: string } };
}

export const Navbar1 = ({
  userInfo,
  logo = { url: "/", src: "https://i.ibb.co/sdDnmQTJ/4022533.png", alt: "MediStore Logo", title: "MediStore" },
  menu = [
    { title: "Home", url: "/" },
    { title: "Shop", url: "/shop" },
  ],
  auth = { login: { title: "Login", url: "/login" }, signup: { title: "Sign up", url: "/signup" } },
}: Navbar1Props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDashboardUrl = (role?: string) => {
    switch (role?.toUpperCase()) {
      case "ADMIN":
        return "/admin-dashboard/profile";
      case "SELLER":
        return "/seller-dashboard/profile";
      case "CUSTOMER":
        return "/customer-dashboard/profile";
      default:
        return "/dashboard";
    }
  };

  return (
    <section className="py-4 bg-white shadow-sm relative z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href={logo.url} className="flex items-center gap-2">
          <Image src={logo.src} alt={logo.alt} width={36} height={36} />
          <span className="text-xl font-bold">{logo.title}</span>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-6">
          {menu.map((item) =>
            item.items ? (
              <div key={item.title} className="relative group">
                <button className="px-4 py-2 font-semibold">{item.title}</button>
                <div className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition">
                  {item.items.map((sub) => (
                    <a
                      key={sub.title}
                      href={sub.url}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      {sub.title}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a key={item.title} href={item.url} className="px-4 py-2 font-semibold hover:text-blue-600">
                {item.title}
              </a>
            )
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <a href="/cart" className="p-2 rounded-full hover:bg-gray-100">
            <ShoppingCart className="w-5 h-5" />
          </a>

          {/* User Auth */}
          {userInfo?.name ? (
            <div className="relative" ref={dropdownRef}>
              <img
                src={userInfo.image || "/default-avatar.png"}
                alt={userInfo.name}
                className="w-10 h-10 rounded-full border cursor-pointer object-cover"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                  <a
                    href={getDashboardUrl(userInfo.role)}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
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
              )}
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

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>{logo.title}</SheetTitle>
                </SheetHeader>

                <Accordion type="single" collapsible className="mt-4">
                  {menu.map((item) =>
                    item.items ? (
                      <AccordionItem key={item.title} value={item.title}>
                        <AccordionTrigger>{item.title}</AccordionTrigger>
                        <AccordionContent>
                          {item.items.map((sub) => (
                            <a
                              key={sub.title}
                              href={sub.url}
                              className="block py-2 px-2 rounded hover:bg-gray-100"
                            >
                              {sub.title}
                            </a>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    ) : (
                      <a key={item.title} href={item.url} className="block py-2 px-2 font-semibold">
                        {item.title}
                      </a>
                    )
                  )}
                </Accordion>

                {!userInfo?.name && (
                  <div className="mt-4 space-y-2">
                    <Button asChild variant="outline" className="w-full">
                      <a href={auth.login.url}>{auth.login.title}</a>
                    </Button>
                    <Button asChild className="w-full">
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
