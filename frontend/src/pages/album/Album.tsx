// React imports
import { useEffect } from "react";

// react-router-dom
import { useParams } from "react-router-dom";

// Global State Store - Music
import { useMusicStore } from "@/store/useMusicStore"

// Shadcn components
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

// Icon Library
import { Play } from "lucide-react";

// Skeleton
import AlbumSkeleton from "@/components/skeletons/AlbumSkeleton";

// Utils
import { formatDuration } from "@/lib/utils";

export default function Album() {
    const { currentAlbum, fetchCurrentAlbum, isAlbumLoading } = useMusicStore();
    const { id } = useParams();

    useEffect(() => {
        if (id) fetchCurrentAlbum(id);
    }, [id, fetchCurrentAlbum]);

    if (isAlbumLoading) return <AlbumSkeleton />

    return (
        <div className="w-full h-full">
            <ScrollArea className="h-full">
                <div className="relative min-h-full">
                    {/* Background gradient */}
                    <div className="h-screen w-full absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent pointer-events-none" aria-hidden={true}>
                    </div>

                    <div className="p-12">
                        {/* Info Header */}
                        <div className="h-fit w-full flex items-end gap-x-6">
                            <img src={currentAlbum?.coverImageURL} alt={`${currentAlbum}_cover`} className="size-60 aspect-square rounded-xl" />
                            <div>
                                <label className="font-medium text-subheading">Album</label>
                                <h1 className="font-semibold text-6xl mt-3">{currentAlbum?.title}</h1>
                                <p className="font-medium mt-2"><span className="text-primary">{currentAlbum?.artist}</span> • {currentAlbum?.songs.length + " " + "songs"} • {currentAlbum?.releaseYear}</p>
                            </div>
                        </div>
                        
                        <Button className="size-fit rounded-full bg-primary lg:hover:bg-primary p-4 mt-9 transition-all duration-300 ease-in-out lg:hover:scale-125">
                            <Play className="size-7" fill="#FFFFFF" />
                        </Button>

                        <div className="mt-9">
                            {/* Table Headers */}
                            <div className="grid grid-cols-12 px-6 py-3 font-medium text-subheading">
                                <div className="col-span-1">
                                    <p>#</p>
                                </div>
                                <div className="col-span-7">
                                    <p>Title</p>
                                </div>
                                <div className="col-span-2">
                                    <p>Date of Release</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-center">Duration</p>
                                </div>
                            </div>

                            <div className="w-full space-y-1">
                                {currentAlbum?.songs.map((song, index) => (
                                    <div key={song._id} className="cursor-pointer grid grid-cols-12 items-center font-medium group lg:hover:bg-tile/60 px-6 py-3 rounded-xl">
                                        <div className="col-span-1">
                                            <p className="block group-hover:hidden">{index + 1}</p>
                                            <Play className="text-primary size-5 hidden group-hover:block" fill="#EB4D7D"/>
                                        </div>
                                        <div className="col-span-7 flex items-center gap-x-4">
                                            <img src={song.coverImageURL} alt={song.title} className="size-12 aspect-square rounded-md" />
                                            <div>
                                                <h1>{song.title}</h1>
                                                <p className="text-subheading">{song.artist}</p>
                                            </div>
                                        </div>
                                        <div className="col-span-2">
                                            <p>{song.createdAt.split("T")[0]}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="text-center">{formatDuration(song.duration)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}
