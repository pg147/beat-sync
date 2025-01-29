import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="h-screen w-full flex justify-center items-center pointer-events-none">
        <Loader2 className="size-8 md:size-10 animate-spin" />
    </div>
  )
}
