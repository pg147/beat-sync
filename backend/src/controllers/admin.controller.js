import { uploadSongAudio, uploadSongCoverImage } from "../lib/cloudinary.js";
import { Song } from "../models/song.model.js";

const createSong = async (req, res) => {
    const { title, artist, duration } = req.body;
    const audioLocalPath = req.files?.audio[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!audioLocalPath) {
        return res.status(400).json({
            success: false,
            message: "Audio file for song is required!"
        })
    } else if (!coverImageLocalPath) {
        return res.status(400).json({
            success: false,
            message: "Cover image for song is required!"
        });
    }

    const audio = audioLocalPath ? await uploadSongAudio(audioLocalPath) : null;
    const coverImage = coverImageLocalPath ? await uploadSongCoverImage(coverImageLocalPath) : null;

    try {
        const createSong = await Song.create({
            title,
            artist,
            duration,
            coverImageURL: coverImage?.url || "",
            audioURL: audio?.url || ""
        });

        if (!createSong) return res.status(400).json({
            success: false,
            message: "Error creating song!"
        });

        return res.status(201).json({
            success: true,
            message: "Successfully created a song!",
            song: createSong 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error!",
        });
    }
};

export { createSong };