export type OrderItem = {
  id: string;
  quantity: number;
};

export type Customer = {
  id: string;
  name: string;
};

export type Order = {
  id: string;
  customer: Customer;
  paymentGateway: string;
  totalPrice: number;
  status: "PENDING" | "PAID" | "CANCELLED" | "DELIVERED";
  orderItems: OrderItem[];
};
