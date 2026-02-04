"use server";

import { Order } from "@/constants/OrdarData";
import { orderService } from "@/services/order.service";
import { updateTag } from "next/cache";

export const getOrder = async () => {
  return await orderService.getOrder();
};
export const getOrderById = async (id: string) => {
  return await orderService.getOrderyById(id);
};

export const createOrder = async (data: Order) => {
  const res = await orderService.createOrder(data);
  updateTag("Order");
  return res;
};
export const updateOrder = async (id: string, data: Order) => {
  const res = await orderService.updateOrder(id, data);
  updateTag("Order");
  return res;
};
