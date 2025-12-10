// controllers/bahan.controller.ts
import { Request, Response } from "express";
import { getBahanService } from "../services/bahan.service";

export const getBahanController = async (req: Request, res: Response) => {
  try {
    const bahan = await getBahanService();
    res.json({
      message: "Success",
      data: bahan,
    });
  } catch (err: any) {
    console.error("getBahanController error:", err);
    res.status(500).json({ message: err.message || "SERVER_ERROR" });
  }
};
