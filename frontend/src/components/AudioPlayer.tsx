import { usePlayerStore } from "@/store/usePlayerStore"
import { useEffect, useRef, useState } from "react";

export default function AudioPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const prevAudioRef = useRef<string | null>(null);
    const [isAudioReady, setIsAudioReady] = useState(false);
    
    const { currentSong, isPlaying, playNext } = usePlayerStore();

    // To handle play and pause
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const playAudio = async () => {
            if (isPlaying && isAudioReady) {
                try {
                    await audio.play();
                } catch (error) {
                    if (error instanceof Error && error.name !== "AbortError") {
                        console.error("Playback error:", error);
                    }
                }
            } else {
                audio.pause();
            }
        };

        playAudio();
    }, [isPlaying, isAudioReady]);

    // To handle audio end functionality
    useEffect(() => {
        const audio = audioRef?.current;

        const handleAudioEnd = () => playNext();

        audio?.addEventListener("ended", handleAudioEnd);

        return () => audio?.removeEventListener("ended", handleAudioEnd);
    }, [playNext]);

    useEffect(() => {
        if (!audioRef.current || !currentSong) return;
        const audio = audioRef?.current;

        const isSongChanged = prevAudioRef?.current !== currentSong?.audioURL;

        if (isSongChanged && currentSong?.audioURL) {
            setIsAudioReady(false);
            audio.src = currentSong.audioURL;
            audio.currentTime = 0;
            prevAudioRef.current = currentSong.audioURL;

            const canPlayThroughHandler = () => {
                setIsAudioReady(true);
            };

            audio.addEventListener('canplaythrough', canPlayThroughHandler);

            return () => {
                audio.removeEventListener('canplaythrough', canPlayThroughHandler);
            };
        }
    }, [currentSong]);

    return (
        <audio ref={audioRef}>
            <source src={currentSong?.audioURL} type="audio/*" />
        </audio>
    )
}
