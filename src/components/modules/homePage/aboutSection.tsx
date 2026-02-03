"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeartPulse, ShieldCheck, Users, Store } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="mx-auto max-w-5xl space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <Badge variant="secondary" className="mx-auto w-fit">
              About MediStore
            </Badge>

            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Built for Safe & Reliable
              <span className="text-primary"> Healthcare Access</span>
            </h2>

            <p className="mx-auto max-w-2xl text-muted-foreground">
              MediStore connects customers with verified pharmacies to ensure
              authentic medicines, transparent pricing, and fast delivery — all
              in one secure platform.
            </p>
          </div>

          {/* Content */}
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left text */}
            <div className="space-y-6 flex flex-col justify-center items-center">
              <p className="text-muted-foreground">
                We created MediStore to remove the confusion and risk from
                buying medicines online. Every seller is verified, every product
                is monitored, and every order is handled with care.
              </p>

              <p className="text-muted-foreground">
                Whether you’re a customer, pharmacy owner, or healthcare
                partner, MediStore provides a secure and scalable system built
                for real-world medical needs.
              </p>
            </div>

            {/* Right stats */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                icon={<ShieldCheck className="h-6 w-6 text-primary" />}
                title="Verified Sellers"
                desc="Only trusted pharmacies are allowed."
              />
              <StatCard
                icon={<HeartPulse className="h-6 w-6 text-primary" />}
                title="Patient First"
                desc="Healthcare-focused platform design."
              />
              <StatCard
                icon={<Store className="h-6 w-6 text-primary" />}
                title="Pharmacy Ready"
                desc="Built for multi-vendor growth."
              />
              <StatCard
                icon={<Users className="h-6 w-6 text-primary" />}
                title="Secure System"
                desc="Role-based access & order safety."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Stat Card ---------- */
type StatCardProps = {
  icon: React.ReactNode;
  title: string;
  desc: string;
};

function StatCard({ icon, title, desc }: StatCardProps) {
  return (
    <Card className="flex gap-4 rounded-xl border-muted/60 p-5 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold leading-none">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      </div>
    </Card>
  );
}
