"use client";

import { resepBanner } from "@/types/resepBanner";
import { motion } from "framer-motion";
import { CircleUserRound, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function ProfilPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [reseps, setReseps] = useState<resepBanner[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (saved) setUser(JSON.parse(saved));
    const fetchResep = async () => {
      const response = await fetch("http://localhost:2045/api/resep/my-resep", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setReseps(data.data);
    };
    fetchResep();
  }, []);
  return (
    <div className="min-h-screen bg-green-50 flex justify-center">
      <div className="w-full max-w-5xl bg-white mt-6 rounded-2xl shadow-sm px-8 py-6">
        {/* HEADER */}
        <h1 className="text-center text-gray-700 text-xl font-bold tracking-wide mb-6">
          INFORMASI AKUN
        </h1>

        {/* PROFIL ATAS */}
        <div className="flex items-center gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-purple-500 flex items-center justify-center">
            <CircleUserRound className="w-14 h-14 text-white" />
          </div>

          {/* Info User */}
          <div>
            <h2 className="text-lg text-gray-700 font-bold">{user?.name}</h2>
            <p className="text-gray-600 font-semibold">{user?.email}</p>

            <div className="flex gap-6 mt-2 text-sm text-gray-700">
              <span>0 Mengikuti</span>
              <span>0 Pengikut</span>
            </div>
          </div>
        </div>

        {/* BUTTON EDIT */}
        <button
          onClick={() => router.push("/profil/edit")}
          className="w-full mt-4 rounded-xl bg-green-500 hover:bg-green-600 text-gray-700 py-2 font-semibold"
        >
          Edit Profile
        </button>

        {/* TAB */}
        <div className="flex justify-between mt-8 border-b pb-2">
          <span className="font-semibold text-gray-800">
            Resep Saya ({reseps.length})
          </span>
          <span className="text-gray-800">Favorit (0)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reseps.map((resep, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer"
              onClick={() => router.push(`/resep/${resep.id_resep}`)}
            >
              <div className="h-44 w-full bg-gray-300">
                <img
                  src={`/img/dummy7.jpg`}
                  alt={resep.foto_resep}
                  className="h-44 w-full object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800">
                  {resep.nama_resep}
                </h3>
                <div className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{resep.waktu_memasak}min</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
