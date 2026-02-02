import { MedicineData } from "@/constants/MedicineData";
import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL || env.API_URL;
interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

export const UserDataService = {
  getUser: async function (options?: ServiceOptions) {
    try {
      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }
      config.next = { ...config.next, tags: ["User"] };

      const res = await fetch(`${API_URL}/user`, config);
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
      const res = await fetch(`${API_URL}/user/${id}`);
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

      const res = await fetch(`${API_URL}/user/${id}`, {
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
  updateUser: async (id: string, { status }: { status: string }) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/user/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ status }),
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
      return {
        data: null,
        error: { message: "Something went wrong", error },
      };
    }
  },
};
