import { Link } from "react-router-dom";

export default function Brand() {
  return (
    <Link to={'/'} className="size-fit flex items-center gap-x-2">
        <img src="/logo.png" alt="logo" className="size-7 md:size-8" />
        <h1 className="text-lg md:text-xl font-semibold">Beat<span className="text-primary">.sync</span></h1>
    </Link>
  )
}
