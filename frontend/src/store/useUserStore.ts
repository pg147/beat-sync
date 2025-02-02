import axiosInstance from "@/lib/axios";
import { UserStore } from "@/types";
import { create } from "zustand";

export const useUserStore = create<UserStore>((set) => ({
    users: [],
    isLoading: false,

    fetchUsers: async () => {
        set({ isLoading: true });

        try {
            const response = await axiosInstance.get('/users');
            if (response && response.data.success) {
                set({ users: response.data.users });
            }
        } catch (error: any) {
            console.log(error.response.data.message);
        } finally {
            set({ isLoading: false });
        }
    }
}))