                                                                                                                            "use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PiHeartDuotone, PiLeafDuotone, PiUsersThreeDuotone } from "react-icons/pi";

export default function TentangPage() {
  return (
    <main className="min-h-screen bg-[#dff0e6] pt-10 pb-20">

      {/* SECTION UTAMA */}
      <section className="max-w-6xl mx-auto bg-[#dff0e6] p-10 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <h1 className="text-4xl font-extrabold text-gray-800 mb-5">
              Tentang Kami
            </h1>
            <p className="text-gray-700 leading-relaxed text-lg">
              Resepedia hadir untuk membantu setiap orang memasak dengan lebih efisien dan
              mengurangi pemborosan makanan. Kami percaya bahwa dengan teknologi yang tepat,
              memasak bisa menjadi lebih mudah, hemat, dan ramah lingkungan.
              <br /><br />
              Dengan Resepedia, kamu tidak perlu lagi bingung mencari resep yang cocok dengan
              bahan yang ada di rumah. Cukup masukkan bahan yang kamu punya, dan temukan berbagai
              resep lezat yang bisa langsung kamu masak!
            </p>
          </motion.div>

          {/* GAMBAR */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <Image
              src="/sayur.jpg" // ganti sesuai file yang kamu punya
              alt="Sayuran"
              width={550}
              height={350}
              className="rounded-xl shadow-md object-cover"
            />
          </motion.div>

        </div>
      </section>

      {/* FITUR CARD */}
      <section className="max-w-5xl mx-auto mt-12">
        <div className="bg-[#f7f5e9] p-10 rounded-2xl shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* CARD 1 */}
          <div className="text-center px-4">
            <PiHeartDuotone size={45} className="mx-auto text-yellow-500 mb-3" />
            <h3 className="text-xl font-bold text-gray-800">Hemat Bahan</h3>
            <p className="text-gray-600 mt-1">
              Manfaatkan bahan yang sudah ada di rumah tanpa perlu belanja banyak
            </p>
          </div>

          {/* CARD 2 */}
          <div className="text-center px-4">
            <PiLeafDuotone size={45} className="mx-auto text-yellow-500 mb-3" />
            <h3 className="text-xl font-bold text-gray-800">Anti Food Waste</h3>
            <p className="text-gray-600 mt-1">
              Kurangi pembuangan makanan dengan memasak sesuai kebutuhan
            </p>
          </div>

          {/* CARD 3 */}
          <div className="text-center px-4">
            <PiUsersThreeDuotone size={45} className="mx-auto text-yellow-500 mb-3" />
            <h3 className="text-xl font-bold text-gray-800">Komunitas</h3>
            <p className="text-gray-600 mt-1">
              Berbagi resep dan tips memasak dengan komunitas Resepedia
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}
