"use server";

import { MedicineData } from "@/constants/MedicineData";
import { MedicineService } from "@/services/medicine.services";
import { updateTag } from "next/cache";

export const getMedicines = async () => {
  return await MedicineService.getMedicine();
};
export const createMedicinePost = async (
  data: MedicineData & { title: string; content: string },
) => {
  const res = await MedicineService.createMedicinePost(data);
  updateTag("Medicine");
  return res;
};
