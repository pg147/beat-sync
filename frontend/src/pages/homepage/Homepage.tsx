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
      {window.innerWidth > 768 && <Topbar />}

      {user && <div className="mt-5 md:mt-7 w-full md:px-9 px-5">
        <h1 className="text-lg md:text-xl font-semibold">Hi <span className="text-primary">{user?.firstName} !</span></h1>
        <Separator className="my-3 md:my-6" />
      </div>}

      <div className={`font-medium flex flex-col gap-y-4 md:gap-y-6 mt-5 w-full md:px-9 px-5 md:mt-7 mb-48 md:mb-36`}>
        <FeaturedSongs />
        <TrendingSongs />
        <MadeForYouSongs />
      </div>
    </div>
  )
}
