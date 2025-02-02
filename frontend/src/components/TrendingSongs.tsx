// React Imports
import { useEffect } from "react";

// Music Store
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Button } from "./ui/button";

// Music Store
import { useMusicStore } from "@/store/useMusicStore";

// Icon Library
import { Play } from "lucide-react";
import { FireIcon } from "hugeicons-react";

export default function TrendingSongs() {
    const { isLoading, trendingSongs, fetchTrendingSongs } = useMusicStore();

    useEffect(() => {
        fetchTrendingSongs();
    }, [fetchTrendingSongs])

    if (isLoading) return

    return (
        <div className="w-full">
            <div className="flex flex-col gap-y-4">
                <div className="flex items-center gap-x-2.5">
                    <FireIcon className="size-6 text-primary" fill="#EB4D7D"/>
                    <h1 className="font-semibold text-xl">Trending Songs</h1>
                </div>
                <ScrollArea className="w-full">
                    <div className="flex w-max gap-x-5">
                        {trendingSongs.map((song) => (
                            <div key={song._id} className="group cursor-pointer pb-3 flex flex-col gap-y-2.5 lg:hover:bg-tileLight/50 rounded-xl">
                                <img src={song.coverImageURL} alt={song.title} className="size-56 aspect-square object-cover rounded-xl" />
                                <div className="flex items-center w-full justify-between lg:group-hover:px-4 transition-all duration-300 ease-in-out ">
                                    <div className="flex flex-col font-medium">
                                        <h1>{song.title}</h1>
                                        <p className="text-subheading">{song.artist}</p>
                                    </div>
                                    <Button className="size-fit rounded-full bg-primary hidden lg:group-hover:block lg:hover:bg-primary p-3 transition-all duration-300 ease-in-out">
                                        <Play className="size-4" fill="#FFFFFF" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <ScrollBar className="hidden" orientation="horizontal" />
                </ScrollArea>
            </div>
        </div>
    )
}
