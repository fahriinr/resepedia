import { Request, Response } from "express";
import { insertResep } from "../services/resep.service";

export const createResep = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await insertResep(data);
    res
      .status(201)
      .json({ message: "Resep Berhasil Ditambahkan!", id: result.insertId });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Gagal Menambahkan Resep!", detail: error.message });
  }
};
