// React imports
import { useEffect } from "react";

// Clerk
import { useUser } from "@clerk/clerk-react";

// Shadcn Imports
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

// Libs / utils
import { avatarFallback } from "@/lib/utils";

// User Store
import { useUserStore } from "@/store/useUserStore";

// Skeleton
import UsersSkeleton from "./skeletons/UsersSkeleton";

// Icons Library
import { HeadsetIcon, MusicNote03Icon, Sad02Icon, SleepingIcon } from "hugeicons-react";

export default function FriendsActivity() {
  const { fetchUsers, users, isLoading } = useUserStore();
  const { user } = useUser();
  const isPlaying = false;

  useEffect(() => {
    if (user) fetchUsers();
  }, [fetchUsers, user])

  if (!user) return <div className="w-full flex flex-col gap-y-6 px-9 mt-7">
    {/* Heading */}
    <div className="flex items-center gap-x-4 mx-auto">
      <div className="size-fit rounded-full p-2.5 border-2 border-primary animate-pulse shadow-[0px_0px_30px_2px_#EB4D7D] shadow-primary">
        <HeadsetIcon className="size-5" />
      </div>
      <h1 className="font-medium">People are listening to</h1>
    </div>

    {/* Content */}
    <div className="h-[calc(100vh-200px)] flex items-center justify-center w-full">
      <p className="text-center font-medium text-subheading">
        <span className="text-primary">Login</span> to see what people are listening
      </p>
    </div>
  </div>

  return (
    <div className="w-full flex flex-col gap-y-2 px-9 mt-7">
      {/* Heading */}
      <div className="flex items-center gap-x-3 mx-auto">
        <div className="size-fit rounded-full p-2.5 border-2 border-primary">
          <HeadsetIcon className="size-5" />
        </div>
        <h1 className="font-medium">People are listening to</h1>
      </div>

      {/* Users */}
      <div className="w-full">
        {isLoading ? (
          <div className="mt-6 flex flex-col gap-y-6 w-full">
            {Array.from({ length: 6 }).map((_, index) => (
              <UsersSkeleton key={index} />
            ))}
          </div>
        ) : users.length === 0 ? (
          <div className="h-[calc(100vh-200px)] w-full flex items-center justify-center gap-x-2.5">
            <Sad02Icon className="size-5 text-primary" />
            <h1 className="font-medium text-subheading">Oops! No users currently</h1>
          </div>
        ) : (
          <ScrollArea className="flex-1 w-full">
            {users?.map((user) => (
              <div key={user._id} className="w-full flex gap-x-3.5 items-center">
                {/* User Avatar */}
                <Avatar>
                  <AvatarImage className="size-10" src={user.imageURL} alt={user.fullName} />

                  {/* Fallback name when image doesn't load */}
                  <AvatarFallback className="font-medium">
                    {avatarFallback(user.fullName)}
                  </AvatarFallback>
                </Avatar>

                {/* User Details */}
                <div className="flex flex-col font-medium">
                  {/* User Name */}
                  <h1>{user.fullName}</h1>

                  {/* Song details */}
                  <div className="flex items-center gap-x-2 text-subheading">
                    {isPlaying ? <MusicNote03Icon className="size-4 text-primary" /> : <SleepingIcon className="size-4 text-subheading"/>}
                    <p className="text-sm">{isPlaying ? `Rahi Chauhan - Taylor Swift` : `Sleeping`}</p>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        )}
      </div>
    </div>
  )
}
