import { Router } from "express";
import { auth } from "../middlewares/authMiddleware";
import { buatResep } from "../controllers/resep.controller";

const router = Router();

// POST /api/resep
router.post("/", auth, buatResep);

export default router;
