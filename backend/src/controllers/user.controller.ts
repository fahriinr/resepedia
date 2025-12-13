import { Request, Response } from "express";
import {
  getUserProfileService,
  updateUserProfileService,
} from "../services/user.service";

export const getUserProfileController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "UNAUTHORIZED" });
    }

    const user = await getUserProfileService(userId);

    res.json({
      message: "Success",
      data: user,
    });
  } catch (err: any) {
    console.error("getUserProfileController error:", err);
    res
      .status(err.status || 500)
      .json({ message: err.message || "SERVER_ERROR" });
  }
};

export const updateUserProfileController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "UNAUTHORIZED" });
    }

    const { name, email, password } = req.body;

    // Validate that at least one field is provided
    if (!name && !email && !password) {
      return res.status(400).json({
        message: "At least one field (name, email, password) must be provided",
      });
    }

    await updateUserProfileService(userId, { name, email, password });

    res.json({
      message: "Profile updated successfully",
    });
  } catch (err: any) {
    console.error("updateUserProfileController error:", err);
    res
      .status(err.status || 500)
      .json({ message: err.message || "SERVER_ERROR" });
  }
};
