import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { config } from "dotenv";

config({
    path: './.env.local'
});

const songs = [
	{
		title: "Stay With Me",
		artist: "Sarah Mitchell",
		coverImageURL: "/cover-images/1.jpg",
		audioURL: "/songs/1.mp3",
		duration: 46, // 0:46
	},
	{
		title: "Midnight Drive",
		artist: "The Wanderers",
		coverImageURL: "/cover-images/2.jpg",
		audioURL: "/songs/2.mp3",
		duration: 41, // 0:41
	},
	{
		title: "Lost in Tokyo",
		artist: "Electric Dreams",
		coverImageURL: "/cover-images/3.jpg",
		audioURL: "/songs/3.mp3",
		duration: 24, // 0:24
	},
	{
		title: "Summer Daze",
		artist: "Coastal Kids",
		coverImageURL: "/cover-images/4.jpg",
		audioURL: "/songs/4.mp3",
		duration: 24, // 0:24
	},
	{
		title: "Neon Lights",
		artist: "Night Runners",
		coverImageURL: "/cover-images/5.jpg",
		audioURL: "/songs/5.mp3",
		duration: 36, // 0:36
	},
	{
		title: "Mountain High",
		artist: "The Wild Ones",
		coverImageURL: "/cover-images/6.jpg",
		audioURL: "/songs/6.mp3",
		duration: 40, // 0:40
	},
	{
		title: "City Rain",
		artist: "Urban Echo",
		coverImageURL: "/cover-images/7.jpg",
		audioURL: "/songs/7.mp3",
		duration: 39, // 0:39
	},
	{
		title: "Desert Wind",
		artist: "Sahara Sons",
		coverImageURL: "/cover-images/8.jpg",
		audioURL: "/songs/8.mp3",
		duration: 28, // 0:28
	},
	{
		title: "Ocean Waves",
		artist: "Coastal Drift",
		coverImageURL: "/cover-images/9.jpg",
		audioURL: "/songs/9.mp3",
		duration: 28, // 0:28
	},
	{
		title: "Starlight",
		artist: "Luna Bay",
		coverImageURL: "/cover-images/10.jpg",
		audioURL: "/songs/10.mp3",
		duration: 30, // 0:30
	},
	{
		title: "Winter Dreams",
		artist: "Arctic Pulse",
		coverImageURL: "/cover-images/11.jpg",
		audioURL: "/songs/11.mp3",
		duration: 29, // 0:29
	},
	{
		title: "Purple Sunset",
		artist: "Dream Valley",
		coverImageURL: "/cover-images/12.jpg",
		audioURL: "/songs/12.mp3",
		duration: 17, // 0:17
	},
	{
		title: "Neon Dreams",
		artist: "Cyber Pulse",
		coverImageURL: "/cover-images/13.jpg",
		audioURL: "/songs/13.mp3",
		duration: 39, // 0:39
	},
	{
		title: "Moonlight Dance",
		artist: "Silver Shadows",
		coverImageURL: "/cover-images/14.jpg",
		audioURL: "/songs/14.mp3",
		duration: 27, // 0:27
	},
	{
		title: "Urban Jungle",
		artist: "City Lights",
		coverImageURL: "/cover-images/15.jpg",
		audioURL: "/songs/15.mp3",
		duration: 36, // 0:36
	},
	{
		title: "Crystal Rain",
		artist: "Echo Valley",
		coverImageURL: "/cover-images/16.jpg",
		audioURL: "/songs/16.mp3",
		duration: 39, // 0:39
	},
	{
		title: "Neon Tokyo",
		artist: "Future Pulse",
		coverImageURL: "/cover-images/17.jpg",
		audioURL: "/songs/17.mp3",
		duration: 39, // 0:39
	},
	{
		title: "Midnight Blues",
		artist: "Jazz Cats",
		coverImageURL: "/cover-images/18.jpg",
		audioURL: "/songs/18.mp3",
		duration: 29, // 0:29
	},
];

const seedSongs = async () => {
	try {
		await mongoose.connect(`${process.env.MONGODB_URI}`);

		// Clear existing songs
		await Song.deleteMany({});

		// Insert new songs
		await Song.insertMany(songs);

		console.log("Songs seeded successfully!");
	} catch (error) {
		console.error("Error seeding songs:", error);
	} finally {
		mongoose.connection.close();
	}
};

seedSongs();