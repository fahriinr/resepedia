// routes/kategori_resep.routes.ts
import { Router } from "express";
import { getKategoriResepController } from "../controllers/kategori_resep.controller";

const router = Router();

router.get("/", getKategoriResepController);

export default router;
