// controllers/kategori_resep.controller.ts
import { Request, Response } from "express";
import { getKategoriResepService } from "../services/kategori_resep.service";

export const getKategoriResepController = async (
  req: Request,
  res: Response
) => {
  try {
    const kategoriResep = await getKategoriResepService();
    res.json({
      message: "Success",
      data: kategoriResep,
    });
  } catch (err: any) {
    console.error("getKategoriResepController error:", err);
    res.status(500).json({ message: err.message || "SERVER_ERROR" });
  }
};

