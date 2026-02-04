import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL || env.API_URL;
interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}
type UserRole = "ADMIN" | "CUSTOMER" | "SELLER";
type UserStatus = "ACTIVE" | "INACTIVE";
type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  role?: string;
  status?: string;
  phone?: string | null;
  createdAt?: string;
};
export const UserDataService = {
  getUser: async function (options?: ServiceOptions) {
    try {
      const config: RequestInit = {};
      const cookieStore = await cookies();
      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }
      config.next = { ...config.next, tags: ["User"] };
      config.headers = {
        ...config.headers,
        Cookie: cookieStore.toString(),
      };

      const res = await fetch(`${API_URL}/api/user`, config);
      const data = await res.json();

      return { data: data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "something went wrong", error },
      };
    }
  },
  getUserById: async function (id: string) {
    try {
      const cookieStore = await cookies();
      const config: RequestInit = {};

      config.headers = {
        Cookie: cookieStore.toString(),
      };
      const res = await fetch(`${API_URL}/api/user/${id}`, config);

      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "something went wrong", error },
      };
    }
  },
  getMyInfo: async function () {
    try {
      const cookieStore = await cookies();
      const config: RequestInit = {};

      config.headers = {
        Cookie: cookieStore.toString(),
      };
      const res = await fetch(`${API_URL}/api/user/me`, config);

      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "something went wrong", error },
      };
    }
  },

  deleteUser: async (id: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });

      const response = await res.json();

      if (!res.ok || response.error) {
        return {
          data: null,
          error: { message: response.error || "Failed to delete user" },
        };
      }

      return { data: response.data || null, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "Something went wrong", error },
      };
    }
  },
  updateUser: async (
    id: string,
    data: { role?: UserRole; status?: UserStatus },
  ) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/user/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
      });

      const response = await res.json();

      if (!res.ok || response.error) {
        return {
          data: null,
          error: { message: response.error || "Failed to update user" },
        };
      }

      return { data: response.data || null, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong", error } };
    }
  },
  updateUserInfo: async (data: User) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/user/updateProfile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
      });

      const response = await res.json();

      if (!res.ok || response.error) {
        return {
          data: null,
          error: { message: response.error || "Failed to update user" },
        };
      }

      return { data: response.data || null, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong", error } };
    }
  },
};
