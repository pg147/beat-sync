import { InLoveIcon } from "hugeicons-react";

export default function Favourites() {
  return (
    <div className="h-[calc(100vh-200px)] md:h-screen w-full flex items-center justify-center">
      <div className="flex items-center gap-x-3.5">
        <InLoveIcon className="size-6 md:size-8 text-primary" />
        <h1 className="font-medium text-subheading">This feature will roll out soon!</h1>
      </div>
    </div>
  )
}
