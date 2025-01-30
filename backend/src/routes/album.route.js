import { Router } from "express";
import { getAlbum, getAllAlbums } from "../controllers/album.controller.js";

const router = Router();

router.get('/', getAllAlbums);
router.get('/:id', getAlbum);

export default router;