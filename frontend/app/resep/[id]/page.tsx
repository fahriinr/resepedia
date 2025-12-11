"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Bahan {
    id_bahan: number;
    nama_bahan: string;
    jumlah: number;
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
    langkah: string[];
}

export default function DetailResepPage({ params }: { params: { id: string } }) {
    const [resep, setResep] = useState<ResepDetail | null>(null);

    const fetchDetail = async () => {
        try {
            const res = await fetch(`https://your-api-url/resep/${params.id}`);
            const json = await res.json();
            setResep(json.data);
        } catch (err) {
            console.error("Error fetching detail:", err);
        }
    };

    useEffect(() => {
        fetchDetail();
    }, []);

    if (!resep) return <p className="p-6">Loading detail resep...</p>;

    return (
        <main className="min-h-screen bg-green-50 py-10 px-6">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8">

                <h1 className="text-4xl font-bold text-gray-800 mb-6">
                    {resep.nama_resep}
                </h1>

                <Image
                    src={`/img/${resep.foto_resep}`}
                    alt={resep.nama_resep}
                    width={900}
                    height={500}
                    className="rounded-xl mb-6"
                />

                {/* Info */}
                <div className="flex gap-6 text-gray-600 text-lg mb-6">
                    <p>⏱ {resep.waktu_memasak} menit</p>
                    <p>🔥 {resep.tingkat_kesulitan}</p>
                </div>

                {/* Deskripsi */}
                <p className="text-gray-700 mb-8">{resep.deskripsi}</p>

                {/* Bahan */}
                <h2 className="text-2xl font-semibold mt-6 mb-3">Bahan-bahan</h2>
                <ul className="list-disc ml-6 text-gray-700 space-y-1">
                    {resep.bahan.map((bahan) => (
                        <li key={bahan.id_bahan}>
                            {bahan.nama_bahan} — {bahan.jumlah} {bahan.satuan}
                        </li>
                    ))}
                </ul>

                {/* Langkah */}
                <h2 className="text-2xl font-semibold mt-8 mb-3">Langkah Memasak</h2>
                <ol className="list-decimal ml-6 space-y-3 text-gray-700">
                    {resep.langkah.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ol>
            </div>
        </main>
    );
}
