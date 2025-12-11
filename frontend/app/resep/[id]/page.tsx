"use client";

import { useState } from "react";
import { FiUpload } from "react-icons/fi";

type BahanType = {
    nama: string;
    takaran: string;
    satuan: string;
};


export default function TambahResepPage() {
    const [bahan, setBahan] = useState<BahanType[]>([
        { nama: "", takaran: "", satuan: "" },
    ]);
    const [langkah, setLangkah] = useState<string[]>([""]);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // Upload foto
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setPreviewImage(URL.createObjectURL(file));
    };

    const addBahan = () => {
        setBahan([
            ...bahan,
            { nama: "", takaran: "", satuan: "" },
        ]);
        };

    const updateBahan = (
        index: number,
        field: keyof BahanType,
        value: string
        ) => {

        const updated = [...bahan];
        updated[index][field] = value;
        setBahan(updated);
        };
        
    const removeBahan = (index: number) => {
        // minimal 1 baris tidak boleh dihapus (opsional tapi disarankan)
        if (bahan.length === 1) return;

        const updated = bahan.filter((_, i) => i !== index);
        setBahan(updated);
        };


    const addLangkah = () => setLangkah([...langkah, ""]);
    const updateLangkah = (i: number, v: string) => {
        const newItems = [...langkah];
        newItems[i] = v;
        setLangkah(newItems);
    };

    return (
        <main className="min-h-screen bg-green-50 py-16 px-4">
        <h1 className="text-center text-4xl font-bold text-gray-800 mb-10">
            Tambah Resep Baru
        </h1>

        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-10">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            Detail Resep
            </h2>

            {/* FOTO */}
            <label className="block mb-2 font-medium text-gray-700">Foto Resep</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition relative">
            <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleImageUpload}
            />

            {previewImage ? (
                <img
                src={previewImage}
                className="w-full h-60 object-cover rounded-lg"
                />
            ) : (
                <>
                <FiUpload className="text-4xl text-gray-400 mb-2" />
                <p className="text-gray-500">
                    Klik atau drag & drop foto resep di sini
                </p>
                </>
            )}
        </div>

            {/* NAMA */}
            <label className="block mt-6 mb-1 font-medium text-gray-700">
            Nama Resep
            </label>
            <input
            placeholder="Contoh: Nasi Goreng Spesial"
            className="w-full p-3 bg-[#F9F6E3] mt-2 rounded-xl border text-black focus:outline-none focus:ring-yellow-400"
            />

            {/* DESKRIPSI */}
            <label className="block mt-6 mb-1 font-medium text-gray-700">
            Deskripsi Singkat
            </label>
            <textarea
            rows={3}
            placeholder="Ceritakan sedikit tentang resep ini..."
            className="w-full p-3 rounded-xl bg-[#fbf6e8] border border text-black resize-none focus:outline-none focus:ring-yellow-400"
            />

            {/* DROPDOWN STYLE */}
            <style>
            {`
                .dropdown-custom {
                background: #fbf6e8;
                border: solid #3f3f3f ;
                border-radius: 16px;
                padding: 12px;
                color: #bdb6b6ff !important;
                font-size: 16px;
                outline: none;
                transition: all .2s ease;
                }
                .dropdown-custom:focus {
                }
                .dropdown-custom option{
                color: #000 !important;
                }
            `}
            </style>


            {/* KATEGORI */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
            <div>
                <label className="block mb-1 font-medium text-gray-700">
                Kategori
                </label>
                <select className="dropdown-custom w-full">
                <option>Pilih kategori</option>
                <option>Makanan</option>
                <option>Minuman</option>
                <option>Cemilan</option>
                </select>
            </div>

            <div> 
                <label className="block mb-1 font-medium text-gray-700"> 
                    Tingkat Kesulitan </label> 
                    <select className="dropdown-custom w-full">
                    <option>Pilih tingkat</option> 
                    <option>Mudah</option>
                    <option>Menengah</option> 
                    <option>Sulit</option> 
                    </select> 
            </div>
            </div>

            {/* BAHAN */}
            <div className="mt-10">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-700">
                Bahan-bahan
                </h3>

                <button
                onClick={addBahan}
                className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded-xl text-white font-bold hover:bg-green-600"
                >
                <span className="text-white font-bold">+</span>
                Tambah Bahan
                </button>
            </div>

            {bahan.map((item, index) => (
            <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-4 items-center"
            >
                {/* Nama Bahan */}
                <input
                value={item.nama}
                onChange={(e) =>
                    updateBahan(index, "nama", e.target.value)
                }
                placeholder="Nama bahan"
                className="md:col-span-3 p-3 rounded-xl bg-[#F9F6E3] text-gray-700 border font-medium focus:outline-none"
                />

                {/* Takaran */}
                <input
                type="number"
                value={item.takaran}
                onChange={(e) =>
                    updateBahan(index, "takaran", e.target.value)
                }
                placeholder="Takaran"
                className="md:col-span-2 p-3 rounded-xl bg-[#F9F6E3] text-gray-700 border font-medium focus:outline-none"
                />

                {/* Satuan */}
                <input
                value={item.satuan}
                onChange={(e) =>
                    updateBahan(index, "satuan", e.target.value)
                }
                placeholder="Satuan"
                className="md:col-span-1 p-3 rounded-xl bg-[#F9F6E3] text-gray-700 border font-medium focus:outline-none"
                />

                {/* Tombol Hapus */}
                <button
                type="button"
                onClick={() => removeBahan(index)}
                className="md:col-span-1 w-10 h-10 rounded-xl bg-red-300 text-red-500 font-bold hover:bg-red-400 transition"
                title="Hapus bahan"
                >
                ✕
                </button>
            </div>
            ))}
        </div>

            {/* LANGKAH */}
            <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-700">
            Langkah Memasak
            </h3>

            {langkah.map((l, i) => (
            <div key={i} className="flex items-start mb-3 gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-200 font-bold text-gray-700">
                {i + 1}
                </div>

                <textarea
                value={l}
                onChange={(e) => updateLangkah(i, e.target.value)}
                placeholder={`Langkah ${i + 1}`}
                className="flex-1 p-3 rounded-xl bg-[#fbf6e8] text-gray-700 font-medium focus:outline-none resize-none"
                />
            </div>
            ))}

            <button
            onClick={addLangkah}
            className="mt-1 mb-10 bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 font-bold"
            >
            + Tambah Langkah
            </button>

            {/* SIMPAN */}
            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl text-lg font-semibold transition">
            Simpan Resep
            </button>
        </div>
        </main>
    );
    }