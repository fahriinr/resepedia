import { Request, Response } from "express";
import { buatResepService } from "../services/resep.service";

const requiredFields = [
  "nama_resep",
  "deskripsi",
  "foto",
  "id_kategori",
  "tingkat_kesulitan",
  "waktu_masak",
  "bahan",
  "langkah_memasak",
];

export const buatResep = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id; // dari middleware auth
    if (!userId) return res.status(401).json({ message: "UNAUTHORIZED" });

    const body = req.body;

    const result = await buatResepService(body, userId);

    res.json({
      message: "Resep berhasil dibuat",
      result,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "SERVER_ERROR" });
  }
};
