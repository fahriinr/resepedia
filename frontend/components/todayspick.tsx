"use client";

import { motion } from "framer-motion";

const todaysPickData = [
    {
        title: "Nasi Goreng Spesial",
        time: "15 min",
        rating: "⭐ 4.8",
        img: "/img/Nasgor.jpg" 
    },
    {
        title: "Ayam Geprek",
        time: "20 min",
        rating: "⭐ 4.9",
        img: "/img/Geprek.jpg"
    },
    {
        title: "Soto Ayam",
        time: "25 min",
        rating: "⭐ 4.7",
        img: "/img/Soto.jpg"
    },
    {
        title: "Bakso Kuah",
        time: "18 min",
        rating: "⭐ 4.6",
        img: "/img/Bakso.jpg"
    },
    {
        title: "Mie Goreng",
        time: "12 min",
        rating: "⭐ 4.5",
        img: "/img/Mie.jpg"
    },
    {
        title: "Rendang",
        time: "60 min",
        rating: "⭐ 5.0",
        img: "/img/Rendang.jpg"
    },
    {
        title: "Seblak",
        time: "10 min",
        rating: "⭐ 4.8",
        img: "/img/Seblak.jpg"
    },
    {
        title: "Kwetiau Goreng",
        time: "14 min",
        rating: "⭐ 4.7",
        img: "/img/Kwetiaw.jpg"
    },
    {
        title: "Capcay Kuah",
        time: "22 min",
        rating: "⭐ 4.6",
        img: "/img/Capcay.jpg"
    },
    ];

    export default function TodaysPick() {
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
            {todaysPickData.map((item, idx) => (
            <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer"
            >
                <div className="h-44 w-full bg-gray-300">
                <img
                    src={item.img}
                    alt={item.title}
                    className="h-44 w-full object-cover"
                />
                </div>

                <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                    {item.time} • {item.rating}
                </p>
                </div>
            </motion.div>
            ))}
        </div>
        </section>
    );
}
