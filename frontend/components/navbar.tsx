"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { PiChefHatDuotone } from "react-icons/pi";
import { FiLogIn, FiLogOut } from "react-icons/fi";

export default function Navbar() {
    const { data: session } = useSession();
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
        <nav className="w-full relative flex items-center justify-center px-10 py-4 bg-white shadow-sm">
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

            {/* LOGIN / LOGOUT */}
            {!session ? (
                <Link
                href="/auth/login"
                className="flex items-center gap-2 bg-green-500 text-white px-3 py-2 rounded-xl font-semibold text-sm hover:bg-green-600 transition"
                >
                <FiLogIn size={18} />
                Login
                </Link>
            ) : (
                <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded-xl font-semibold text-sm hover:bg-red-600 transition"
                >
                <FiLogOut size={18} />
                Logout
                </button>
            )}
            </div>
        )}
        </nav>
    );
}
