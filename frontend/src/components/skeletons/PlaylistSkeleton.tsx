import { Skeleton } from "../ui/skeleton";

export default function PlaylistSkeleton() {
    return (
        <div className="flex w-full items-center gap-x-2">
            <Skeleton className="size-14 aspect-square bg-tile"></Skeleton>
            <div className="flex flex-col w-full gap-y-2">
                <Skeleton className="h-3 w-full bg-tile"></Skeleton>
                <Skeleton className="h-8 w-full bg-tile"></Skeleton>
            </div>
        </div>
    )
}
