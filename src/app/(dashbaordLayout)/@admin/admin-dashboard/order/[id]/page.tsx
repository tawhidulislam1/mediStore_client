import { getOrderById } from "@/action/order.action";
import ViewOrder from "@/components/modules/admin/order/viewOrder";

export default async function UserSinglePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const { data } = await getOrderById(id);

  return (
    <div>
      <ViewOrder data={data.data ? data : null} />
    </div>
  );
}
