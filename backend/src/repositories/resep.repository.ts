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
            (nama_resep, deskripsi, foto_resep, id_kategori, tingkat_kesulitan, waktu_memasak, langkah_memasak, porsi, id_user)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.nama_resep,
      data.deskripsi,
      data.foto,
      data.id_kategori,
      data.tingkat_kesulitan,
      data.waktu_masak,
      data.langkah_memasak,
      data.porsi,
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

export const getAllResep = async (): Promise<
  Array<{
    foto_resep: string;
    nama_resep: string;
    waktu_memasak: number;
    tingkat_kesulitan: string;
  }>
> => {
  const [rows]: [RowDataPacket[], any] = await db.query(
    `SELECT foto_resep, nama_resep, waktu_memasak, tingkat_kesulitan 
     FROM resep 
     ORDER BY id_resep DESC`
  );

  return rows as Array<{
    foto_resep: string;
    nama_resep: string;
    waktu_memasak: number;
    tingkat_kesulitan: string;
  }>;
};

export const getResepById = async (
  idResep: number
): Promise<{
  foto_resep: string;
  nama_resep: string;
  waktu_memasak: number;
  tingkat_kesulitan: string;
  porsi: string;
  langkah_memasak: string;
  bahan: Array<{
    nama_bahan: string;
    takaran: number;
    satuan: string;
  }>;
} | null> => {
  // Get recipe data
  const [resepRows]: [RowDataPacket[], any] = await db.query(
    `SELECT foto_resep, nama_resep, waktu_memasak, tingkat_kesulitan, porsi, langkah_memasak
     FROM resep 
     WHERE id_resep = ?`,
    [idResep]
  );

  if (resepRows.length === 0) {
    return null;
  }

  const resep = resepRows[0] as {
    foto_resep: string;
    nama_resep: string;
    waktu_memasak: number;
    tingkat_kesulitan: string;
    porsi: string;
    langkah_memasak: string;
  };

  // Get ingredients (bahan) for this recipe
  const [bahanRows]: [RowDataPacket[], any] = await db.query(
    `SELECT b.nama_bahan, br.takaran, b.satuan
     FROM bahan_resep br
     INNER JOIN bahan b ON br.id_bahan = b.id_bahan
     WHERE br.id_resep = ?
     ORDER BY br.id_resep`,
    [idResep]
  );

  const bahan = bahanRows.map((row: RowDataPacket) => ({
    nama_bahan: row.nama_bahan,
    takaran: row.takaran,
    satuan: row.satuan,
  }));

  return {
    ...resep,
    bahan,
  };
};
