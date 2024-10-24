import { create } from "zustand";
import axiosClient from "@/app/api/GlobalApi";

const useOrderStore = create((set) => ({
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
        "orders?populate[products][populate]=*&populate[files]=*"
      );
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch orders", error);
      throw error;
    }
  },

  getOrdersByUser: async (email) => {
    const orders = await getOrders();
    const orderByUser = orders.filter(
      (order) => order.attributes.email === email
    );
    return orderByUser;
  },
}));

export default useOrderStore;
