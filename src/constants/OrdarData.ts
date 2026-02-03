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
  status: "PENDING" | "APPROVED" | "REJECTED" | "CANCEL";
  orderItems: OrderItem[];
};
export type OrderItemDetails = {
  id: string;
  quantity: number;
  price: number;
  medicines: {
    name: string;
    manufacturer: string;
  };
};

export type CustomerDetails = {
  id: string;
  name: string;
  email: string;
  image: string;
  phone?: string | null;
};

export type SingleOrder = {
  id: string;
  customer: CustomerDetails;
  paymentGateway: string;
  totalPrice: number;
  status: "PENDING" | "PAID" | "CANCELLED" | "DELIVERED";
  orderItems: OrderItemDetails[];
  shippingAddress: string;
  orderDate: string;
  updatedAt: string;
};
