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
  albums: Array<Album>;
  isLoading: boolean;
  isAlbumLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  fetchAlbums: () => Promise<void>;
  fetchCurrentAlbum: (albumId: string | undefined) => Promise<void>;
}

export interface UserStore {
  users: Array<any>,
  isLoading: boolean,
  fetchUsers: () => Promise<void>
}
