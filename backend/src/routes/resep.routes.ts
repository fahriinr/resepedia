import { Router } from "express";
import { createResep } from "../controllers/resep.controller";

const router = Router();

router.post("/", createResep);

export default router;
