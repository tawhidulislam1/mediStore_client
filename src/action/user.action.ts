"use server";

import { UserDataService } from "@/services/userData.services";
import { updateTag } from "next/cache";
type UserRole = "ADMIN" | "CUSTOMER" | "SELLER";
export const getUsers = async () => {
  return await UserDataService.getUser();
};
export const getUsersById = async (id: string) => {
  return await UserDataService.getUserById(id);
};

export const deleteUser = async (id: string) => {
  const res = await UserDataService.deleteUser(id);
  if (!res.error) {
    updateTag("User");
  }
  return res;
};
export const updateUserByAdmin = async (id: string, role: UserRole) => {
  const res = await UserDataService.updateUser(id, { role });

  updateTag("User");
  return res;
};
