"use client";

import axios from "axios";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";


export interface resep  {
      id_resep: number,
      foto_resep: string,
      nama_resep: string,
      waktu_memasak: number,
      tingkat_kesulitan: string
}


export default function TodaysPick() {
  const [reseps, setReseps] = useState<resep[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:2045/api/resep");
        setReseps(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <section className="max-w-6xl mx-auto mt-28 px-4 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center text-4xl font-bold text-gray-800 mb-10"
      >
        Today’s Pick
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reseps.map((resep, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.12 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer"
            onClick={() => router.push(`/resep/${resep.id_resep}`)}

          >
            <div className="h-44 w-full bg-gray-300">
              <img
                src={`/img/${resep.foto_resep}`}
                alt={resep.foto_resep}
                className="h-44 w-full object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800">
                {resep.nama_resep}
              </h3>
              <div className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>
                {resep.waktu_memasak}min
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
