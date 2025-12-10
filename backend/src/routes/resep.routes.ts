import { Router } from "express";
import { auth } from "../middlewares/authMiddleware";
import {
  buatResep,
  getAllResep,
  getResepById,
} from "../controllers/resep.controller";

const router = Router();

// GET /api/resep - Get all resep for homepage (no auth required)
router.get("/", getAllResep);

// GET /api/resep/:id - Get resep by ID (no auth required)
router.get("/:id", getResepById);

// POST /api/resep/add - Create new resep (auth required)
router.post("/add", auth, buatResep);

export default router;
