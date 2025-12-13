"use client";

interface Ingredient {
    id_bahan: number;
    nama_bahan: string;
    satuan: string;
}

interface IngredientListProps {
    items: Ingredient[];
    onRemove?: (i: number) => void;
}

export default function IngredientList({ items, onRemove }: IngredientListProps) {
    return (
        <div className="flex gap-2 flex-wrap mt-4">
        {items.map((item, i) => (
            <span
            key={i}
            className="bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-2"
            >
            {item.nama_bahan}
            <button
                onClick={() => onRemove?.(i)}   // ← FIX
                className="text-red-500 font-bold hover:text-red-700"
            >
                ×
            </button>
            </span>
        ))}
        </div>
    );
}
