import { create } from "zustand";
import axiosClient from "@/app/api/GlobalApi";

const useOrderStore = create((set, get) => ({
  createOrder: async (data) => {
    try {
      const response = await axiosClient.post("orders", data);

      return response.data;
    } catch (error) {
      console.error("Failed to create order", error);
      throw error;
    }
  },

  getOrders: async () => {
    try {
      const response = await axiosClient.get(
        "orders?populate[products][populate]=*&populate[invoice]=*&populate[files]=*"
      );
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch orders", error);
      throw error;
    }
  },

  getOrdersByUser: async (email) => {
    try {
      const orders = await get().getOrders(); // Reference `getOrders` using `get()`
      const orderByUser = orders.filter(
        (order) => order.email === email
      );
      return orderByUser;
    } catch (error) {
      console.error("Failed to fetch orders by user", error);
      throw error;
    }
  },
}));

export default useOrderStore;
