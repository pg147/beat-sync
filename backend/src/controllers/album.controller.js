import { Album } from "../models/album.model.js";

const getAllAlbums = async (_, res, next) => {
    try {
        const albums = await Album.find();  // fetching all albums

        // If no albums found
        if (!albums) return res.status(400).json({
            success: false,
            message: "No albums found."
        });

        // If albums found
        return res.status(200).json({
            success: true,
            albums
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getAlbum = async (req, res, next) => {
    const { id: albumId } = req.params;  // fetching album id from params
 
    try {
        // Finding the album and populating it with songs
        const album = await Album.findById({ _id: albumId }).populate("songs");  

        // If album not found
        if (!album) return res.status(404).json({
            success: false,
            message: "Album not found!"
        });

        // If album is found
        return res.status(200).json({
            success: true,
            album
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export { getAllAlbums, getAlbum };