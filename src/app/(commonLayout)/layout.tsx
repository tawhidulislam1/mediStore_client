import { Navbar1 } from "@/components/layout/navbar1";
import { userService } from "@/services/user.services";

export default async function commonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await userService.getSession();
  const userInfo = data?.user || null;
  return (
    <div>
      <Navbar1 userInfo={userInfo} />
      {children}
    </div>
  );
}
