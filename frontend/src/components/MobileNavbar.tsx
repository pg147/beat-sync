import Brand from "@/shared/Brand";
import MobileSideMenu from "./MobileSideMenu";
import SignInOAuthButton from "./SignInOAuthButton";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

export default function MobileNavbar() {
  return (
    <header>
      <div className="h-16 w-full flex items-center justify-between px-5 bg-tile">
        <MobileSideMenu />

        <Brand />

        <SignedIn>
          <UserButton />
        </SignedIn>

        <SignedOut>
          <SignInOAuthButton />
        </SignedOut>
      </div>
    </header>
  )
}
