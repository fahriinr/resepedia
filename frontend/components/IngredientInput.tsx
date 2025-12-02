"use client";

import { useState } from "react";

export default function IngredientInput({ onAdd }: { onAdd: (v: string) => void }) {
    const [value, setValue] = useState("");

    const handleAdd = () => {
        if (value.trim() !== "") {
        onAdd(value.trim());
        setValue("");
        }
    };

    return (
        <div className="flex items-center gap-3 mt-4">
        <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Masukkan bahan yang kamu punya..."
            className="
            flex-1 p-4 rounded-xl
            bg-white 
            border border-green-300
            placeholder:text-gray-400
            text-gray-700
            shadow-sm
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
            "
        />

        <button
            onClick={handleAdd}
            className="
            w-12 h-12 rounded-xl 
            bg-green-500 text-white 
            text-2xl font-bold 
            flex items-center justify-center
            hover:bg-green-600 duration-150
            "
        >
            +
        </button>
        </div>
    );
}
