"use server";

import { reviewService } from "@/services/review.service";
import { updateTag } from "next/cache";
interface reviewData {
  medicineId: string;
  ustomerId?: string;
  rating?: number;
  comment: string;
  customerId?:string
}
export const getReview = async () => {
  return await reviewService.getReview();
};
export const deleteReview = async (id: string) => {
  const res = await reviewService.deleteReview(id);
  if (!res.error) {
    updateTag("Review");
  }
  return res;
};
export const updateReview = async (id: string, data: reviewData) => {
  const res = await reviewService.updateReview(id, data);
  updateTag("Review");
  return res;
};
export const createReview = async (data: reviewData) => {
  const res = await reviewService.createReview(data);
  updateTag("Review");
  return res;
};
