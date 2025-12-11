import { db } from "../config/db";
import {
  findBahanByIds,
  insertResep,
  insertResepBahan,
  getAllResep,
  getResepById,
  searchResepByBahan,
} from "../repositories/resep.repository";
import { BahanInput, TambahResepInput } from "../types/resep.types";

class ServiceError extends Error {
  code?: string;
  constructor(message: string, code?: string) {
    super(message);
    this.code = code;
  }
}

export const buatResepService = async (
  data: TambahResepInput,
  userId: number
) => {
  console.log(data);
  // Basic validation
  if (!data.nama_resep || !data.deskripsi || !data.id_kategori) {
    throw new ServiceError("DATA_TIDAK_LENGKAP", "DATA_TIDAK_LENGKAP");
  }

  if (!["Mudah", "Normal", "Sulit"].includes(data.tingkat_kesulitan)) {
    throw new ServiceError(
      "TINGKAT_KESULITAN_INVALID",
      "TINGKAT_KESULITAN_INVALID"
    );
  }

  if (!Number.isInteger(data.waktu_masak) || data.waktu_masak < 0) {
    throw new ServiceError("WAKTU_MASAK_INVALID", "WAKTU_MASAK_INVALID");
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // Validate bahan: extract IDs from input
    const bahanInputs: BahanInput[] = data.bahan || [];
    const bahanIds = Array.from(new Set(bahanInputs.map((b) => b.id_bahan)));

    // Check bahan exist
    if (bahanIds.length > 0) {
      const found = await findBahanByIds(conn, bahanIds);
      const foundIds = found.map((r) => r.id_bahan);
      const missing = bahanIds.filter((id) => !foundIds.includes(id));
      if (missing.length > 0) {
        throw new ServiceError(
          `BAHAN_NOT_FOUND: ${missing.join(",")}`,
          "BAHAN_NOT_FOUND"
        );
      }
      // optionally you can map satuan if needed by frontend or to store snapshot
    }

    // Insert resep
    const idResep = await insertResep(conn, data, userId);

    // Insert resep_bahan (bulk)
    if (bahanInputs.length > 0) {
      await insertResepBahan(conn, idResep, bahanInputs);
    }

    await conn.commit();
    return { id_resep: idResep };
  } catch (err) {
    await conn.rollback();
    if (err instanceof ServiceError) throw err;
    console.error("buatResepService error:", err);
    throw new ServiceError("SERVER_ERROR", "SERVER_ERROR");
  } finally {
    conn.release();
  }
};

export const getAllResepService = async () => {
  try {
    const resepList = await getAllResep();
    return resepList;
  } catch (err) {
    console.error("getAllResepService error:", err);
    throw new ServiceError("SERVER_ERROR", "SERVER_ERROR");
  }
};

export const getResepByIdService = async (idResep: number) => {
  try {
    if (!Number.isInteger(idResep) || idResep <= 0) {
      throw new ServiceError("ID_RESEP_INVALID", "ID_RESEP_INVALID");
    }

    const resep = await getResepById(idResep);

    if (!resep) {
      throw new ServiceError("RESEP_NOT_FOUND", "RESEP_NOT_FOUND");
    }

    return resep;
  } catch (err) {
    if (err instanceof ServiceError) throw err;
    console.error("getResepByIdService error:", err);
    throw new ServiceError("SERVER_ERROR", "SERVER_ERROR");
  }
};

export const searchResepByBahanService = async (bahanIds: number[]) => {
  try {
    if (!bahanIds || !Array.isArray(bahanIds) || bahanIds.length === 0) {
      throw new ServiceError("BAHAN_IDS_REQUIRED", "BAHAN_IDS_REQUIRED");
    }

    // Validate that all IDs are numbers
    const invalidIds = bahanIds.filter(
      (id) => !Number.isInteger(id) || id <= 0
    );
    if (invalidIds.length > 0) {
      throw new ServiceError("BAHAN_IDS_INVALID", "BAHAN_IDS_INVALID");
    }

    // Remove duplicates
    const uniqueBahanIds = Array.from(new Set(bahanIds));

    const resepList = await searchResepByBahan(uniqueBahanIds);
    return resepList;
  } catch (err) {
    if (err instanceof ServiceError) throw err;
    console.error("searchResepByBahanService error:", err);
    throw new ServiceError("SERVER_ERROR", "SERVER_ERROR");
  }
};
