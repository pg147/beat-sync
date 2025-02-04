// React
import { useEffect, useRef, useState } from "react";

// Shadcn Components
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";

// Utils
import { cn, formatDuration } from "@/lib/utils";

// Global State
import { usePlayerStore } from "@/store/usePlayerStore"

// Icons Library
import { Next, Previous, RepeateMusic, Shuffle } from "iconsax-react";
import { Airplay, ListMusic, MicVocal, Pause, PlayIcon, Volume1 } from "lucide-react";

export default function PlaybackControls() {
    const { isPlaying, currentSong, playNext, playPrevious, togglePlay } = usePlayerStore();

    const [volume, setVolume] = useState(75);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = document.querySelector("audio");
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", updateDuration);

        const handleEnded = () => {
            usePlayerStore.setState({ isPlaying: false });
        }

        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", updateDuration);
            audio.removeEventListener("ended", handleEnded);
        }
    }, [currentSong]);

    const handleSeek = (value: number[]) => {
        if (audioRef.current) {
            console.log(audioRef);
            audioRef.current.currentTime = value[0];
        }
    }

    return (
        <footer className="w-full bg-tile/70 py-4 px-4 md:px-10">
            <div className="flex justify-between items-center h-full sm:w-full lg:max-w-[1800px] mx-auto">
                {/* For Mobile View */}
                {(window.innerWidth < 768 && currentSong) && <>
                    {/* Song details */}
                    <div className="flex items-center gap-x-3 w-[30%]">
                        <img src={currentSong?.coverImageURL} alt={currentSong?.title} className="size-20 md:size-16 rounded-xl" />
                        <div className="hidden md:flex flex-col">
                            <h1 className="font-medium">{currentSong?.title}</h1>
                            <p className="text-subheading font-medium">{currentSong?.artist}</p>
                        </div>
                    </div>
                </>}

                {/* For Web view */}
                {/* Song details */}
                {window.innerWidth > 768 && <div className="flex items-center gap-x-3 w-[30%]">
                    {currentSong && <>
                        <img src={currentSong?.coverImageURL} alt={currentSong?.title} className="size-20 md:size-16 rounded-xl" />
                        <div className="hidden md:flex flex-col">
                            <h1 className="font-medium">{currentSong?.title}</h1>
                            <p className="text-subheading font-medium">{currentSong?.artist}</p>
                        </div>
                    </>}
                </div>}

                {/* Control Bar */}
                <div className="flex flex-col gap-y-2 items-center flex-1 max-w-full sm:w-[45%]">
                    {/* Controls */}
                    <div className="flex items-center gap-x-3 md:gap-x-6">
                        <Button
                            disabled={!currentSong}
                            className="size-fit rounded-full p-3 bg-transparent sm:focus:bg-transparent lg:hover:bg-tileLight"
                        >
                            <Shuffle className="h-5 w-5" />
                        </Button>
                        <Button
                            onClick={playPrevious}
                            disabled={!currentSong}
                            className="size-fit rounded-full p-3 bg-transparent sm:focus:bg-transparent lg:hover:bg-tileLight"
                        >
                            <Previous className="h-5 w-5" />
                        </Button>
                        <Button
                            onClick={togglePlay}
                            disabled={!currentSong}
                            className="size-fit rounded-full p-3 bg-primary"
                        >
                            {isPlaying ? <Pause className="size-4" fill="#FFFFFF" /> : <PlayIcon className="size-4" fill="#FFFFFF" />}
                        </Button>
                        <Button
                            onClick={playNext}
                            disabled={!currentSong}
                            className="size-fit rounded-full p-3 bg-transparent sm:focus:bg-transparent lg:hover:bg-tileLight"
                        >
                            <Next className="h-5 w-5" />
                        </Button>
                        <Button
                            disabled={!currentSong}
                            className="size-fit rounded-full p-3 bg-transparent sm:focus:bg-transparent lg:hover:bg-tileLight"
                        >
                            <RepeateMusic className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Seek Bar */}
                    <div className="flex items-center gap-x-2 font-medium w-full">
                        <h1 className="text-sm md:text-base">{formatDuration(currentTime)}</h1>
                        <Slider
                            value={[currentTime]}
                            max={duration || 30}
                            step={1}
                            className="w-full lg:hover:cursor-grab lg:active:cursor-grabbing"
                            onValueChange={handleSeek}
                        />
                        <h1 className="text-sm md:text-base">{formatDuration(currentSong?.duration || 30)}</h1>
                    </div>
                </div>

                <div className="w-[30%] hidden md:flex gap-x-3 items-center justify-center">
                    <Button className="size-fit rounded-full p-3 bg-transparent lg:hover:bg-tileLight">
                        <MicVocal strokeWidth={1.75} className="size-5" />
                    </Button>
                    <Button className="size-fit rounded-full p-3 bg-transparent lg:hover:bg-tileLight">
                        <ListMusic strokeWidth={1.75} className="size-5" />
                    </Button>
                    <Button className="size-fit rounded-full p-3 bg-transparent lg:hover:bg-tileLight">
                        <Airplay strokeWidth={1.75} className="size-5" />
                    </Button>
                    <div className="flex items-center gap-x-1">
                        <div className="size-fit rounded-full p-3">
                            <Volume1 strokeWidth={1.75} className="size-5 text-primary" />
                        </div>
                        <Slider
                            value={[volume]}
                            max={100}
                            step={1}
                            onValueChange={(value) => {
                                setVolume(value[0]);
                                if (audioRef.current) {
                                    audioRef.current.volume = value[0] / 100;
                                }
                            }}
                            className={cn("w-24", "lg:hover:cursor-grab lg:active:cursor-grabbing")}
                        />
                    </div>
                </div>
            </div>
        </footer >
    )
}
