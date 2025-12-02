import { Request, Response } from "express";
import { loginUser, registerService } from "../services/auth.service";
import { db } from "../config/db";

export const registerController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    await registerService({ name, email, password });

    res.json({ message: "Registered successfully" });
  } catch (err: any) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await loginUser({ email, password });

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.json({
      message: "Login success",
      token: result.token,
      user: {
        id: result.user.id, // pastikan dikirim
        name: result.user.name,
        email: result.user.email,
      },
    });
  } catch (err) {
    if (err.message === "USER_NOT_FOUND")
      return res.status(404).json({ message: "User not found" });

    if (err.message === "WRONG_PASSWORD")
      return res.status(400).json({ message: "Wrong password" });

    return res.status(500).json({ message: "Server error" });
  }
};
