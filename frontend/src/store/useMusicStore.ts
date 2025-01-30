import axiosInstance from "@/lib/axios";
import { MusicStore } from "@/types";
import { create } from "zustand";

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  isAlbumLoading: false,
  error: null,
  currentAlbum: null,

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

  fetchCurrentAlbum: async (albumId: string | undefined) => {
    set({ isAlbumLoading: true, error: null });

    try {
      const album = await axiosInstance.get(`/albums/${albumId}`);

      if (album) {
        set({ currentAlbum: album });
      }
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isAlbumLoading: false });
    }
  },
}));
