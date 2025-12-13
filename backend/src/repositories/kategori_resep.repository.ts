// repositories/kategori_resep.repository.ts
import { db } from "../config/db";
import { RowDataPacket } from "mysql2";

export interface KategoriResep extends RowDataPacket {
  id_resep: number;
  nama_kategori: string;
}

export const getAllKategoriResep = async (): Promise<KategoriResep[]> => {
  const [rows] = await db.query<KategoriResep[]>(
    "SELECT id_kategori, nama_kategori FROM kategori_resep"
  );
  return rows;
};
