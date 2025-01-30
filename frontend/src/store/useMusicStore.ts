import axiosInstance from "@/lib/axios";
import { MusicStore } from "@/types";
import { create } from "zustand";

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,

  fetchAlbums: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get("/albums");
      
      if (response) {
        set({ albums: response.data.albums });
      }
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
