import { Router } from "express";

// Controllers
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from "../controllers/admin.controller.js";

// Middlewares
import upload from "../middlewares/multer.middleware.js";
import { protectRoute, requireAdmin } from "../middlewares/auth.middleware";

const router = Router();  // admin router

// Shared middleware that would be followed by each route to check auth and admin status
router.use(protectRoute, requireAdmin);  

// Routes
router.get('/check', checkAdmin);  // for returning a boolean value 

router.post('/songs/add', upload.fields([
    {
        name: 'audio',
        maxCount: 1
    },
    {
        name: 'coverImage',
        maxCount: 1
    }
]), createSong);  // for creating a song
router.delete('/song/delete/:id', deleteSong);  // for deleting a song

router.post('/albums/add', createAlbum);  // for creating an album
router.delete('/album/delete/:id', deleteAlbum);  // for deleting an album

export default router;