import { getOrderById } from "@/action/order.action";
import ReviewPage from "@/components/modules/review/review";

export default async function reviewProdcut({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const { data } = await getOrderById(id);

  return <ReviewPage data={data.data ? data : null} />;
}
