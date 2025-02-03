import { Skeleton } from "../ui/skeleton";

export default function SongsSkeleton() {
    return (
        <div className="flex flex-col gap-y-4 pointer-events-none">
            <h1 className="font-semibold text-xl">Featured Songs</h1>
            <div className="w-full">
                <div className="flex w-max gap-x-5">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className={`flex flex-col gap-y-2.5 rounded-xl`}>
                            <Skeleton className="size-56 aspect-square object-cover rounded-xl bg-tile" />
                            <div className={`flex items-center w-full justify-between`}>
                                <div className="flex flex-col gap-y-2 font-medium w-full">
                                    <Skeleton className="h-3 w-1/4 bg-tile"/>
                                    <Skeleton className="h-4 w-full bg-tile"/>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
