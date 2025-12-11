import { Request, Response } from "express";
import {
  buatResepService,
  getAllResepService,
  getResepByIdService,
  searchResepByBahanService,
} from "../services/resep.service";

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

export const getAllResep = async (req: Request, res: Response) => {
  try {
    const result = await getAllResepService();

    res.json({
      message: "Berhasil mendapatkan data resep",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "SERVER_ERROR" });
  }
};

export const getResepById = async (req: Request, res: Response) => {
  try {
    const idResep = parseInt(req.params.id);

    if (isNaN(idResep)) {
      return res.status(400).json({ message: "ID_RESEP_INVALID" });
    }

    const result = await getResepByIdService(idResep);

    res.json({
      message: "Berhasil mendapatkan detail resep",
      data: result,
    });
  } catch (err: any) {
    console.error(err);
    if (err.code === "RESEP_NOT_FOUND") {
      return res.status(404).json({ message: err.message });
    }
    if (err.code === "ID_RESEP_INVALID") {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: err.message || "SERVER_ERROR" });
  }
};

export const searchResepByBahan = async (req: Request, res: Response) => {
  try {
    const { bahan_ids } = req.body;

    if (!bahan_ids || !Array.isArray(bahan_ids) || bahan_ids.length === 0) {
      return res.status(400).json({
        message: "BAHAN_IDS_REQUIRED",
        error: "Array bahan_ids diperlukan dan tidak boleh kosong",
      });
    }

    const result = await searchResepByBahanService(bahan_ids);

    res.json({
      message: "Berhasil mencari resep berdasarkan bahan",
      data: result,
      total: result.length,
    });
  } catch (err: any) {
    console.error(err);
    if (err.code === "BAHAN_IDS_REQUIRED" || err.code === "BAHAN_IDS_INVALID") {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: err.message || "SERVER_ERROR" });
  }
};
