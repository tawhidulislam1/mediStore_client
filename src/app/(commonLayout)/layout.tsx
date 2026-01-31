import { Navbar1 } from "@/components/layout/navbar1";

export default function commonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar1 />
      {children}
    </div>
  );
}
