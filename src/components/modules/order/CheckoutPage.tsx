"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { createOrder } from "@/action/order.action";
import { useRouter } from "next/navigation";

type CheckoutPageProps = {
  cartInfo: any;
};

export default function CheckoutPage({ cartInfo }: CheckoutPageProps) {
  const router = useRouter();
  const cart = cartInfo
    ? Array.isArray(cartInfo)
      ? cartInfo
      : [cartInfo]
    : [];

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.medicines?.price || 0) * (item.quantity || 0),
    0,
  );

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (!address.trim()) {
      toast.error("Please enter your delivery address");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Placing your order...");

    const data = {
      paymentGateway: paymentMethod,
      shippingAddress: address,
    };

    try {
      const res = await createOrder(data);
      if (res?.error) {
        toast.error("Something went wrong", { id: toastId });
      } else {
        toast.success("Order placed successfully!", { id: toastId });
        router.push("/shop");
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Delivery Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>

          <label className="block mb-3">
            <span className="text-gray-700">Delivery Address</span>
            <textarea
              className="mt-1 block w-full border rounded-lg p-2"
              placeholder="Enter your full address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>

          <h2 className="text-xl font-semibold mt-6 mb-2">Payment Method</h2>
          <label className="flex items-center gap-2 mb-2">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            Cash on Delivery
          </label>
        </div>

        {/* Order Summary */}
        <div className="bg-blue-50 p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <div>
                  {item.medicines.name} x {item.quantity}
                </div>
                <div>${(item.medicines.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="border-t border-blue-200 mt-4 pt-4 flex justify-between font-bold">
            <span>Total:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <Button
            size="lg"
            className="w-full mt-6"
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </Button>

          <Link
            href="/medicines"
            className="block text-center mt-4 text-blue-600"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
