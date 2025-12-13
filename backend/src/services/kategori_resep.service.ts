import {
  getAllKategoriResep,
  KategoriResep,
} from "../repositories/kategori_resep.repository";

export const getKategoriResepService = async (): Promise<KategoriResep[]> => {
  const kategoriResep = await getAllKategoriResep();
  return kategoriResep;
};

