import Brand from "@/shared/Brand";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import { DashboardSquare03Icon, Logout02Icon } from "hugeicons-react";
import { Link } from "react-router-dom";
import SignInOAuthButton from "./SignInOAuthButton";

export default function Topbar() {
    const isAdmin = false;

    return (
        <div className="sticky top-0 flex bg-tile backdrop-blur-lg items-center justify-between">
            <Brand />

            {isAdmin && <Link to={'/admin'}>
                <div className="flex items-center gap-x-3 bg-tile rounded-xl p-4 font-medium cursor-pointer transition-all duration-100 ease-in-out lg:hover:scale-[1.05]">
                    <DashboardSquare03Icon className="size-5 text-subheading" />
                    <p>Admin Dashboard</p>
                </div>
            </Link>}
            <SignedIn>
                <SignOutButton>
                    <div className="cursor-pointer flex items-center gap-x-3 h-fit w-fit p-2 font-medium">
                        <Logout02Icon className="size-5 text-primary" />
                        <span>Sign out</span>
                    </div>
                </SignOutButton>
            </SignedIn>
            <SignedOut>
                <SignInOAuthButton />
            </SignedOut>
        </div>
    )
}
