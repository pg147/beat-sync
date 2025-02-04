// React imports
import { useEffect } from "react";

// react-router-dom
import { Link, useLocation, useParams } from "react-router-dom"

// Icon Library
import { HeartCheckIcon, Home01Icon, LibrariesIcon } from "hugeicons-react"

// Global state store - Music
import { useMusicStore } from "@/store/useMusicStore";

// Shadcn imports
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";

// Skeletons
import PlaylistSkeleton from "./skeletons/PlaylistSkeleton";

const links = [
    {
        label: 'Home',
        icon: Home01Icon,
        link: '/'
    },
    {
        label: 'Favourites',
        icon: HeartCheckIcon,
        link: '/favourites'
    },
]

export default function LeftSideBar() {
    const { albums, isLoading, fetchAlbums } = useMusicStore();
    const path = useLocation();
    const { id } = useParams();

    useEffect(() => {
        fetchAlbums();
    }, [fetchAlbums])

    return (
        <div className="w-full flex flex-col gap-y-2 px-4 py-2">
            {/* Widget */}
            <div className="flex flex-col gap-y-1 mt-4">
                {
                    links.map((item) => (
                        <Link key={item.label} to={item.link}>
                            <div className={`cursor-pointer w-full flex items-center justify-center md:justify-normal gap-x-3.5 rounded-2xl px-3 py-3 md:px-5 md:py-3 transition-all duration-200 ease-in-out ${path.pathname === item.link ? 'bg-tile' : ''}`}>
                                <item.icon className={`size-5 ${path.pathname === item.link ? 'text-primary' : ''}`} />
                                <p className="font-medium hidden md:inline">{item.label}</p>
                            </div>
                        </Link>
                    ))
                }
            </div>

            <Separator className="w-full my-4" />

            {/* Playlists */}
            <div className="px-5">
                <div className="flex items-center w-full gap-x-3">
                    <LibrariesIcon className="size-6" />
                    <p className="font-medium hidden md:inline">Playlist</p>
                </div>

                <ScrollArea className="h-[calc(100vh-250px)] mt-6 w-full">
                    <div className="flex flex-col gap-y-4">
                        {isLoading ? (
                            Array.from({ length: 12 }).map((_, index) => (
                                <PlaylistSkeleton key={index} />
                            ))
                        ) : (
                            albums.map((album) => (
                                <Link to={`/albums/${album._id}`} key={album._id}>
                                    <div className={`flex items-center gap-x-3 rounded-2xl transition-all duration-300 ease-in-out ${id === album._id ? 'bg-tile p-3' : ''}`}>
                                        <img
                                            src={album.coverImageURL}
                                            alt={`album_${album.title}`}
                                            className="size-14 aspect-square rounded-lg flex-shrink-0 object-cover font-regular"
                                        />
                                        <div className="flex-1 min-w-0 hidden md:block">
                                            <h1 className={`font-medium truncate ${id === album._id ? 'text-primary' : ''}`}>{album.title}</h1>
                                            <p className="font-medium text-sm text-subheading">Album • {album.artist}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}
