import { Router } from "express";
import { register } from "../controllers/auth.controller";
import { auth } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", register);
// router.post("/login", login);
// router.get("/me", auth, (req, res) => {
//   res.json({ user: req.user });
// });

export default router;
