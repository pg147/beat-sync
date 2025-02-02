import axiosInstance from "@/lib/axios";
import { AuthStore } from "@/types";
import { create } from "zustand";

export const useAuthStore = create<AuthStore>((set) => ({
  isAdmin: false,
  isLoading: false,

  checkAdminStatus: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/admin/check");

      if (response.data.admin) {
        set({ isAdmin: true });
      }
    } catch (error: any) {
      set({ isAdmin: false });
      console.log(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () => {
    set({ isAdmin: false, isLoading: false });
  },
}));
