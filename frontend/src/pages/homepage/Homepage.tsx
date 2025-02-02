import { FeaturedSongs, MadeForYouSongs, Topbar, TrendingSongs } from "@/components";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@clerk/clerk-react";

export default function Homepage() {
  const { user } = useUser();

  return (
    <div className="h-screen w-full overflow-scroll">
      <Topbar />

      {user && <div className="mt-7 w-full px-9">
        <h1 className="text-xl font-semibold">Hi <span className="text-primary">{user?.firstName} !</span></h1>
        <Separator className="my-6" />
      </div>}

      <div className="font-medium flex flex-col gap-y-6 my-7 w-full px-9">
        <FeaturedSongs />
        <TrendingSongs />
        <MadeForYouSongs />
      </div>
    </div>
  )
}
