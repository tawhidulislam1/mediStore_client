"use server";

import { MedicineData } from "@/constants/MedicineData";
import { MedicineService } from "@/services/medicine.services";
import { updateTag } from "next/cache";

export const getMedicines = async () => {
  return await MedicineService.getMedicine();
};
export const getMedicinesById = async (id: string) => {
  return await MedicineService.getMedicineById(id);
};
export const getMedicineBySeller = async (id: string) => {
  return await MedicineService.getMedicineBySeller(id);
};
export const createMedicinePost = async (data: any) => {
  const res = await MedicineService.createMedicinePost(data);

  updateTag("Medicine");
  return res;
};
export const deleteMedicine = async (id: string) => {
  const res = await MedicineService.deleteMedicine(id);
  if (!res.error) {
    updateTag("Medicine");
  }
  return res;
};
export const updateMedicinet = async (id: string, data: MedicineData) => {
  const res = await MedicineService.updateMedicine(id, data);
 

  updateTag("Medicine");
  return res;
};
