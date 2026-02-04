"use server";
import { CartData } from "@/constants/CartData";
import { CartService } from "@/services/cart.service";
import { updateTag } from "next/cache";

export const getCartUser = async (id: string) => {
  return await CartService.getCart(id);
};
export const getMyCart = async () => {
  return await CartService.getMyCart();
};
export const createCart = async (data: CartData) => {
  const res = await CartService.createCart(data);
  updateTag("Cart");
  return res;
};
export const deleteCart = async (id: string) => {
  const res = await CartService.deleteCartItem(id);
  if (!res.error) {
    updateTag("Cart");
  }
  return res;
};
export const updateCartItem = async (id: string, quantity: number) => {
  const res = await CartService.updateCartItem(id, quantity);
  updateTag("Cart");
  return res;
};
