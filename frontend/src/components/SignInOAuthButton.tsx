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
    <div onClick={signInWithGoogle} className="size-fit cursor-pointer flex items-center gap-x-3 bg-tileLight lg:hover:bg-tileLight/60 rounded-xl px-6 py-3 mr-2 font-medium transition-all duration-100 ease-in-out">
      <img src="/google-icon.svg" className="size-5" />
      <p>Continue with Google </p>
    </div>
  )
}
