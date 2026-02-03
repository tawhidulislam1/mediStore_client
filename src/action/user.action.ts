"use server";

import { UserDataService } from "@/services/userData.services";
import { updateTag } from "next/cache";
type UserRole = "ADMIN" | "CUSTOMER" | "SELLER";
type UserStatus = "ACTIVE" | "INACTIVE";
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
export const updateUserByAdmin = async (
  id: string,
  role?: UserRole,
  status?: UserStatus
) => {
  const body: { role?: UserRole; status?: UserStatus } = {};
  if (role) body.role = role;
  if (status) body.status = status;

  const res = await UserDataService.updateUser(id, body);
  updateTag("User");
  return res;
};

