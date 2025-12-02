export interface BahanInput {
  id_bahan: number;
  takaran: number;
}

export type TingkatKesulitan = "Mudah" | "Normal" | "Sulit";

export interface TambahResepInput {
  nama_resep: string;
  deskripsi: string;
  foto?: string;
  id_kategori: number;
  tingkat_kesulitan: TingkatKesulitan;
  waktu_masak: number;
  langkah_memasak: string;
  bahan: BahanInput[];
}
