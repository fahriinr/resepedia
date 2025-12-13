"use client";

import { CircleUserRound } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilPage() {
    const router = useRouter();
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
                <h2 className="text-lg text-gray-700 font-bold">JAMES BOND</h2>
                <p className="text-gray-600 font-semibold">@JameBond_1212121</p>

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
            <span className="text-gray-500">Resep Saya (0)</span>
            <span className="text-gray-500">Favorit (0)</span>
            </div>

            {/* EMPTY STATE */}
            <div className="flex flex-col items-center mt-12 text-center">
            <div className="w-40 h-40 bg-gray-100 rounded-xl mb-4" />

            <p className="text-gray-600 mb-4">
                Kamu Belum Menuliskan Resep
            </p>

            <button
                className="bg-gray-200 hover:bg-gray-300 text-black px-6 py-2 rounded-xl font-medium transition"
            >
                Edit Resep
            </button>
            </div>

        </div>
        </div>
    );
    }
