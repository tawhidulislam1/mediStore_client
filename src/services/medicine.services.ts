import { MedicineData } from "@/constants/MedicineData";
import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL || env.API_URL;
interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

interface GetMedicinesParams {
  status?: string;
  search?: string;
  category?: string;
}

export const MedicineService = {
  getMedicine: async function (
    params?: GetMedicinesParams,
    options?: ServiceOptions,
  ) {
    try {
      const url = new URL(`${API_URL}/medicine`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }
      config.next = { ...config.next, tags: ["Medicine"] };

      const res = await fetch(`${API_URL}/medicine`, config);
      const data = await res.json();

      return { data: data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "something went wrong", error },
      };
    }
  },
  getMedicineById: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/post/${id}`);
      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "something went wrong", error },
      };
    }
  },
  createMedicinePost: async (data: MedicineData) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/medicine`, {
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
};
