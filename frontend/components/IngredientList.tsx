"use client";

interface IngredientListProps {
    items: string[];
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
            {item}
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
