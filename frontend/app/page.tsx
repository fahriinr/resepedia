"use client";

import { useState } from "react";
import Link from "next/link";   
import IngredientInput from "@/components/IngredientInput";
import IngredientTag from "@/components/IngredientTag";
import IngredientList from "@/components/IngredientList";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import TodaysPick from "@/components/todayspick";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();
  const [ingredients, setIngredients] = useState<string[]>([]);

  const addIngredient = (v: string) => {
    if (!ingredients.includes(v)) {
      setIngredients((prev) => [...prev, v]);
    }
  };

  const removeIngredient = (i: number) => {
    setIngredients((prev) => prev.filter((_, idx) => idx !== i));
  };

  // 🔹 Jika BELUM login → homepage original
  if (!session) {
    return (
      <main className="min-h-screen bg-green-50 pb-20">

        <section className="relative text-center py-24 bg-cover bg-center bg-no-repeat">
          <div className="relative z-10">
            <motion.h1 className="text-5xl font-extrabold text-gray-800 leading-snug tracking-tight max-w-4xl mx-auto">
              Masak dari Bahan yang <br /> <span>Kamu Punya!</span>
            </motion.h1>
            <motion.p className="text-gray-800 mt-3 text-lg">
              Temukan resep lezat tanpa perlu belanja banyak. Hemat bahan, anti food waste!
            </motion.p>
          </div>
        </section>

        {/* SEARCH SECTION */}
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-2xl -mt-20"
        >
          <h2 className="text-2xl font-semibold text-gray-800">
            Bahan apa yang kamu punya?
          </h2>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12 }
              }
            }}
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
              <IngredientInput onAdd={addIngredient} />
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
              <IngredientList items={ingredients} onRemove={removeIngredient} />
            </motion.div>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              className="text-gray-600 mt-4"
            >
              Bahan populer:
            </motion.p>

            <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}>
              <IngredientTag onSelect={addIngredient} />
            </motion.div>
          </motion.div>

          {/* BUTTON */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex justify-center"
          >
            <Button
              className="w-full px-10 rounded-xl mt-6 py-2 
              text-xl bg-green-400 hover:bg-green-500 text-white font-medium"
            >
              Cari Resep
            </Button>
          </motion.div>
        </motion.section>

        <TodaysPick />
      </main>
    );
  }

  // 🔹 Jika SUDAH login → homepage versi user
  return (
    <main className="min-h-screen bg-green-50 pb-20">

      <section className="relative text-center py-20 bg-cover bg-center bg-no-repeat">
        <div className="relative z-10">
          <motion.h1 className="text-4xl font-extrabold text-gray-800 leading-snug tracking-tight max-w-4xl mx-auto">
            Selamat Datang Kembali, {session.user?.name}! 👋
          </motion.h1>
          <p className="text-gray-700 mt-3 text-lg">
            Yuk masak sesuatu hari ini!
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/resep/tambah"
              className="bg-green-500 text-white px-5 py-2 rounded-xl hover:bg-green-600"
            >
              + Tambah Resep
            </Link>

            <Link
              href="/resep"
              className="bg-green-400 text-white px-5 py-2 rounded-xl hover:bg-green-500"
            >
              Lihat Resep
            </Link>
          </div>
        </div>
      </section>

      {/* tetap pakai Today's Pick */}
      <TodaysPick />
    </main>
  );
}
