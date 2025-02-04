import { useSignIn } from "@clerk/clerk-react"

export default function SignInOAuthButton() {
  const { signIn, isLoaded } = useSignIn();

  if (!isLoaded) return null;

  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: '/auth-callback'
    })
  }

  return (
    <div onClick={signInWithGoogle} className="size-fit cursor-pointer md:flex items-center gap-x-3 bg-tileLight lg:hover:bg-tileLight/60 rounded-xl px-2 py-2 md:px-6 md:py-3 font-medium transition-all duration-100 ease-in-out">
      <img src="/google-icon.svg" className="size-5" />
      <p className="hidden md:inline">Continue with Google </p>
    </div>
  )
}
