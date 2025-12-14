"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Clock, Users, Flame, Heart, Star, ChevronLeft } from "lucide-react";
import CommentsSection from "@/components/CommentsSection";

interface Bahan {
  id_bahan: number;
  nama_bahan: string;
  takaran: number;
  satuan: string;
}

interface ResepDetail {
  id_resep: number;
  nama_resep: string;
  foto_resep: string;
  waktu_memasak: number;
  tingkat_kesulitan: string;
  deskripsi: string;
  bahan: Bahan[];
  langkah_memasak: string;
}

export default function DetailResepPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [resepDetail, setResepDetail] = useState<ResepDetail>();
  const langkah_memasak_json = JSON.parse(resepDetail?.langkah_memasak || "[]");

  const fetchDetail = async () => {
    try {
      const res = await axios.get(`http://localhost:2045/api/resep/${id}`);
      setResepDetail(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.error("Error fetching detail:", err);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  const handleAddToFavorite = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Silakan login terlebih dahulu");
        return;
      }
      await axios.post(
        "http://localhost:2045/api/resep/favorit",
        { id_resep: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Berhasil menyimpan ke favorit!");
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan ke favorit");
    }
  };

  if (!resepDetail)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading detail resep...
      </div>
    );

  return (
    <main
      className="min-h-screen bg-green-50 py-8 px-4 md:px-8"
      style={{ transform: "translateZ(0)" }}
    >
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-xl group">
          <Image
            src={`/img/${resepDetail.foto_resep}`}
            alt={resepDetail.nama_resep}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute bottom-8 left-8 text-white space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-shadow-sm">
              {resepDetail.nama_resep}
            </h1>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm border border-gray-100 gap-2">
            <Clock className="w-8 h-8 text-green-500 mb-1" />
            <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">
              Waktu
            </span>
            <span className="text-gray-800 font-bold">
              {resepDetail.waktu_memasak} menit
            </span>
          </div>
          <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm border border-gray-100 gap-2">
            <Users className="w-8 h-8 text-green-500 mb-1" />
            <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">
              Porsi
            </span>
            <span className="text-gray-800 font-bold">2 orang</span>{" "}
            {/* Placeholder porsi */}
          </div>
          <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm border border-gray-100 gap-2">
            <Flame className="w-8 h-8 text-green-500 mb-1" />
            <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">
              Tingkat
            </span>
            <span className="text-gray-800 font-bold capitalize">
              {resepDetail.tingkat_kesulitan}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={handleAddToFavorite}
            className="flex items-center justify-center gap-2 bg-orange-400 hover:bg-orange-500 text-white py-3.5 px-6 rounded-xl font-semibold transition-colors shadow-sm shadow-orange-200"
          >
            <Heart className="w-5 h-5 fill-white" />
            Simpan ke favorit
          </button>
          <button
            onClick={() => router.push(`/resep/komentar/${id}`)}
            className="flex items-center justify-center gap-2 bg-[#FFFBF2] hover:bg-orange-50 text-gray-700 border border-orange-200 py-3.5 px-6 rounded-xl font-semibold transition-colors"
          >
            <Star className="w-5 h-5" />
            Beri Rating
          </button>
        </div>

        {/* Content Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ingredients */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-fit">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">
              Bahan-bahan
            </h2>
            <ul className="space-y-4">
              {resepDetail.bahan.map((bahan, index) => (
                <li key={index} className="flex items-start gap-3 group">
                  <div className="w-5 h-5 rounded-full border-2 border-green-200 group-hover:bg-green-100 flex-shrink-0 mt-0.5 transition-colors" />
                  <div className="text-gray-600 group-hover:text-gray-900 transition-colors">
                    <span className="font-medium text-gray-800">
                      {bahan.takaran} {bahan.satuan}
                    </span>
                    <span className="ml-1">{bahan.nama_bahan}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-fit">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">
              Cara Membuat
            </h2>
            <div className="space-y-6">
              {langkah_memasak_json.map((step: string, index: number) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold text-sm mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <CommentsSection resepId={id} />
      </div>
    </main>
  );
}
