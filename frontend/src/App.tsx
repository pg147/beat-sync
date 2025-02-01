import { Route, Routes } from "react-router-dom";
import { Album, AuthCallback, Homepage, Favourites } from "./pages";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layouts/MainLayout";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />} />
        <Route path="/auth-callback" element={<AuthCallback />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/albums/:id" element={<Album />} />
        </Route>
      </Routes>
    </>
  )
}
