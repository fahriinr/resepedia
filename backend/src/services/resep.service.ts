import { ResultSetHeader } from "mysql2";
import { db } from "../config/db";

export const insertResep = async (data: {
  id_user: number;
  id_kategori: number;
  nama_resep: string;
  deskripsi: string;
  langkah_memasak: string;
  waktu_memasak: number;
  foto_resep: string;
}) => {
  const query = `
  INSERT INTO resep (
  id_user, id_kategori, nama_resep, deskripsi, langkah_memasak, waktu_memasak, foto_resep
  ) VALUES (?,?,?,?,?,?)
  `;

  const values = [
    data.id_user,
    data.id_kategori,
    data.nama_resep,
    data.deskripsi,
    data.langkah_memasak,
    data.waktu_memasak,
    data.foto_resep,
  ];

  const [result] = await db.query<ResultSetHeader>(query, values);
  return result;
};
