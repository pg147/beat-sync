export interface Song {
  _id: string;
  title: string;
  artist: string;
  albumId: string;
  audioURL: string;
  coverImageURL: string;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Album {
  _id: string;
  title: string;
  artist: string;
  coverImageURL: string;
  releaseYear: Date;
  songs: Array<Song>;
}

export interface MusicStore {
  songs: Array<Song>;
  albums: Array<Album>;
  isLoading: boolean;
  isAlbumLoading: boolean;
  error: string | null;
  currentAlbum: object | null;
  fetchAlbums: () => Promise<void>;
  fetchCurrentAlbum: (albumId: string | undefined) => Promise<void>;
}
