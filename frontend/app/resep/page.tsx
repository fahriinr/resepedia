"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ResepPage() {
    const [kategori, setKategori] = useState("");
    const [tingkat, setTingkat] = useState("");

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

        {/* Filter */}
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white border p-4 rounded-xl space-y-5 mb-10 shadow-md
                        max-w-xl mx-auto"
        >
            <h2 className="text-xl font-bold text-[#3A2E26]">Filter</h2>

            {/* Kategori */}
            <div>
            <label className="font-bold text-[#3A2E26]">Kategori</label>
            <motion.select
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="w-full p-3 bg-[#F9F6E3] mt-2 rounded-xl border text-black focus:ring-2 focus:ring-green-600">
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
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                value={tingkat}
                onChange={(e) => setTingkat(e.target.value)}
                className="w-full p-3 bg-[#F9F6E3] mt-2 rounded-xl border text-black focus:ring-2 focus:ring-green-600"
            >
                <option value="">Pilih tingkat</option>
                <option value="mudah">Mudah</option>
                <option value="sedang">Sedang</option>
                <option value="sulit">Sulit</option>
            </motion.select>
            </div>
    </motion.div>
        {/* Result Info */}
        <p className="text-lg text-[#3A2E26] mb-6">
            Ditemukan <span className="font-bold">2 resep</span> yang cocok
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 180 }}
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl cursor-pointer"
            >
            <div className="h-40 bg-gray-300 rounded-xl mb-4" />
            <span className="bg-green-200 text-green-700 px-3 py-1 rounded-full text-sm">
                Mudah
            </span>
            <h3 className="text-xl font-bold mt-2">Nasi Goreng Kampung</h3>
            <p className="text-sm text-gray-600 mt-1">95% Match</p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 180 }}
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl cursor-pointer"
            >
            <div className="h-40 bg-gray-300 rounded-xl mb-4" />
            <span className="bg-blue-200 text-blue-700 px-3 py-1 rounded-full text-sm">
                Sedang
            </span>
            <h3 className="text-xl font-bold mt-2">Soto Ayam Lamongan</h3>
            <p className="text-sm text-gray-600 mt-1">85% Match</p>
            </motion.div>
        </div>
        </div>
    );
}
