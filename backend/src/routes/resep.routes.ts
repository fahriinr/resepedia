import { Router } from "express";
import { auth } from "../middlewares/authMiddleware";
import {
  buatResep,
  getAllResep,
  getResepById,
  searchResepByBahan,
  updateResep,
  deleteResep,
  tambahKomentar,
  getKomentarResep,
} from "../controllers/resep.controller";

const router = Router();

// POST /api/resep/search - Search resep by bahan (no auth required)
router.post("/search", searchResepByBahan);

// GET /api/resep/:id/comments - Get komentar list for a resep (no auth required)
router.get("/:id/comments", getKomentarResep);

// POST /api/resep/:id/comments - Add komentar to a resep (auth required)
router.post("/:id/comments", auth, tambahKomentar);

// GET /api/resep - Get all resep for homepage (no auth required)
router.get("/", getAllResep);

// GET /api/resep/:id - Get resep by ID (no auth required)
router.get("/:id", getResepById);

// POST /api/resep/add - Create new resep (auth required)
router.post("/add", auth, buatResep);

// PATCH /api/resep/:id - Update resep (auth required, must be owner)
router.patch("/:id", auth, updateResep);

// DELETE /api/resep/:id - Delete resep (auth required, must be owner)
router.delete("/:id", auth, deleteResep);

export default router;
