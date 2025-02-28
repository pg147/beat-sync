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

// Icon Library
import { FavouriteIcon } from "hugeicons-react";

// Skeleton
import SongsSkeleton from "./skeletons/SongsSkeleton";

export default function MadeForYouSongs() {
    const { isLoading, madeForYouSongs, fetchMadeForYouSongs } = useMusicStore();
    const { currentSong } = usePlayerStore();

    useEffect(() => {
        fetchMadeForYouSongs();
    }, [fetchMadeForYouSongs])

    if (isLoading) return <div className="w-full">
        <SongsSkeleton />
    </div>

    return (
        <div className="w-full">
            <AudioPlayer />
            <div className="flex flex-col gap-y-4">
                <div className="flex items-center gap-x-2.5">
                    <h1 className="font-medium md:font-semibold text-lg md:text-xl">Made For <span className="text-primary">You</span></h1>
                    <FavouriteIcon className="size-5 md:size-6 text-primary" fill="#EB4D7D" />
                </div>
                <ScrollArea className="w-full">
                    <div className="flex w-max gap-x-5">
                        {madeForYouSongs.map((song) => {
                            const isCurrentSong = currentSong?._id === song._id;
                            return (
                                <div key={song._id} className={`group cursor-pointer pb-3 flex flex-col gap-y-2.5 ${isCurrentSong ? 'bg-tileLight/50' : 'lg:hover:bg-tileLight/50'} rounded-xl`}>
                                    <img src={song.coverImageURL} alt={song.title} className="size-56 aspect-square object-cover rounded-xl" />
                                    <div className={`flex items-center w-full justify-between transition-all duration-300 ease-in-out ${isCurrentSong ? 'px-4' : 'lg:group-hover:px-4'}`}>
                                        <div className="flex flex-col font-medium">
                                            <h1 className="text-sm md:text-base">{song.title}</h1>
                                            <p className="text-subheading text-sm md:text-base">{song.artist}</p>
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
