import { Router } from "express";
import { auth } from "../middlewares/authMiddleware";
import {
  getUserProfileController,
  updateUserProfileController,
} from "../controllers/user.controller";

const router = Router();

router.get("/profile", auth, getUserProfileController);
router.patch("/profile", auth, updateUserProfileController);

export default router;
