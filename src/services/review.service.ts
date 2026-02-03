import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL || env.API_URL;
interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}
interface reviewData {
  medicineId: string;
  ustomerId: string;
  rating: string;
  comment: string;
}
export const reviewService = {
  getReview: async function (options?: ServiceOptions) {
    try {
      const config: RequestInit = {};
      const cookieStore = await cookies();
      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }
      config.next = { ...config.next, tags: ["Review"] };
      config.headers = {
        ...config.headers,
        Cookie: cookieStore.toString(),
      };

      const res = await fetch(`${API_URL}/review`, config);
      const data = await res.json();

      return { data: data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "something went wrong", error },
      };
    }
  },
  deleteReview: async (id: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/review/${id}`, {
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
          error: { message: response.error || "Failed to delete review" },
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
  updateReview: async (id: string, data: reviewData) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/review/${id}`, {
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
          error: { message: response.error || "Failed to update review" },
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
