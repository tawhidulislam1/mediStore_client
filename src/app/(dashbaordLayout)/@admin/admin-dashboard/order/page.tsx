import OrderTable from "@/components/modules/admin/order/orderTable";
import { orderService } from "@/services/order.service";

export default async function OrderPage() {
  const { data } = await orderService.getOrder({
    cache: "no-store",
  });

  return (
    <div>
      <OrderTable data={data.data} />
    </div>
  );
}
