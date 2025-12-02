import { Pool, RowDataPacket } from "mysql2/promise";
import { db } from "../config/db";
import { TambahResepInput, BahanInput } from "../types/resep.types";

export const insertResep = async (
  conn: Pool | any,
  data: TambahResepInput,
  userId: number
) => {
  const [result]: any = await db.query(
    `INSERT INTO resep 
            (nama_resep, deskripsi, foto_resep, id_kategori, tingkat_kesulitan, waktu_memasak, langkah_memasak, id_user)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.nama_resep,
      data.deskripsi,
      data.foto,
      data.id_kategori,
      data.tingkat_kesulitan,
      data.waktu_masak,
      data.langkah_memasak,
      userId,
    ]
  );

  return result.insertId;
};

export const insertResepBahan = async (
  conn: Pool | any,
  id_resep: number,
  bahanList: BahanInput[]
) => {
  const values = bahanList.map((x) => [id_resep, x.id_bahan, x.takaran]);

  await db.query(
    `INSERT INTO bahan_resep (id_resep, id_bahan, takaran) VALUES ?`,
    [values]
  );
};

export const findBahanByIds = async (
  conn: Pool | any,
  ids: number[]
): Promise<Array<{ id_bahan: number; nama_bahan: string; satuan: string }>> => {
  if (!ids || ids.length === 0) return [];

  // Use placeholders
  const placeholders = ids.map(() => "?").join(",");
  const [rows]: [RowDataPacket[], any] = await conn.query(
    `SELECT id_bahan, nama_bahan, satuan FROM bahan WHERE id_bahan IN (${placeholders})`,
    ids
  );

  return rows as Array<{
    id_bahan: number;
    nama_bahan: string;
    satuan: string;
  }>;
};
