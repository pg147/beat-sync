import { usePlayerStore } from '@/store/usePlayerStore'
import { Button } from './ui/button'
import { Song } from '@/types';
import { Pause, Play } from 'lucide-react';

export default function PlayButton({ song }: { song: Song | null }) {
    const { isPlaying, currentSong, togglePlay, setCurrentSong } = usePlayerStore();
    const isCurrentSong = currentSong?._id === song?._id;
    
    const handlePlayButton = () => {
        if (isCurrentSong) togglePlay();
        else setCurrentSong(song);
    }

    return (
        <Button onClick={handlePlayButton} className={`size-fit rounded-full bg-primary p-3 transition-all duration-300 ease-in-out hidden ${isCurrentSong ? 'block' : 'lg:group-hover:block'}`}>
            {isPlaying && isCurrentSong ? <Pause className="size-4" fill="#FFFFFF" /> : <Play className="size-4" fill="#FFFFFF" />}
        </Button>
    )
}
