import { getMyCart } from "@/action/cart.action";
import CartPage from "@/components/modules/cart/cartPage";

export default async function cartPage() {
  const { data } = await getMyCart();
  const cartInfo = data.data[0].items[0];
  return <CartPage cartInfo={cartInfo} />;
}
