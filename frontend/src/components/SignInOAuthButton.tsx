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
    <div onClick={signInWithGoogle} className="flex items-center gap-x-3 bg-tile rounded-xl p-4 font-medium transition-all duration-100 ease-in-out">
      <img src="/google-icon.svg" className="size-5" />
      <p>Continue with Google </p>
    </div>
  )
}
