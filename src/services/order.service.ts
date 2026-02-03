
import { Order } from "@/constants/OrdarData";
import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL || env.API_URL;
interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}
export const orderService = {
  getOrder: async function (options?: ServiceOptions) {
    try {
      const config: RequestInit = {};
      const cookieStore = await cookies();
      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }
      config.next = { ...config.next, tags: ["Order"] };
      config.headers = {
        ...config.headers,
        Cookie: cookieStore.toString(),
      };

      const res = await fetch(`${API_URL}/api/orders`, config);
      const data = await res.json();

      return { data: data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "something went wrong", error },
      };
    }
  },
  createOrder: async (data: Order) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();


      if (response.error) {
        return {
          data: null,
          error: { error: response.error },
        };
      }


      return { data: response.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "something went wrong", error },
      };
    }
  },
  getOrderyById: async function (id: string) {
    try {
      const cookieStore = await cookies();
      const config: RequestInit = {};

      config.headers = {
        Cookie: cookieStore.toString(),
      };
      const res = await fetch(`${API_URL}/api/orders/${id}`, config);

      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "something went wrong", error },
      };
    }
  },
  deleteOrder: async (id: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/orders/${id}`, {
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
  updateOrder: async (id: string, data: Order) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/orders/${id}`, {
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
