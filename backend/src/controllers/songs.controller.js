import { Song } from "../models/song.model.js";

const getAllSongs = async (req, res, next) => {
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

export { getAllSongs };  