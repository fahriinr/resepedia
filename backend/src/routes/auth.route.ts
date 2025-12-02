import { Router } from "express";
import { auth } from "../middlewares/authMiddleware";
import {
  loginController,
  registerController,
} from "../controllers/auth.controller";

const router = Router();

router.post("/", registerController);
router.post("/login", loginController);
// router.get("/me", auth, (req, res) => {
//   res.json({ user: req.user });
// });

export default router;
