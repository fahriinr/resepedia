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
  porsi: string;
  bahan: BahanInput[];
}

export interface UpdateResepInput {
  nama_resep?: string;
  deskripsi?: string;
  foto?: string;
  id_kategori?: number;
  tingkat_kesulitan?: TingkatKesulitan;
  waktu_masak?: number;
  langkah_memasak?: string;
  porsi?: string;
  bahan?: BahanInput[];
}

export interface TambahKomentarInput {
  komentar: string;
}

export interface KomentarItem {
  id_komentar: number;
  nama_user: string;
  komentar: string;
  created_at: string;
}
