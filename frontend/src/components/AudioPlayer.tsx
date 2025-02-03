import { usePlayerStore } from "@/store/usePlayerStore"
import { useEffect, useRef } from "react";

export default function AudioPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const prevAudioRef = useRef<string | null>(null);

    const { currentSong, isPlaying, playNext } = usePlayerStore();

    // To handle play and pause
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const playAudio = async () => {
            if (isPlaying) {
                try {
                    await audio.play();
                } catch (error: any) {
                    if (error.name !== "AbortError") {
                        console.error("Playback error:", error);
                    }
                }
            } else {
                audio.pause();
            }
        }

        playAudio();
    }, [isPlaying]);

    // To handle audio end functionality
    useEffect(() => {
        const audio = audioRef?.current;  // fetching audio using ref

        // Event handler
        const handleAudioEnd = () => playNext();

        // Listening to end event for an audio
        audio?.addEventListener("ended", handleAudioEnd);

        // Cleanup
        return () => audio?.removeEventListener("ended", handleAudioEnd);
    }, [playNext]);

    useEffect(() => {
        if (!audioRef.current || !currentSong) return;
        const audio = audioRef?.current;

        // If source for previous audio doesn't match current audio's url therefore song has changed
        const isSongChanged = prevAudioRef?.current !== currentSong?.audioURL;

        if (isSongChanged) {
            audio.src = currentSong?.audioURL;   // setting current audio's src
            audio.currentTime = 0;   // resetting the duration

            prevAudioRef.current = currentSong?.audioURL;   // setting prevAudioRef with current audio URL
            if (isPlaying) audio?.play();  // finally playing if isPlaying is true
        }
    }, [currentSong, isPlaying]);

    return (
        <audio ref={audioRef} />
    )
}
