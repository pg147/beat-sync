import axiosInstance from "@/lib/axios";
import { MusicStore } from "@/types";
import { create } from "zustand";

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  featuredSongs: [],
  trendingSongs: [],
  madeForYouSongs: [],
  isLoading: false,
  isAlbumLoading: false,
  error: null,
  currentAlbum: null,

  fetchAlbums: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get("/albums");

      if (response && response.data.success) {
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
      const response = await axiosInstance.get(`/albums/${albumId}`);

      if (response && response.data.success) {
        set({ currentAlbum: response.data.album });
      }
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isAlbumLoading: false });
    }
  },

  fetchFeaturedSongs: async () => {
    set({ isLoading: true });

    try {
      const response = await axiosInstance.get("/songs/featured-songs");

      if (response && response.data.success) {
        set({ featuredSongs: response.data.featuredSongs });
      }
    } catch (error: any) {
      console.log(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMadeForYouSongs: async () => {
    try {
      const response = await axiosInstance.get("/songs/made-for-you");

      if (response && response.data.success) {
        set({ madeForYouSongs: response.data.madeForYouSongs });
      }
    } catch (error: any) {
      console.log(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTrendingSongs: async () => {
    set({ isLoading: true });

    try {
      const response = await axiosInstance.get("/songs/trending");

      if (response && response.data.success) {
        set({ trendingSongs: response.data.trendingSongs });
      }
    } catch (error: any) {
      console.log(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));
