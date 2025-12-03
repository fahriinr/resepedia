"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:2045/api/auth/login",
        { email, password },
        { withCredentials: true } // penting kalau lu pakai cookie jwt
      );

      console.log(res.data);

      router.push("/"); // redirect
    } catch (err: any) {
      alert(err.response?.data?.message || "Login gagal");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="text-black font-bold text-lg">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mt-1 bg-[#FAF7E8] text-black placeholder-[#8B6E4A] border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          placeholder="example@gmail.com"
          required
        />
      </div>

      <div>
        <label className="text-black font-bold text-lg">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mt-1 bg-[#FAF7E8] text-black placeholder-[#8B6E4A] border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          placeholder="********"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-lg font-semibold bg-green-500 text-white hover:bg-green-700 transition"
      >
        Sign In
      </button>
    </form>
  );
}
