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
    id_resep: number;
    foto_resep: string;
    nama_resep: string;
    waktu_memasak: number;
    tingkat_kesulitan: string;
  }>
> => {
  const [rows]: [RowDataPacket[], any] = await db.query(
    `SELECT id_resep, foto_resep, nama_resep, waktu_memasak, tingkat_kesulitan 
     FROM resep 
     ORDER BY id_resep DESC`
  );

  return rows as Array<{
    id_resep: number;
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

export const searchResepByBahan = async (
  bahanIds: number[]
): Promise<
  Array<{
    id_resep: number;
    foto_resep: string;
    nama_resep: string;
    waktu_memasak: number;
    tingkat_kesulitan: string;
    persentase_kecocokan: number;
    total_bahan: number;
    bahan_cocok: number;
  }>
> => {
  if (!bahanIds || bahanIds.length === 0) {
    return [];
  }

  const placeholders = bahanIds.map(() => "?").join(",");

  // Query untuk mencari resep yang memiliki minimal satu bahan yang dicari
  // dan menghitung persentase kecocokan
  // Menggunakan subquery untuk menghitung total bahan dan bahan yang cocok
  const [rows]: [RowDataPacket[], any] = await db.query(
    `SELECT 
      r.id_resep,
      r.foto_resep,
      r.nama_resep,
      r.waktu_memasak,
      r.tingkat_kesulitan,
      (
        SELECT COUNT(DISTINCT br1.id_bahan)
        FROM bahan_resep br1
        WHERE br1.id_resep = r.id_resep
      ) as total_bahan,
      (
        SELECT COUNT(DISTINCT br2.id_bahan)
        FROM bahan_resep br2
        WHERE br2.id_resep = r.id_resep
          AND br2.id_bahan IN (${placeholders})
      ) as bahan_cocok,
      ROUND(
        (
          SELECT COUNT(DISTINCT br2.id_bahan)
          FROM bahan_resep br2
          WHERE br2.id_resep = r.id_resep
            AND br2.id_bahan IN (${placeholders})
        ) * 100.0 / 
        (
          SELECT COUNT(DISTINCT br1.id_bahan)
          FROM bahan_resep br1
          WHERE br1.id_resep = r.id_resep
        ),
        2
      ) as persentase_kecocokan
    FROM resep r
    WHERE EXISTS (
      SELECT 1
      FROM bahan_resep br
      WHERE br.id_resep = r.id_resep
        AND br.id_bahan IN (${placeholders})
    )
    HAVING bahan_cocok > 0
    ORDER BY persentase_kecocokan DESC, total_bahan ASC`,
    [...bahanIds, ...bahanIds, ...bahanIds]
  );

  return rows.map((row: RowDataPacket) => ({
    id_resep: row.id_resep,
    foto_resep: row.foto_resep,
    nama_resep: row.nama_resep,
    waktu_memasak: row.waktu_memasak,
    tingkat_kesulitan: row.tingkat_kesulitan,
    persentase_kecocokan: parseFloat(row.persentase_kecocokan) || 0,
    total_bahan: row.total_bahan,
    bahan_cocok: row.bahan_cocok,
  }));
};
