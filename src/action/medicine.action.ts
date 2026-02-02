"use server";

import { MedicineData } from "@/constants/MedicineData";
import { MedicineService } from "@/services/medicine.services";
import { updateTag } from "next/cache";

export const getMedicines = async () => {
  return await MedicineService.getMedicine();
};
export const createMedicinePost = async (data: MedicineData) => {
  const res = await MedicineService.createMedicinePost(data);
  console.log(res, "action");
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
