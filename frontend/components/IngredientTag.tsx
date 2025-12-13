"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Ingredient {
    id_bahan: number;
    nama_bahan: string;
    satuan: string;
}

export default function IngredientTag({ onSelect }: { onSelect: (v: Ingredient) => void }) {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await axios.get("http://localhost:2045/api/bahan");
                if (response.data && response.data.data) {
                    const fetched: Ingredient[] = response.data.data;
                    setIngredients(fetched.slice(0, 18));
                }
            } catch (error) {
                console.error("Failed to fetch ingredients:", error);
            }
        };

        fetchIngredients();
    }, []);

    return (
        <div className="flex gap-2 flex-wrap mt-3">
        {ingredients.map((item) => (
            <button
            key={item.id_bahan}
            onClick={() => onSelect(item)}
            className="
                px-4 py-2
                rounded-full
                bg-green-100 
                text-green-800
                text-sm font-medium
                border border-green-300
                shadow-sm
                hover:bg-green-200 hover:border-green-400
                active:scale-95
                transition
            "
            >
            {item.nama_bahan}
            </button>
        ))}
        </div>
    );
}
