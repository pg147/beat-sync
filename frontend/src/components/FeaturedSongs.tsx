// React Imports
import { useEffect } from "react";

// Shadcn Imports
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

// Global Store
import { useMusicStore } from "@/store/useMusicStore";
import { usePlayerStore } from "@/store/usePlayerStore";

// Components
import AudioPlayer from "./AudioPlayer";
import PlayButton from "./PlayButton";

// Skeleton
import SongsSkeleton from "./skeletons/SongsSkeleton";

export default function FeaturedSongs() {
    const { isLoading, featuredSongs, fetchFeaturedSongs } = useMusicStore();
    const { currentSong } = usePlayerStore();

    useEffect(() => {
        fetchFeaturedSongs();
    }, [fetchFeaturedSongs])

    if (isLoading) return <div className="w-full">
        <SongsSkeleton />
    </div>

    return (
        <div className="w-full">
            <AudioPlayer />
            <div className="flex flex-col gap-y-4">
                <h1 className="font-semibold text-xl">Featured Songs</h1>
                <ScrollArea className="w-full">
                    <div className="flex w-max gap-x-5">
                        {featuredSongs.map((song) => {
                            const isCurrentSong = currentSong?._id === song._id;
                            return (
                                <div key={song._id} className={`group cursor-pointer pb-3 flex flex-col gap-y-2.5 ${isCurrentSong ? 'bg-tileLight/50' : 'lg:hover:bg-tileLight/50'} rounded-xl`}>
                                    <img src={song.coverImageURL} alt={song.title} className="size-56 aspect-square object-cover rounded-xl" />
                                    <div className={`flex items-center w-full justify-between transition-all duration-300 ease-in-out ${isCurrentSong ? 'px-4' : 'lg:group-hover:px-4'}`}>
                                        <div className="flex flex-col font-medium">
                                            <h1>{song.title}</h1>
                                            <p className="text-subheading">{song.artist}</p>
                                        </div>
                                        <PlayButton song={song} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <ScrollBar className="hidden" orientation="horizontal" />
                </ScrollArea>
            </div>
        </div>
    )
}
