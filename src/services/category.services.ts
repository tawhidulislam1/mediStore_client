import { categoryOption } from "@/constants/categoryData";
import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL || env.API_URL;
interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}
export const categoryService = {
  getCategory: async function (options?: ServiceOptions) {
    try {
      const config: RequestInit = {};
      const cookieStore = await cookies();
      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }
      config.next = { ...config.next, tags: ["Category"] };
      config.headers = {
        ...config.headers,
        Cookie: cookieStore.toString(),
      };

      const res = await fetch(`${API_URL}/admin/category`, config);
      const data = await res.json();

      return { data: data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "something went wrong", error },
      };
    }
  },
  createCategory: async (data: categoryOption) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/admin/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();
      console.log("service", response);

      if (response.error) {
        return {
          data: null,
          error: { error: response.error },
        };
      }
      console.log("service", response);

      return { data: response.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "something went wrong", error },
      };
    }
  },
  getCategoryById: async function (id: string) {
    try {
      const cookieStore = await cookies();
      const config: RequestInit = {};

      config.headers = {
        Cookie: cookieStore.toString(),
      };
      const res = await fetch(`${API_URL}/admin/category/${id}`, config);

      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "something went wrong", error },
      };
    }
  },
  deleteCategory: async (id: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/admin/category/${id}`, {
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
  updateCategory: async (id: string, data: categoryOption) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/admin/category/${id}`, {
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
      return {
        data: null,
        error: { message: "Something went wrong", error },
      };
    }
  },
};
