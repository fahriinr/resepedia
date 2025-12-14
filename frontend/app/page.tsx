  "use client";

import { useEffect, useState } from "react";
import Link from "next/link";   
import IngredientInput from "@/components/IngredientInput";
import IngredientTag from "@/components/IngredientTag";
import IngredientList from "@/components/IngredientList";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import TodaysPick from "@/components/todayspick";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Ingredient {
    id_bahan: number;
    nama_bahan: string;
    satuan: string;
}

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);
  
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const addIngredient = (v: Ingredient) => {
    if (!ingredients.some(item => item.id_bahan === v.id_bahan)) {
      setIngredients((prev) => [...prev, v]);
    }
  };

  const removeIngredient = (i: number) => {
    setIngredients((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleSearch = async () => {
    const bahan_ids = ingredients.map(item => item.id_bahan);
    try {
      const response = await axios.post("http://localhost:2045/api/resep/search", {
        bahan_ids: bahan_ids
      });

      const results = response.data.data;
      localStorage.setItem("searchResults", JSON.stringify(results))
  
      router.push("/resep")
    } catch (error) {
      console.error("Search failed:", error);
      alert("Search failed. Check console.");
    }
  };

  return (
    <main className="min-h-screen bg-green-50 pb-20">

      <section className="relative text-center py-20 bg-cover bg-center bg-no-repeat">
        <div className="relative z-10">
          <motion.h1 className="text-4xl font-extrabold text-gray-800 leading-snug tracking-tight max-w-4xl mx-auto">
            Selamat Datang Kembali, {user?.name}! 👋
          </motion.h1>
          <p className="text-gray-700 mt-3 text-lg">
            Yuk masak sesuatu hari ini!
          </p>

          {/* SEARCH SECTION */}
        <motion.section
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 150 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-2xl -mt-20"
        >
          <h2 className="text-2xl font-semibold text-gray-800  ">
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
            className="text-gray-600 mt-4 text-start"
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
              onClick={handleSearch}
              className="w-full px-10 rounded-xl mt-6 py-2 
              text-xl bg-green-400 hover:bg-green-500 text-white font-medium"
            >
              Cari Resep
            </Button>
          </motion.div>
        </motion.section>
        </div>
      </section>

      {/* tetap pakai Today's Pick */}
      <TodaysPick />
    </main>
  );
}
