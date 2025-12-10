// routes/bahan.route.ts
import { Router } from "express";
import { getBahanController } from "../controllers/bahan.controller";

const router = Router();

router.get("/", getBahanController);

export default router;
