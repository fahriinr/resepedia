import { Pool, RowDataPacket } from "mysql2/promise";
import { db } from "../config/db";
import {
  TambahResepInput,
  BahanInput,
  UpdateResepInput,
} from "../types/resep.types";

export const insertResep = async (
  conn: Pool | any,
  data: TambahResepInput,
  userId: number
) => {
  const langkah_memasak = JSON.stringify(data.langkah_memasak);
  const [result]: any = await conn.query(
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
      langkah_memasak,
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

  await conn.query(
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

export const getResepByUserId = async (
  userId: number
): Promise<
  Array<{
    foto_resep: string;
    nama_resep: string;
    waktu_memasak: number;
  }>
> => {
  const [rows]: [RowDataPacket[], any] = await db.query(
    `SELECT id_resep, foto_resep, nama_resep, waktu_memasak 
     FROM resep 
     WHERE id_user = ? 
     ORDER BY id_resep DESC`,
    [userId]
  );

  return rows as Array<{
    id_resep: number;
    foto_resep: string;
    nama_resep: string;
    waktu_memasak: number;
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
    id_bahan: number;
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
    `SELECT br.id_bahan, b.nama_bahan, br.takaran, b.satuan
     FROM bahan_resep br
     INNER JOIN bahan b ON br.id_bahan = b.id_bahan
     WHERE br.id_resep = ?
     ORDER BY br.id_resep`,
    [idResep]
  );

  const bahan = bahanRows.map((row: RowDataPacket) => ({
    id_bahan: row.id_bahan,
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

export const checkResepOwnership = async (
  idResep: number,
  userId: number
): Promise<boolean> => {
  const [rows]: [RowDataPacket[], any] = await db.query(
    `SELECT id_resep FROM resep WHERE id_resep = ? AND id_user = ?`,
    [idResep, userId]
  );
  return rows.length > 0;
};

export const getResepByIdForUpdate = async (
  idResep: number
): Promise<{ id_resep: number; id_user: number } | null> => {
  const [rows]: [RowDataPacket[], any] = await db.query(
    `SELECT id_resep, id_user FROM resep WHERE id_resep = ?`,
    [idResep]
  );
  if (rows.length === 0) return null;
  return rows[0] as { id_resep: number; id_user: number };
};

export const updateResep = async (
  conn: Pool | any,
  idResep: number,
  data: UpdateResepInput
) => {
  const updateFields: string[] = [];
  const updateValues: any[] = [];

  if (data.nama_resep !== undefined) {
    updateFields.push("nama_resep = ?");
    updateValues.push(data.nama_resep);
  }
  if (data.deskripsi !== undefined) {
    updateFields.push("deskripsi = ?");
    updateValues.push(data.deskripsi);
  }
  if (data.foto !== undefined) {
    updateFields.push("foto_resep = ?");
    updateValues.push(data.foto);
  }
  if (data.id_kategori !== undefined) {
    updateFields.push("id_kategori = ?");
    updateValues.push(data.id_kategori);
  }
  if (data.tingkat_kesulitan !== undefined) {
    updateFields.push("tingkat_kesulitan = ?");
    updateValues.push(data.tingkat_kesulitan);
  }
  if (data.waktu_masak !== undefined) {
    updateFields.push("waktu_memasak = ?");
    updateValues.push(data.waktu_masak);
  }
  if (data.langkah_memasak !== undefined) {
    updateFields.push("langkah_memasak = ?");
    updateValues.push(
      typeof data.langkah_memasak === "string"
        ? data.langkah_memasak
        : JSON.stringify(data.langkah_memasak)
    );
  }
  if (data.porsi !== undefined) {
    updateFields.push("porsi = ?");
    updateValues.push(data.porsi);
  }

  if (updateFields.length === 0) {
    return; // No fields to update
  }

  updateValues.push(idResep);

  await conn.query(
    `UPDATE resep SET ${updateFields.join(", ")} WHERE id_resep = ?`,
    updateValues
  );
};

export const deleteResepBahan = async (conn: Pool | any, idResep: number) => {
  await conn.query(`DELETE FROM bahan_resep WHERE id_resep = ?`, [idResep]);
};

export const deleteResep = async (conn: Pool | any, idResep: number) => {
  // First delete bahan_resep (foreign key constraint)
  await deleteResepBahan(conn, idResep);
  // Then delete resep
  await conn.query(`DELETE FROM resep WHERE id_resep = ?`, [idResep]);
};

export const insertKomentar = async (
  idResep: number,
  idUser: number,
  komentar: string
): Promise<number> => {
  const [result]: any = await db.query(
    `INSERT INTO komentar_rating (id_resep, id_user, isi_komentar) VALUES (?, ?, ?)`,
    [idResep, idUser, komentar]
  );

  return result.insertId;
};

export const getKomentarByResep = async (
  idResep: number
): Promise<
  Array<{
    id_komentar: number;
    nama_user: string;
    komentar: string;
    created_at: string;
  }>
> => {
  const [rows]: [RowDataPacket[], any] = await db.query(
    `SELECT 
      k.id_komentar,
      u.name AS nama_user,
      k.isi_komentar,
      k.tanggal_komentar
    FROM komentar_rating k
    INNER JOIN user u ON k.id_user = u.id_user
    WHERE k.id_resep = ?
    ORDER BY k.tanggal_komentar DESC`,
    [idResep]
  );

  return rows as Array<{
    id_komentar: number;
    nama_user: string;
    komentar: string;
    created_at: string;
  }>;
};

export const checkFavoritExists = async (
  idResep: number,
  userId: number
): Promise<boolean> => {
  const [rows]: [RowDataPacket[], any] = await db.query(
    `SELECT id_favorit_resep FROM favorit_resep WHERE id_resep = ? AND id_user = ?`,
    [idResep, userId]
  );
  return rows.length > 0;
};

export const insertFavoritResep = async (
  idResep: number,
  userId: number
): Promise<number> => {
  const [result]: any = await db.query(
    `INSERT INTO favorit_resep (id_resep, id_user, tanggal_disimpan) VALUES (?, ?, NOW())`,
    [idResep, userId]
  );

  return result.insertId;
};

export const getFavoritResepById = async (
  idFavoritResep: number
): Promise<{
  id_resep: number;
  foto_resep: string;
  nama_resep: string;
  waktu_memasak: number;
} | null> => {
  const [rows]: [RowDataPacket[], any] = await db.query(
    `SELECT 
      fr.id_favorit_resep,
      r.foto_resep,
      r.nama_resep,
      r.waktu_memasak
    FROM favorit_resep fr
    INNER JOIN resep r ON fr.id_resep = r.id_resep
    WHERE fr.id_favorit_resep = ?`,
    [idFavoritResep]
  );

  if (rows.length === 0) {
    return null;
  }

  return rows[0] as {
    id_resep: number;
    foto_resep: string;
    nama_resep: string;
    waktu_memasak: number;
  };
};

export const getFavoritResepByUserId = async (
  userId: number
): Promise<
  Array<{
    id_resep: number;
    foto_resep: string;
    nama_resep: string;
    waktu_memasak: number;
  }>
> => {
  const [rows]: [RowDataPacket[], any] = await db.query(
    `SELECT 
      r.id_resep,
      r.foto_resep,
      r.nama_resep,
      r.waktu_memasak
    FROM favorit_resep fr
    INNER JOIN resep r ON fr.id_resep = r.id_resep
    WHERE fr.id_user = ?
    ORDER BY fr.tanggal_disimpan DESC`,
    [userId]
  );

  return rows as Array<{
    id_resep: number;
    foto_resep: string;
    nama_resep: string;
    waktu_memasak: number;
  }>;
};
