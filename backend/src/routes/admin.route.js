import { Router } from "express";

// Controllers
import { createSong } from "../controllers/admin.controller.js";

// Middlewares
import upload from "../middlewares/multer.middleware.js";
import { protectRoute, requireAdmin } from "../middlewares/auth.middleware";

const router = Router();  // admin router

// Secure Routes
router.post('/song/add', protectRoute, requireAdmin, upload.fields([
    {
        name: 'audio',
        maxCount: 1
    },
    {
        name: 'coverImage',
        maxCount: 1
    }
]), createSong);  // for creating a song

export default router;