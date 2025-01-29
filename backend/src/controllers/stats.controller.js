import { User } from "../models/user.model.js";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";

const getAllStats = async (_, res, next) => {
    try {
        const [totalUsers, totalSongs, totalAlbums, uniqueArtists] = await Promise.all([
            User.countDocuments(),
            Song.countDocuments(),
            Album.countDocuments(),

            Song.aggregate([
                {
                    $unionWith: "albums",
                    pipeline: []
                },
                {
                    $group: {
                        _id: "$artist"
                    },
                },
                {
                    $count: "count"
                }
            ])
        ])

        return res.status(200).json({
            totalUsers,
            totalSongs,
            totalAlbums,
            totalArtists: uniqueArtists[0]?.count || ""
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
}

export { getAllStats };