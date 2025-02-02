// React-router-dom
import { Link } from "react-router-dom";

// Components
import SignInOAuthButton from "./SignInOAuthButton";

// Auth Store
import { useAuthStore } from "@/store/useAuthStore";

// Clerk 
import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";

// Shared imports
import Brand from "@/shared/Brand";

// Icons Library 
import { DashboardSquare03Icon, Logout02Icon } from "hugeicons-react";

export default function Topbar() {
    const { isAdmin } = useAuthStore();

    return (
        <div className="sticky top-0 z-[10] flex bg-tile backdrop-blur-lg items-center justify-between pl-6 pr-2.5 py-2.5">
            <Brand />

            <div className="size-fit flex items-center gap-x-2.5">
                {isAdmin && <Link to={'/admin'}>
                    <div className="flex items-center gap-x-3 rounded-xl px-6 py-3 font-medium bg-tileLight lg:hover:bg-tileLight/60 cursor-pointer transition-all duration-100 ease-in-out">
                        <DashboardSquare03Icon className="size-5 text-subheading" />
                        <p>Admin Dashboard</p>
                    </div>
                </Link>}
                <SignedIn>
                    <SignOutButton>
                        <div className="cursor-pointer flex items-center gap-x-3 p-2 font-medium size-fit bg-tileLight lg:hover:bg-tileLight/60 rounded-xl px-6 py-3 transition-all duration-100 ease-in-out">
                            <Logout02Icon className="size-5 text-primary" />
                            <span>Sign out</span>
                        </div>
                    </SignOutButton>
                </SignedIn>
                <SignedOut>
                    <SignInOAuthButton />
                </SignedOut>
            </div>
        </div>
    )
}
