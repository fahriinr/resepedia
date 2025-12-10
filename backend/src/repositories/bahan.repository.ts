// repositories/bahan.repository.ts
import { db } from "../config/db";
import { RowDataPacket } from "mysql2";

export interface Bahan extends RowDataPacket {
  id_bahan: number;
  nama_bahan: string;
  satuan: string;
}

export const getAllBahan = async (): Promise<Bahan[]> => {
  const [rows] = await db.query<Bahan[]>("SELECT * FROM bahan");
  return rows;
};
