"use client";

import { useEffect, useState } from "react";
import Select, { SingleValue, MultiValue, ActionMeta } from "react-select";
import axios from "axios";
import ClientSelect from "./ClientSelect";

interface Ingredient {
    id_bahan: number;
    nama_bahan: string;
    satuan: string;
}

interface Option {
    value: Ingredient; // Store full object in value
    label: string;
}

export default function IngredientInput({ onAdd }: { onAdd: (v: Ingredient) => void }) {
    const [options, setOptions] = useState<Option[]>([]);
    const [selectedOption, setSelectedOption] = useState<SingleValue<Option>>(null);

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await axios.get("http://localhost:2045/api/bahan");
                if (response.data && response.data.data) {
                    const fetched: Ingredient[] = response.data.data;
                    const formattedOptions = fetched.map((item) => ({
                        value: item,
                        label: item.nama_bahan,
                    }));
                    setOptions(formattedOptions);
                }
            } catch (error) {
                console.error("Failed to fetch ingredients:", error);
            }
        };

        fetchIngredients();
    }, []);

    const handleChange = (
        newValue: SingleValue<Option> | MultiValue<Option>,
        actionMeta: ActionMeta<Option>
    ) => {
        if (Array.isArray(newValue)) return; // Handle single selection only

        setSelectedOption(newValue as SingleValue<Option>);
        if (newValue) {
            onAdd((newValue as Option).value);
            setSelectedOption(null);
        }
    };

    return (
        <div className="mt-4">
            <ClientSelect<Option>
                value={selectedOption}
                onChange={handleChange}
                options={options}
                placeholder="Cari bahan yang kamu punya..."
                className="text-gray-700"
                styles={{
                    control: (base) => ({
                        ...base,
                        padding: "6px",
                        borderRadius: "12px",
                        borderColor: "#86efac", // green-300
                        boxShadow: "none",
                        "&:hover": {
                            borderColor: "#4ade80", // green-400
                        }
                    }),
                    option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused ? "#dcfce7" : "white", // green-100
                        color: "#166534", // green-800
                        cursor: "pointer",
                    })
                }}
            />
        </div>
    );
}
