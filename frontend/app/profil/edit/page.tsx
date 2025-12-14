"use client";

import { CircleUserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "../page";
import axios from "axios";

export default function EditProfilPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (saved) setUser(JSON.parse(saved));
    const fetchResep = async () => {
      const response = await fetch("http://localhost:2045/api/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
    };
    fetchResep();
  }, []);

  const handleSubmit = async () => {
    const payload = {
      name: user?.name,
      email: user?.email,
      password: user?.password,
    };

    try {
      const response = await axios.patch(
        "http://localhost:2045/api/user/profile",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);

      router.push("/profil");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-green-100 flex justify-center">
      <div className="w-full max-w-3xl bg-white mt-10 rounded-2xl shadow px-10 py-8">
        {/* TITLE */}
        <h1 className="text-center text-xl font-bold text-gray-700 mb-8">
          Edit Profile
        </h1>

        {/* AVATAR */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-purple-500 flex items-center justify-center mb-3">
            <CircleUserRound className="w-12 h-12 text-white" />
          </div>

          <button className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-1.5 rounded-lg text-sm transition">
            Ubah Foto Profile
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nama Pengguna
            </label>
            <input
              type="text"
              value={user?.name || ""}
              onChange={(e) => {
                if (user) setUser({ ...user, name: e.target.value });
              }}
              className="w-full bg-green-50 border text-gray-700 font-medium rounded-lg px-4 py-2 focus:outline-none border"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              onChange={(e) => {
                if (user) setUser({ ...user, email: e.target.value });
              }}
              className="w-full bg-green-50 border text-gray-700 font-medium rounded-lg px-4 py-2 focus:outline-none border"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={user?.password || ""}
              onChange={(e) => {
                if (user) setUser({ ...user, password: e.target.value });
              }}
              className="w-full bg-green-50 border text-gray-700 font-medium rounded-lg px-4 py-2 focus:outline-none border"
            />
          </div>
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSubmit}
          className="w-full mt-8 bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-semibold transition"
        >
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}
