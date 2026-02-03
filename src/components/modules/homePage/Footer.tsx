"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Here you can call your newsletter API
    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="bg-background border-t border-muted/20 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-12 md:grid-cols-4">

          {/* About */}
          <div className="space-y-4">
            <Badge variant="secondary">MediStore</Badge>
            <p className="text-sm text-muted-foreground">
              MediStore connects you with verified pharmacies to ensure authentic medicines, fast delivery, and safe healthcare.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-4">
              <Link href="https://facebook.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://instagram.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/categories" className="text-muted-foreground hover:text-primary transition-colors">Categories</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Categories</h4>
            <ul className="space-y-2">
              <li><Link href="/medicine?category=1" className="text-muted-foreground hover:text-primary transition-colors">Medicines</Link></li>
              <li><Link href="/medicine?category=2" className="text-muted-foreground hover:text-primary transition-colors">Medical Equipment</Link></li>
              <li><Link href="/medicine?category=3" className="text-muted-foreground hover:text-primary transition-colors">Health Care</Link></li>
              <li><Link href="/medicine?category=4" className="text-muted-foreground hover:text-primary transition-colors">Baby Care</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Newsletter</h4>
            <p className="text-sm text-muted-foreground">
              Subscribe to get the latest medicines and offers.
            </p>
            <form className="mt-2 flex flex-col gap-2" onSubmit={handleSubscribe}>
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="w-full">
                {submitted ? "Subscribed!" : "Subscribe"}
              </Button>
            </form>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-16 border-t border-muted/20 pt-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} MediStore. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
