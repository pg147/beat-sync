import { Skeleton } from "../ui/skeleton";

export default function AlbumSkeleton() {
    return (
        <div className="h-screen w-full p-10">
            <div className="flex items-end gap-x-6">
                <Skeleton className="size-28 aspect-square bg-tile" />
                <div className="flex flex-col gap-y-3">
                    <Skeleton className="h-4 w-24 bg-tile" />
                    <Skeleton className="h-10 w-48 bg-tile" />
                    <Skeleton className="h-4 w-24 bg-tile" />
                </div>
            </div>

            <div className="flex flex-col gap-y-6 mt-14">
                {Array.from({ length: 7 }).map((_, index) => (
                    <div key={index} className="grid grid-cols-8 gap-x-8 w-full items-center justify-around">
                        <div className="col-span-4 flex gap-x-3 items-center">
                            <Skeleton className="size-16 aspect-square bg-tile" />
                            <div className="flex flex-col gap-y-2 w-full">
                                <Skeleton className="h-4 w-full bg-tile" />
                                <Skeleton className="h-4 w-full bg-tile" />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div className="flex flex-col gap-y-2 w-full">
                                <Skeleton className="h-4 w-full bg-tile" />
                                <Skeleton className="h-4 w-full bg-tile" />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div className="flex flex-col gap-y-2 w-full">
                                <Skeleton className="h-4 w-full bg-tile" />
                                <Skeleton className="h-4 w-full bg-tile" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
