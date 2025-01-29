import { Router } from "express";

// Controllers
import { getAllStats } from "../controllers/stats.controller.js";

// Middlewares
import { protectRoute, requireAdmin } from "../middlewares/auth.middleware.js"

const router = Router();

router.get("/stats", protectRoute, requireAdmin, getAllStats);

export default router;