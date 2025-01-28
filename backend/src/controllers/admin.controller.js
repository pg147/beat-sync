import { uploadSongAudio, uploadSongCoverImage } from "../lib/cloudinary.js";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";

const createSong = async (req, res, next) => {
    const { title, artist, duration, albumId } = req.body;
    const audioLocalPath = req.files?.audio[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!audioLocalPath || !coverImageLocalPath) {
        return res.status(400).json({
            success: false,
            message: "Both audio file and cover image for song is required!"
        });
    }

    const audio = audioLocalPath ? await uploadSongAudio(audioLocalPath) : null;
    const coverImage = coverImageLocalPath ? await uploadSongCoverImage(coverImageLocalPath) : null;

    try {
        const song = await Song.create({
            title,
            artist,
            duration,
            albumId: albumId || "",
            coverImageURL: coverImage?.url || "",
            audioURL: audio?.url || ""
        });

        if (!song) return res.status(400).json({
            success: false,
            message: "Error creating song!"
        });

        if (albumId) {
            await Album.findByIdAndUpdate(albumId, {
                $push: { songs: song._id }
            });
        }

        return res.status(201).json({
            success: true,
            message: "Successfully created a song!",
            song: createSong
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export { createSong };