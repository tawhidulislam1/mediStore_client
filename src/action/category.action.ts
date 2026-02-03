"use server";

import { categoryOption, categoryOptionData } from "@/constants/categoryData";
import { categoryService } from "@/services/category.services";
import { updateTag } from "next/cache";

export const getCategory = async () => {
  return await categoryService.getCategory();
};
export const getCategoryById = async (id: string) => {
  return await categoryService.getCategoryById(id);
};
export const createCategory = async (data: categoryOptionData) => {
  const res = await categoryService.createCategory(data );
  updateTag("Category");
  return res;
};
export const deleteCategory = async (id: string) => {
  const res = await categoryService.deleteCategory(id);
  if (!res.error) {
    updateTag("Category");
  }
  return res;
};
export const updateCategory = async (id: string, data: categoryOptionData) => {
  const res = await categoryService.updateCategory(id, data);
  updateTag("Category");
  return res;
};
