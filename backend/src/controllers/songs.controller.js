import { Song } from "../models/song.model.js";

const getAllSongs = async (_, res, next) => {
    try {
        // -1 suggests the newest song would be at top and so on. ( ASCENDING => newest -> oldest )
        const songs = await Song.find().sort({ createdAt: -1 });

        // If no songs found
        if (!songs) return res.status(404).json({
            success: false,
            message: "No songs were found!"
        });

        // If songs found
        return res.status(200).json({
            success: true,
            songs
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const getFeaturedSongs = async (_, res, next) => {
    try {
        // Fetching 6 random songs using aggregation pipelines
        const featuredSongs = await Song.aggregate([
            {
                $sample: { size: 6 }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    audioURL: 1,
                    coverImageURL: 1
                }
            }
        ]);

        if (!featuredSongs) return res.status(400).json({
            success: false,
            message: "No featured songs found!"
        });

        return res.status(200).json({
            success: true,
            featuredSongs
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getMadeForYouSongs = async (_, res, next) => {
    try {
        // Fetching 6 random songs using aggregation pipelines
        const madeForYouSongs = await Song.aggregate([
            {
                $sample: { size: 4 }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    audioURL: 1,
                    coverImageURL: 1
                }
            }
        ]);

        if (!madeForYouSongs) return res.status(400).json({
            success: false,
            message: "No songs found!"
        });

        return res.status(200).json({
            success: true,
            madeForYouSongs
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getTrendingSongs = async (_, res, next) => {
    try {
        // Fetching 6 random songs using aggregation pipelines
        const trendingSongs = await Song.aggregate([
            {
                $sample: { size: 4 }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    audioURL: 1,
                    coverImageURL: 1
                }
            }
        ]);

        if (!trendingSongs) return res.status(400).json({
            success: false,
            message: "No songs found!"
        });

        return res.status(200).json({
            success: true,
            trendingSongs
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs };  