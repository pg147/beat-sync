// React
import { useEffect } from "react";

// Components
import { FeaturedSongs, MadeForYouSongs, Topbar, TrendingSongs } from "@/components";

// Shadcn components
import { Separator } from "@/components/ui/separator";

// Global Store
import { useMusicStore } from "@/store/useMusicStore";
import { usePlayerStore } from "@/store/usePlayerStore";

// Clerk Imports
import { useUser } from "@clerk/clerk-react";

export default function Homepage() {
  const { user } = useUser();
  const { initializeQueue } = usePlayerStore();
  const { featuredSongs, madeForYouSongs, trendingSongs } = useMusicStore();
  
  useEffect(() => {
    if (featuredSongs.length > 0 || madeForYouSongs.length > 0 || trendingSongs.length > 0) {
      const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
      initializeQueue(allSongs);
    }
  }, [featuredSongs, initializeQueue, madeForYouSongs, trendingSongs])

  return (
    <div className="h-screen w-full overflow-scroll">
      <Topbar />

      {user && <div className="mt-7 w-full px-9">
        <h1 className="text-xl font-semibold">Hi <span className="text-primary">{user?.firstName} !</span></h1>
        <Separator className="my-6" />
      </div>}

      <div className="font-medium flex flex-col gap-y-6 mt-7 mb-36 w-full px-9">
        <FeaturedSongs />
        <TrendingSongs />
        <MadeForYouSongs />
      </div>
    </div>
  )
}
