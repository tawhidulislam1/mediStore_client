import OrderTable from "@/components/modules/admin/order/orderTable";
import { orderService } from "@/services/order.service";
import { userService } from "@/services/user.services";

export default async function OrderPage() {
  const { data } = await orderService.getOrder({
    cache: "no-store",
  });
 const { data: user } = await userService.getSession();
  const userRole = user.user.role;
  return (
    <div>
      <OrderTable data={data.data} userRole={userRole}/>
    </div>
  );
}
