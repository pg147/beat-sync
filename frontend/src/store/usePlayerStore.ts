import { PlayerStore, Song } from "@/types";
import { create } from "zustand";

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  isPlaying: false,
  currentSong: null,
  queue: [],
  currentIndex: -1,

  initializeQueue: (songs: Song[]) => {
    const { currentSong, currentIndex } = get();

    set({
      queue: songs,
      currentSong: currentSong || songs[0],
      currentIndex: currentIndex === -1 ? 0 : currentIndex,
    });
  },

  playAlbum: (songs: Song[], startIndex = 0) => {
    if (songs.length === 0) return;

    const song = songs[startIndex];

    set({
      queue: songs,
      currentSong: song,
      currentIndex: startIndex,
      isPlaying: true,
    });
  },

  setCurrentSong: (song: Song | null) => {
    if (!song) return;

    const { queue, currentIndex } = get();
    const songIndex = queue.findIndex((s) => s._id === song._id);  // finding the song in the queue

    set({
      currentSong: song,
      currentIndex: songIndex !== -1 ? songIndex : currentIndex,
      isPlaying: true,
    });
  },

  togglePlay: () => {
    const { isPlaying } = get();
    set({ isPlaying: !isPlaying });  // negating the current state 
  },

  playNext: () => {
    const { currentIndex, queue } = get();
    const nextIndex = currentIndex + 1;

    // Checking if songs in queue are finished
    if (nextIndex < queue.length) {
      set({
        currentIndex: nextIndex,
        currentSong: queue[nextIndex],
        isPlaying: true,
      });
    } else {
      // Setting the first song in queue as the current song
      set({
        currentIndex: 0,
        currentSong: queue[0],
        isPlaying: true,
      });
    }
  },

  playPrevious: () => {
    const { currentIndex, queue } = get();
    if (currentIndex === 0) return;   // if index is first song in the queue, return

    const previousIndex = currentIndex - 1;
    set({
        currentIndex: previousIndex,
        currentSong: queue[previousIndex],
        isPlaying: true
    })
  },
}));
