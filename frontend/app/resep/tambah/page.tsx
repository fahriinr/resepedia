"use client";

import { useState, useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import axios from "axios";
import ClientSelect from "@/components/ClientSelect";

type Ingredient = {
    id_bahan: number;
    nama_bahan: string;
    satuan: string;
};

type Category = {
    id_kategori: number;
    nama_kategori: string;
};

type Option = {
    value: number | Ingredient | string;
    label: string;
    data?: any; // To store extra info like satuan
};

type BahanState = {
    id_bahan: number | null;
    nama: string; // for display in select input if needed, though react-select handles label
    takaran: number | "";
    satuan: string;
};

export default function TambahResepPage() {
    // ===== STATE BARU SESUAI FLOW =====
    const [namaResep, setNamaResep] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    
    // Kategori sekarang menyimpan ID (number) atau null
    const [kategoriId, setKategoriId] = useState<number | null>(null);
    const [kategoriOptions, setKategoriOptions] = useState<Option[]>([]);

    const [tingkatKesulitan, setTingkatKesulitan] = useState("");
    const [fotoFile, setFotoFile] = useState<File | null>(null);

    // Porsi & Waktu Masak
    const [porsi, setPorsi] = useState<number | "">("");
    const [waktuMasak, setWaktuMasak] = useState<number | "">("");

    // ===== BAHAN =====
    const [bahanList, setBahanList] = useState<BahanState[]>([
        { id_bahan: null, nama: "", takaran: "", satuan: "" },
    ]);
    const [ingredientOptions, setIngredientOptions] = useState<Option[]>([]);

    const [langkah, setLangkah] = useState<string[]>([""]);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // Fetch Categories & Ingredients
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, ingRes] = await Promise.all([
                    axios.get("http://localhost:2045/api/kategori"),
                    axios.get("http://localhost:2045/api/bahan")
                ]);

                if (catRes.data?.data) { // Assuming response structure is { data: [...] } based on ingredient code
                     // Check if data is directly array or inside data property. 
                     // User said: "responsenya ada id_kategori int dan nama_kategori string". 
                     // Usually standard response wrapper is used. I'll stick to common pattern or what was seen in IngredientInput.
                    const cats = Array.isArray(catRes.data) ? catRes.data : catRes.data.data || []; 
                    setKategoriOptions(cats.map((c: Category) => ({
                        value: c.id_kategori,
                        label: c.nama_kategori
                    })));
                }

                if (ingRes.data?.data) {
                    const ings = Array.isArray(ingRes.data) ? ingRes.data : ingRes.data.data || [];
                    setIngredientOptions(ings.map((i: Ingredient) => ({
                        value: i.id_bahan,
                        label: i.nama_bahan,
                        data: i // Store full object to get satuan
                    })));
                }

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        fetchData();
    }, []);

    // Upload foto
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            setFotoFile(file);
        }
    };

    const addBahan = () => {
        setBahanList([
            ...bahanList,
            { id_bahan: null, nama: "", takaran: "", satuan: "" },
        ]);
    };

    const updateBahanSelect = (index: number, option: Option | null) => {
        const updated = [...bahanList];
        if (option) {
            const ingData = option.data as Ingredient;
            updated[index].id_bahan = ingData.id_bahan; // Use ID from value
            updated[index].nama = option.label;
            updated[index].satuan = ingData.satuan;
        } else {
            updated[index].id_bahan = null;
            updated[index].nama = "";
            updated[index].satuan = "";
        }
        setBahanList(updated);
    };

    const updateBahanTakaran = (index: number, val: string) => {
        const updated = [...bahanList];
        updated[index].takaran = val === "" ? "" : Number(val);
        setBahanList(updated);
    };

    const removeBahan = (index: number) => {
        if (bahanList.length === 1) return;
        setBahanList(bahanList.filter((_, i) => i !== index));
    };

    const addLangkah = () => setLangkah([...langkah, ""]);
    const updateLangkah = (i: number, v: string) => {
        const newItems = [...langkah];
        newItems[i] = v;
        setLangkah(newItems);
    };

    // ===== KUMPULKAN SEMUA STATE SAAT SIMPAN =====
    const handleSubmit = async () => {
        const payload = {
            nama_resep: namaResep,
            deskripsi,
            foto: "dummy.jpg", 
            id_kategori: kategoriId, 
            tingkat_kesulitan: tingkatKesulitan,
            waktu_masak: Number(waktuMasak),
            langkah_memasak: langkah.filter(l => l.trim() !== ""), 
            porsi: `${porsi} orang`, 
            bahan: bahanList.map(b => ({
                id_bahan: b.id_bahan,
                takaran: Number(b.takaran)
            })).filter(b => b.id_bahan !== null)
        };

        const token = localStorage.getItem("token");
        console.log("Token:", token);
        if (!token) {
            alert("Anda belum login! Silakan login terlebih dahulu.");
            // router.push("/login"); // Optional: redirect if you had router
            return;
        }

        try {
            const response = await axios.post("http://localhost:2045/api/resep/add", payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Response:", response.data);
            alert("Resep berhasil disimpan!");
            // Optional: Redirect or reset form here if needed
        } catch (error) {
            console.error("Error submitting recipe:", error);
            alert("Gagal menyimpan resep. Cek console untuk detail error.");
        }
    };

    return (
        <main className="min-h-screen bg-green-50 py-16 px-4">
            <h1 className="text-center text-4xl font-bold text-gray-800 mb-10">
                Tambah Resep Baru
            </h1>

            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-10">
                <h2 className="text-2xl font-semibold mb-6 text-gray-700">
                    Detail Resep
                </h2>

                {/* FOTO */}
                <label className="block mb-2 font-medium text-gray-700">Foto Resep</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition relative">
                    <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleImageUpload}
                    />

                    {previewImage ? (
                        <img
                            src={previewImage}
                            className="w-full h-60 object-cover rounded-lg"
                        />
                    ) : (
                        <>
                            <FiUpload className="text-4xl text-gray-400 mb-2" />
                            <p className="text-gray-500">
                                Klik atau drag & drop foto resep di sini
                            </p>
                        </>
                    )}
                </div>

                {/* NAMA */}
                <label className="block mt-6 mb-1 font-medium text-gray-700">
                    Nama Resep
                </label>
                <input
                    value={namaResep}
                    onChange={(e) => setNamaResep(e.target.value)}
                    placeholder="Contoh: Nasi Goreng Spesial"
                    className="w-full p-3 bg-[#F9F6E3] mt-2 rounded-xl border text-black focus:outline-none focus:ring-yellow-400"
                />

                {/* DESKRIPSI */}
                <label className="block mt-6 mb-1 font-medium text-gray-700">
                    Deskripsi Singkat
                </label>
                <textarea
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    rows={3}
                    placeholder="Ceritakan sedikit tentang resep ini..."
                    className="w-full p-3 rounded-xl bg-[#fbf6e8] border text-black resize-none focus:outline-none focus:ring-yellow-400"
                />

                {/* DROPDOWN STYLE */}
                <style>
                    {`
                        .dropdown-custom {
                            background: #fbf6e8;
                            border: 1px solid #5b5c5eff;
                            border-radius: 12px;
                            padding: 12px;
                            color: #bdb6b6ff !important;
                            font-size: 16px;
                            outline: none;
                            transition: all .2s ease;
                        }
                    `}
                </style>

                {/* KATEGORI + TINGKAT + PORSI + WAKTU */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Kategori
                        </label>
                        <ClientSelect
                            options={kategoriOptions}
                            value={kategoriOptions.find((o) => o.value === kategoriId) || null}
                            onChange={(option: any) => setKategoriId(option ? option.value : null)}
                            placeholder="Pilih kategori"
                            className="w-full text-black"
                             styles={{
                                control: (base) => ({
                                    ...base,
                                    backgroundColor: '#fbf6e8', // matching existing bg
                                    borderColor: '#d1d5db',
                                    borderRadius: '12px',
                                    padding: '5px'
                                }),
                            }}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Tingkat Kesulitan
                        </label>
                        <select
                            value={tingkatKesulitan}
                            onChange={(e) => setTingkatKesulitan(e.target.value)}
                            className="dropdown-custom w-full text-black"
                        >
                            <option value="">Pilih tingkat</option>
                            <option value="Mudah">Mudah</option>
                            <option value="Normal">Normal</option>
                            <option value="Sulit">Sulit</option>
                        </select>
                    </div>

                     <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Porsi (Orang)
                        </label>
                         <input
                            type="number"
                            value={porsi}
                            onChange={(e) => setPorsi(e.target.value === "" ? "" : Number(e.target.value))}
                            placeholder="Contoh: 2"
                            className="w-full p-3 bg-[#F9F6E3] rounded-xl border text-black focus:outline-none focus:ring-yellow-400"
                        />
                    </div>
                    
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Waktu Masak (Menit)
                        </label>
                         <input
                            type="number"
                            value={waktuMasak}
                            onChange={(e) => setWaktuMasak(e.target.value === "" ? "" : Number(e.target.value))}
                            placeholder="Contoh: 30"
                            className="w-full p-3 bg-[#F9F6E3] rounded-xl border text-black focus:outline-none focus:ring-yellow-400"
                        />
                    </div>
                </div>

                {/* BAHAN */}
                <div className="mt-10">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-700">
                            Bahan-bahan
                        </h3>

                        <button
                            onClick={addBahan}
                            className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded-xl text-white font-bold hover:bg-green-600"
                        >
                            <span className="text-white font-bold">+</span>
                            Tambah Bahan
                        </button>
                    </div>

                    {bahanList.map((item, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-4 items-center"
                        >
                            {/* Nama Bahan (Select) */}
                            <div className="md:col-span-3">
                                <ClientSelect
                                    options={ingredientOptions}
                                    value={item.id_bahan ? { value: item.id_bahan, label: item.nama } : null}
                                    onChange={(option: any) => updateBahanSelect(index, option)}
                                    placeholder="Pilih Bahan"
                                    className="text-black"
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            backgroundColor: '#F9F6E3',
                                            borderColor: '#e5e7eb',
                                            borderRadius: '0.75rem', // xl
                                            padding: '2px'
                                        }),
                                    }}
                                />
                            </div>

                            {/* Takaran */}
                            <input
                                type="number"
                                value={item.takaran}
                                onChange={(e) =>
                                    updateBahanTakaran(index, e.target.value)
                                }
                                placeholder="Takaran"
                                className="md:col-span-2 p-3 rounded-xl bg-[#F9F6E3] text-gray-700 border font-medium"
                            />

                            {/* Satuan (Read only) */}
                            <input
                                value={item.satuan}
                                readOnly
                                placeholder="Satuan"
                                className="md:col-span-1 p-3 rounded-xl bg-gray-100 text-gray-500 border font-medium cursor-not-allowed"
                            />

                            {/* Tombol Hapus */}
                            <button
                                type="button"
                                onClick={() => removeBahan(index)}
                                className="md:col-span-1 w-10 h-10 rounded-xl bg-red-300 text-red-500 font-bold hover:bg-red-400 transition"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between mt-10 mb-5">
                    {/* LANGKAH */}
                    <h3 className="text-xl font-semibold text-gray-700">
                        Langkah Memasak
                    </h3>

                    <button
                        onClick={addLangkah}
                        className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 font-bold"
                    >
                        + Tambah Langkah
                    </button>
                </div>


                {langkah.map((l, i) => (
                    <div key={i} className="flex items-start mb-3 gap-3">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-200 font-bold text-gray-700">
                            {i + 1}
                        </div>

                        <textarea
                            value={l}
                            onChange={(e) => updateLangkah(i, e.target.value)}
                            placeholder={`Langkah ${i + 1}`}
                            className="flex-1 p-3 rounded-xl bg-[#fbf6e8] text-gray-700 font-medium resize-none"
                        />
                    </div>
                ))}

                

                {/* SIMPAN RESEP */}
                <button
                    onClick={handleSubmit}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl text-lg font-semibold"
                >
                    Simpan Resep
                </button>
            </div>
        </main>
    );
}
