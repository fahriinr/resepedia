"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PiChefHatDuotone } from "react-icons/pi";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { CircleUserRound } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();

    const isAuthPage = pathname.startsWith("/auth");

    const navItem = (href: string, label: string) => (
        <Link
        href={href}
        className={`mx-6 text-xl font-semibold ${
            pathname === href ? "text-green-700" : "text-gray-800"
        } hover:text-green-600 transition`}
        >
        {label}
        </Link>
    );

    const handleTambahResep = () => {
        router.push("/resep/tambah");
    };

    return (
        <nav className="w-full flex items-center justify-center px-10 py-4 bg-white shadow-sm">
        {/* Logo kiri */}
        <Link href="/" className="absolute left-10 flex items-center space-x-2">
            <PiChefHatDuotone size={38} className="text-green-300" />
            <span className="text-3xl font-bold text-green-300">Resepedia</span>
        </Link>

        {/* MENU TENGAH */}
        <div className="flex items-center space-x-6">
            {navItem("/", "Home")}
            {navItem("/resep", "Resep")}
            {navItem("/tentang", "Tentang")}
        </div>

        {/* BUTTON KANAN */}
        {!isAuthPage && (
            <div className="absolute right-10 flex items-center gap-3">
            
            {/* TOMBOL TAMBAH RESEP */}
            <button
                onClick={handleTambahResep}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-xl font-semibold text-sm transition"
            >
                + Tambah Resep
            </button>

            <CircleUserRound
                onClick={() => router.push("/profil")}
                className="w-8 h-8 text-black"/>
            </div>
        )}
        </nav>
    );
}
