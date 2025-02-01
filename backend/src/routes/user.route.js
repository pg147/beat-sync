import { Router } from "express";

// Controllers
import { signup } from "../controllers/auth.controller.js";
import { getAllUsers } from "../controllers/users.controller.js";

// Middlewares
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/', protectRoute, getAllUsers);
router.post('/auth-callback', signup);

export default router;