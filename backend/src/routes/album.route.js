import { Router } from "express";
import { getAlbum, getAllAlbums } from "../controllers/album.controller.js";

const router = Router();

router.get('/albums', getAllAlbums);
router.get('/album/:id', getAlbum);

export default router;