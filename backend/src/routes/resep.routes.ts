import { Router } from "express";
import { auth } from "../middlewares/authMiddleware";
import {
  buatResep,
  getAllResep,
  getResepById,
  searchResepByBahan,
} from "../controllers/resep.controller";

const router = Router();

// POST /api/resep/search - Search resep by bahan (no auth required)
router.post("/search", searchResepByBahan);

// GET /api/resep - Get all resep for homepage (no auth required)
router.get("/", getAllResep);

// GET /api/resep/:id - Get resep by ID (no auth required)
router.get("/:id", getResepById);

// POST /api/resep/add - Create new resep (auth required)
router.post("/add", auth, buatResep);

export default router;
