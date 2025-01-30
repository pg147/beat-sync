import { Router } from "express";

// Controllers
import { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs } from "../controllers/songs.controller.js";

// Middlewares
import { protectRoute, requireAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/', protectRoute, requireAdmin, getAllSongs);
router.get('/made-for-you', getMadeForYouSongs);
router.get('/featured-songs', getFeaturedSongs);
router.get('/trending', getTrendingSongs);

export default router;