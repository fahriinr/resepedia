"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type Resep = {
    id_resep: number;
    foto_resep: string;
    nama_resep: string;
    waktu_memasak: number;
    tingkat_kesulitan: string;
};

export default function ResepPage() {
    const router = useRouter();

    const [resep, setResep] = useState<Resep[]>([]);
    const [loading, setLoading] = useState(true);

    // Optional: filter
    const [kategori, setKategori] = useState("");
    const [tingkat, setTingkat] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("https://api.domain.com/resep");
                const result = await res.json();
                setResep(result.data);
            } catch (err) {
                console.error("Gagal fetch", err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center text-xl">
                Loading resep...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-green-50 px-6 py-10">

            {/* Title */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold text-[#3A2E26] mb-8 text-center"
            >
                Hasil Pencarian Resep
            </motion.h1>

            {/* Filter Section */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white border p-4 rounded-xl space-y-5 mb-10 shadow-md max-w-xl mx-auto"
            >
                <h2 className="text-xl font-bold text-[#3A2E26]">Filter</h2>

                {/* Kategori */}
                <div>
                    <label className="font-bold text-[#3A2E26]">Kategori</label>
                    <motion.select
                        whileFocus={{ scale: 1.02 }}
                        value={kategori}
                        onChange={(e) => setKategori(e.target.value)}
                        className="w-full p-3 bg-[#F9F6E3] mt-2 rounded-xl border text-black focus:ring-2 focus:ring-green-600"
                    >
                        <option value="">Pilih kategori</option>
                        <option value="mie">Mie</option>
                        <option value="nasi">Nasi</option>
                        <option value="ayam">Ayam</option>
                    </motion.select>
                </div>

                {/* Tingkat */}
                <div>
                    <label className="font-bold text-[#3A2E26]">Tingkat Kesulitan</label>
                    <motion.select
                        whileFocus={{ scale: 1.02 }}
                        value={tingkat}
                        onChange={(e) => setTingkat(e.target.value)}
                        className="w-full p-3 bg-[#F9F6E3] mt-2 rounded-xl border text-black focus:ring-2 focus:ring-green-600"
                    >
                        <option value="">Pilih tingkat</option>
                        <option value="Mudah">Mudah</option>
                        <option value="Menengah">Menengah</option>
                        <option value="Sulit">Sulit</option>
                    </motion.select>
                </div>
            </motion.div>

            {/* Result Info */}
            <p className="text-lg text-[#3A2E26] mb-6">
                Ditemukan{" "}
                <span className="font-bold">{resep.length} resep</span> yang cocok
            </p>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {resep.map((item) => (
                    <motion.div
                        key={item.id_resep}
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 180 }}
                        className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl cursor-pointer"
                        onClick={() => router.push(`/resep/${item.id_resep}`)}
                    >
                        <div className="h-40 rounded-xl mb-4 overflow-hidden">
                            <img
                                src={`https://api.domain.com/images/${item.foto_resep}`}
                                alt={item.nama_resep}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <span className="bg-green-200 text-green-700 px-3 py-1 rounded-full text-sm">
                            {item.tingkat_kesulitan}
                        </span>

                        <h3 className="font-semibold text-lg text-gray-800 mt-2">
                            {item.nama_resep}
                        </h3>

                        <p className="text-sm text-gray-600 mt-1">
                            ⏱ {item.waktu_memasak} menit
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
