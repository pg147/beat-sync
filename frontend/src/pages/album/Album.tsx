// React imports
import { useEffect } from "react";

// react-router-dom
import { useParams } from "react-router-dom";

// Global State Stores
import { useMusicStore } from "@/store/useMusicStore"
import { usePlayerStore } from "@/store/usePlayerStore";

// Components
import AudioPlayer from "@/components/AudioPlayer";

// Shadcn components
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

// Icon Library
import { Pause, Play } from "lucide-react";
import { MusicNote03Icon } from "hugeicons-react";

// Skeleton
import AlbumSkeleton from "@/components/skeletons/AlbumSkeleton";

// Utils
import { formatDuration } from "@/lib/utils";

export default function Album() {
    const { currentAlbum, fetchCurrentAlbum, isAlbumLoading } = useMusicStore();
    const { playAlbum, currentSong, isPlaying, togglePlay } = usePlayerStore();
    const { id } = useParams();

    useEffect(() => {
        if (id) fetchCurrentAlbum(id);
    }, [id, fetchCurrentAlbum]);

    const handlePlayButton = () => {
        const isAlbumPlaying = currentAlbum?.songs.some(song => song._id === currentSong?._id);

        // If album is already playing then act as a control button
        if (isAlbumPlaying) togglePlay();
        else handlePlaySong(0);  // else start playing album from start
    }

    const handlePlaySong = (index: number) => {
        if (!currentAlbum) return;

        playAlbum(currentAlbum?.songs, index);
    }

    if (isAlbumLoading) return <AlbumSkeleton />

    return (
        <div className="w-full h-fit md:h-full">
            <AudioPlayer />
            <ScrollArea className="h-full">
                <div className="relative min-h-full">
                    {/* Background gradient */}
                    <div className="h-screen w-full absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent pointer-events-none" aria-hidden={true}>
                    </div>

                    <div className="p-5 md:p-12">
                        {/* Info Header */}
                        <div className="h-fit w-full flex items-end gap-x-4 md:gap-x-6">
                            <img src={currentAlbum?.coverImageURL} alt={`${currentAlbum}_cover`} className="size-28 md:size-60 aspect-square rounded-xl" />
                            <div>
                                <label className="text-sm md:text-base font-medium text-subheading">Album</label>
                                <h1 className="font-medium md:font-semibold text-2xl md:text-6xl mt-1 md:mt-3">{currentAlbum?.title}</h1>
                                <p className="text-sm md:text-base font-medium mt-1 md:mt-2"><span className="text-primary">{currentAlbum?.artist}</span> • {currentAlbum?.songs.length + " " + "songs"} • {currentAlbum?.releaseYear}</p>
                            </div>
                        </div>

                        <Button onClick={handlePlayButton} className={`size-fit rounded-full bg-primary lg:hover:bg-primary p-4 mt-9 transition-all duration-300 ease-in-out ${isPlaying ? '' : 'lg:hover:scale-125'}`}>
                            {isPlaying ? <Pause className="size-7" fill="#FFFFFF" /> : <Play className="size-7" fill="#FFFFFF" />}
                        </Button>

                        <div className="mt-9">
                            {/* Table Headers */}
                            <div className="grid grid-cols-8 md:grid-cols-12 md:px-6 py-3 font-medium text-subheading">
                                <div className="col-span-1">
                                    <p>#</p>
                                </div>
                                <div className="col-span-5 md:col-span-7">
                                    <p>Title</p>
                                </div>
                                <div className="hidden md:block col-span-1 md:col-span-2">
                                    <p>Date of Release</p>
                                </div>
                                <div className="col-span-2 md:col-span-2 place-items-end md:place-items-start">
                                    <p className="md:text-center">Duration</p>
                                </div>
                            </div>

                            <div className="w-full space-y-1">
                                {currentAlbum?.songs.map((song, index) => {
                                    const isCurrentSong = currentSong?._id === song._id;
                                    
                                    return (
                                        <div onClick={() => handlePlaySong(index)} key={song._id} className="cursor-pointer grid grid-cols-8 md:grid-cols-12 md:px-6 py-3 items-center font-medium group lg:hover:bg-tile/60 rounded-xl">
                                            <div className="col-span-1">
                                                {isCurrentSong ? <MusicNote03Icon className="size-5 text-primary" /> : <>
                                                    <p className="block group-hover:hidden">{index + 1}</p>
                                                    <Play className="text-primary size-5 hidden group-hover:block" fill="#EB4D7D" />
                                                </>}
                                            </div>
                                            <div className="col-span-5 md:col-span-7 flex items-center gap-x-4">
                                                <img src={song.coverImageURL} alt={song.title} className="size-12 aspect-square rounded-md" />
                                                <div>
                                                    <h1>{song.title}</h1>
                                                    <p className="text-subheading">{song.artist}</p>
                                                </div>
                                            </div>
                                            <div className="hidden md:block col-span-1 md:col-span-2">
                                                <p>{song.createdAt.split("T")[0]}</p>
                                            </div>
                                            <div className="col-span-2 md:col-span-2 place-items-center md:place-items-start">
                                                <p className="text-center">{formatDuration(song.duration)}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}
