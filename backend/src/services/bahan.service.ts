import { getAllBahan, Bahan } from "../repositories/bahan.repository";

export const getBahanService = async (): Promise<Bahan[]> => {
  const bahan = await getAllBahan();
  return bahan;
};
