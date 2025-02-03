export interface Song {
  _id: string;
  title: string;
  artist: string;
  albumId: string;
  audioURL: string;
  coverImageURL: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
}

export interface Album {
  _id: string;
  title: string;
  artist: string;
  coverImageURL: string;
  releaseYear: string;
  songs: Array<Song>;
}

export interface MusicStore {
  songs: Array<Song>;
  featuredSongs: Array<Song>;
  trendingSongs: Array<Song>;
  madeForYouSongs: Array<Song>;
  albums: Array<Album>;
  isLoading: boolean;
  isAlbumLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  fetchAlbums: () => Promise<void>;
  fetchCurrentAlbum: (albumId: string | undefined) => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
}

export interface UserStore {
  users: Array<any>;
  isLoading: boolean;
  fetchUsers: () => Promise<void>;
}

export interface AuthStore {
  isAdmin: boolean;
  isLoading: boolean;
  checkAdminStatus: () => Promise<void>;
  reset: () => void;
}

export interface PlayerStore {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Array<Song>;
  currentIndex: number;

  initializeQueue: (songs: Array<Song>) => void;
  playAlbum: (songs: Array<Song>, startIndex?: number | undefined) => void;
  setCurrentSong: (song: Song | null) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
}