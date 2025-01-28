// Data Models
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";

// Cloudinary Functions
import { deleteSongWithCover, uploadSongAudio, uploadCoverImage } from "../lib/cloudinary.js";

const createSong = async (req, res, next) => {
    const { title, artist, duration, albumId } = req.body;

    // Fetching Local paths for files 
    const audioLocalPath = req.files?.audio[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    // If local paths were not created / or files were not provided by the user
    if (!audioLocalPath || !coverImageLocalPath) {
        return res.status(400).json({
            success: false,
            message: "Both audio file and cover image for song is required!"
        });
    }

    // Uploading on Cloudinary if local paths exist
    const audio = audioLocalPath ? await uploadSongAudio(audioLocalPath) : null;
    const coverImage = coverImageLocalPath ? await uploadCoverImage(coverImageLocalPath) : null;

    try {
        const song = await Song.create({
            title,
            artist,
            duration,
            albumId: albumId || "",
            coverImageURL: coverImage?.url || "",
            audioURL: audio?.url || ""
        });

        // If song wasn't created successfully
        if (!song) return res.status(400).json({
            success: false,
            message: "Error creating song!"
        });

        // checking if the song belongs to an Album
        if (albumId) {
            await Album.findByIdAndUpdate(albumId, {
                $push: { songs: song._id }  // pushing the song into the album array
            });
        }

        // If song was created successfully in the DB
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

const deleteSong = async (req, res, next) => {
    const { id: songId } = req.params;  // fetching id from params

    if (!songId) return res.status(404).json({
        success: false,
        message: "Song not found!"
    });

    try {
        const song = await Song.findById({ _id: songId });  // fetching song from the collection

        // If song wasn't found in the database at songs collection
        if (!song) return res.status(404).json({
            success: false,
            message: "Song not found!"
        });

        // Deleting song and its cover image from Cloudinary
        const deleteFromCloudinary = await deleteSongWithCover(song.audioURL, song.coverImageURL);

        // If song is deleted from Cloudinary
        if (deleteFromCloudinary) {

            // Checking if this song belongs to an album
            if (song.albumId) {
                await Album.findByIdAndUpdate(song.albumId, {
                    $pull: { songs: song._id }
                });  // deleting from the album array
            }

            // Deleting song from the songs collection
            const deleteSong = await Song.findByIdAndDelete({ _id: songId });

            // If song deletion wasn't successful
            if (!deleteSong) return res.status(400).json({
                success: false,
                message: "Error deleting song."
            });

            // If song deleted successfully
            return res.status(200).json({
                success: true,
                message: "Song deleted successfully!"
            });
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const createAlbum = async (req, res, next) => {
    const { title, artist, releaseYear } = req.body;

    // Fetching Local path for cover image 
    const coverImageLocalPath = req.file?.coverImage;

    // If cover image wasn't provided
    if (!coverImageLocalPath) return res.status(400).json({
        success: false,
        message: "Cover Image is required!"
    });

    // Uploading cover image on Cloudinary
    const coverImage = coverImageLocalPath ? await uploadCoverImage(coverImageLocalPath) : null;

    try {
        const album = await Album.create({
            title,
            artist,
            releaseYear,
            coverImageURL: coverImage?.url || ""
        });

        // If album wasn't created successfully
        if (!album) return res.status(400).json({
            success: false,
            message: "Error creating album!"
        });

        // If album created successfully 
        return res.status(201).json({
            success: true,
            message: "Album created successfully",
            album
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export { createSong, deleteSong, createAlbum };