import OrderTable from "@/components/modules/admin/order/orderTable";
import { orderService } from "@/services/order.service";
import { userService } from "@/services/user.services";

export default async function OrderPage() {
  const { data } = await orderService.getOrder({
    cache: "no-store",
  });
  const { data: userSession } = await userService.getSession();

  if (!userSession?.user?.id) {
    return <div>No user session found.</div>;
  }
  if (!userSession?.user?.role) {
    return <div>No user session found.</div>;
  }

  const userRole = userSession.user.role as string;
  console.log(userRole);
  return (
    <div>
      <OrderTable
        data={data.data}
        userRole={userRole as "SELLER" | "CUSTOMER" | "ADMIN"}
      />
    </div>
  );
}
