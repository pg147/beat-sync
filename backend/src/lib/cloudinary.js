import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const cloudinary = cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadSongAudio = async (audioPath) => {
    try {
        const audio = cloudinary.uploader.upload(audioPath, {
            resource_type: "audio"
        });

        if (!audio) return false;

        fs.unlinkSync(audioPath);  // remove local audio file after successful upload
        return audio;
    } catch (error) {
        console.log(error);
    }
}

const uploadCoverImage = async (coverImagePath) => {
    try {
        const coverImage = await cloudinary.uploader.upload(coverImagePath, {
            resource_type: "image"
        });

        if (!coverImage) return false;

        fs.unlinkSync(coverImagePath);  // remove local image file after successful upload
        return coverImage;
    } catch (error) {
        console.log(error);
    }
}

const deleteSongWithCover = async (audioLink, coverImageLink) => {
    try {
        const deleteAudio = await cloudinary.uploader.destroy(audioLink, {
            resource_type: "audio"
        });

        if (deleteAudio) {
            await cloudinary.uploader.destroy(coverImageLink, {
                resource_type: "video"
            });

            return true;
        }

        return false;
    } catch (error) {
        console.error(error);
    }
}

export { uploadSongAudio, uploadCoverImage, deleteSongWithCover };