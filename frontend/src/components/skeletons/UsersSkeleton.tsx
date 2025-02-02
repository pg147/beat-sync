import { Skeleton } from "../ui/skeleton";

export default function UsersSkeleton() {
    return (
        <div className="flex w-full items-center gap-x-4">
            <Skeleton className="size-14 aspect-square rounded-full bg-tile"></Skeleton>
            <div className="flex flex-col w-full gap-y-2">
                <Skeleton className="h-3 w-16 bg-tile"></Skeleton>
                <Skeleton className="h-6 w-full bg-tile"></Skeleton>
            </div>
        </div>
    )
}
