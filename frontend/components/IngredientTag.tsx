"use client";

// bahan populer 
const popularIngredient = [
    "Ayam", "Ikan", "Bawang Merah", "Bawang Putih", "Bawang Bombay", "Daging Sapi", "Tomat", "Cabai",
    "Nasi", "Mie", "Bihun", "Kwetiaw"
]

export default function IngredientTag({ onSelect }: { onSelect: (v: string) => void }) {
    return (
        <div className="flex gap-2 flex-wrap mt-3">
        {popularIngredient.map((item) => (
            <button
            key={item}
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
            {item}
            </button>
        ))}
        </div>
    );
}
