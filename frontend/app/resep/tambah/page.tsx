"use client";

export default function AddRecipePage() {
    return (
        <div className="max-w-4xl mx-auto mt-28 bg-white p-8 rounded-3xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Detail Resep
        </h1>

        {/* Foto Upload */}
        <div className="border-2 border-dashed border-green-300 rounded-xl h-60 flex items-center justify-center text-gray-500">
            Klik atau drag & drop foto resepmu di sini
        </div>

        {/* Nama Resep */}
        <input
            type="text"
            placeholder="Contoh: Nasi Goreng Spesial"
            className="w-full mt-6 p-3 border-[3px] border-green-300 rounded-xl outline-none focus:border-green-500"
        />

        {/* Deskripsi */}
        <textarea
            placeholder="Ceritakan sedikit tentang resep ini…"
            className="w-full mt-4 p-3 h-32 border-[3px] border-green-300 rounded-xl outline-none resize-none focus:border-green-500"
        />
        </div>
    );
}
