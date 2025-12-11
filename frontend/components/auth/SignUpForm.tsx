"use client";

import axios from "axios";
import { useState } from "react";

export default function SignUpForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

    try {
        const res = await axios.post("http://localhost:2045/api/auth", form);

        setSuccess(res.data.message || "Registered successfully");
        } catch (err: any) {
        setError(err.response?.data?.message || "Something went wrong");
        } finally {
        setLoading(false);
        }
    };
    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
            <label className="text-black font-bold">Full Name</label>
            <input
            type="text"
            name="name"
            className="w-full p-3 mt-1 bg-[#FAF7E8] text-black placeholder-[#8B6E4A] border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
        />
        </div>

        <div>
            <label className="text-black font-bold">Email</label>
            <input
            type="email"
            name="email"
            className="w-full p-3 mt-1 bg-[#FAF7E8] text-black placeholder-[#8B6E4A] border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="example@gmail.com"
            value={form.email}
            onChange={handleChange}
            required
            />
        </div>

        <div>
            <label className="text-black font-bold">Password</label>
            <input
            name="password"
            type="password"
            className="w-full p-3 mt-1 bg-[#FAF7E8] text-black placeholder-[#8B6E4A] border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="********"
            value={form.password}
            onChange={handleChange}
            required
            />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <button
            type="submit"
            className="w-full py-2 rounded-lg font-semibold bg-green-500 text-white hover:bg-green-700 transition"
            disabled={loading}
        >
            {loading ? "Processing..." : "Sign Up"}
        </button>
        </form>
    );
}
