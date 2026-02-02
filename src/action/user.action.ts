"use server";

import { UserDataService } from "@/services/userData.services";
import { updateTag } from "next/cache";

export const getUsers = async () => {
  return await UserDataService.getUser();
};

export const deleteUser = async (id: string) => {
  const res = await UserDataService.deleteUser(id);
  if (!res.error) {
    updateTag("User");
  }
  return res;
};
export const updateUser = async (id: string, status: string) => {
  const res = await UserDataService.updateUser(id, { status });
  console.log(res, "action");
  updateTag("User");
  return res;
};
