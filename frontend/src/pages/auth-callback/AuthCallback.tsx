// React imports
import { useEffect } from "react"

// React router dom
import { useNavigate } from "react-router-dom";

// Clerk 
import { useUser } from "@clerk/clerk-react";

// Axios 
import axiosInstance from "@/lib/axios";

// Shared imports
import { Loader2 } from "lucide-react"

export default function AuthCallback() {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const syncUser = async () => {
      try {
        if (!isLoaded || !user) return;
        await axiosInstance.post('/users/auth-callback', {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl
        });

      } catch (error: any) {
        console.error("Error syncing user : ", error.message);
      } finally {
        navigate('/');
      }
    }

    syncUser();
  }, [isLoaded, navigate, user]);

  return (
    <div className="h-screen w-full flex items-center justify-center px-5">
      <div className="h-fit w-full md:w-[40%] lg:w-1/4 p-6 bg-black rounded-3xl flex flex-col gap-y-3 items-center justify-center">
        <div className="h-fit w-fit flex items-center gap-x-3">
          <Loader2 className="size-5 md:size-6 animate-spin text-primary" />
          <p className="font-medium text-base md:text-lg">Signing you in</p>
        </div>
        <p className="text-subheading text-sm font-medium text-center">Get ready to experience some music!</p>
      </div>
    </div>
  )
}
