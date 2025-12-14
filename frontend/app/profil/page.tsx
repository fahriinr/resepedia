"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { resepBanner } from "@/types/resepBanner";
import axios from "axios";
import { CircleUserRound, Clock, MoreHorizontalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type User = {
  id: number;
  name: string;
  email: string;
  password?: string;
};

export default function ProfilPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [reseps, setReseps] = useState<resepBanner[]>([]);
  const [favorites, setFavorites] = useState<resepBanner[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (saved) setUser(JSON.parse(saved));

    const fetchData = async () => {
      try {
        // Fetch User Profile
        const userRes = await fetch("http://localhost:2045/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = await userRes.json();
        if (userData.data) {
          setUser(userData.data);
          localStorage.setItem("user", JSON.stringify(userData.data));
        }

        // Fetch My Recipes
        const resepRes = await fetch(
          "http://localhost:2045/api/resep/my-resep",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const resepData = await resepRes.json();
        setReseps(resepData.data);

        // Fetch Favorites
        const favRes = await fetch("http://localhost:2045/api/resep/favorit", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const favData = await favRes.json();
        setFavorites(favData.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    if (token) fetchData();
  }, []);

  const handleDeleteResep = async (id: number) => {
    const confirmDelete = confirm(
      "Apakah anda yakin ingin menghapus resep ini?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:2045/api/resep/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Remove the deleted item from state
      setReseps((prev) => prev.filter((r) => r.id_resep !== id));
      alert("Resep berhasil dihapus");
    } catch (error) {
      console.error("Gagal menghapus resep", error);
      alert("Gagal menghapus resep");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex justify-center">
      <div className="w-full max-w-5xl bg-white mt-6 rounded-2xl shadow-sm px-8 py-6">
        {/* HEADER */}
        <h1 className="text-center text-gray-700 text-xl font-bold tracking-wide mb-6">
          INFORMASI AKUN
        </h1>

        {/* PROFIL ATAS */}
        <div className="flex items-center gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-purple-500 flex items-center justify-center">
            <CircleUserRound className="w-14 h-14 text-white" />
          </div>

          {/* Info User */}
          <div>
            <h2 className="text-lg text-gray-700 font-bold">{user?.name}</h2>
            <p className="text-gray-600 font-semibold">{user?.email}</p>

            <div className="flex gap-6 mt-2 text-sm text-gray-700">
              <span>0 Mengikuti</span>
              <span>0 Pengikut</span>
            </div>
          </div>
        </div>

        {/* BUTTON EDIT */}
        <button
          onClick={() => router.push("/profil/edit")}
          className="w-full mt-4 rounded-xl bg-green-500 hover:bg-green-600 text-white-700 py-2 font-semibold"
        >
          Edit Profile
        </button>

        {/* TAB */}
        <div className="mt-8">
          <Tabs defaultValue="my-recipes" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="my-recipes">
                Resep Saya ({reseps?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="favorites">
                Favorit ({favorites?.length || 0})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="my-recipes">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
                {reseps?.map((resep, idx) => (
                  <div
                    key={idx}
                    className="relative bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer"
                    onClick={() => router.push(`/resep/${resep.id_resep}`)}
                  >
                    <div className="h-44 w-full bg-gray-300">
                      <img
                        src={`/img/${resep.foto_resep}`}
                        alt={resep.foto_resep}
                        className="h-44 w-full object-cover"
                      />
                    </div>

                    <div className="absolute top-3 right-3 z-20">
                      <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            aria-label="Open menu"
                            size="icon-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <MoreHorizontalIcon />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/resep/edit/${resep.id_resep}`);
                            }}
                          >
                            Ubah Resep
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-500"
                            onClick={() => handleDeleteResep(resep.id_resep)}
                          >
                            Hapus Resep
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-800">
                        {resep.nama_resep}
                      </h3>
                      <div className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{resep.waktu_memasak}min</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="favorites">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
                {favorites?.map((fav, idx) => (
                  <div
                    key={idx}
                    className="relative bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer"
                    onClick={() => router.push(`/resep/${fav.id_resep}`)} // Assuming id_resep is available, need to check API response
                  >
                    <div className="h-44 w-full bg-gray-300">
                      <img
                        src={`/img/${fav.foto_resep}`} // Verify if 'foto_resep' is correct property
                        alt={fav.nama_resep}
                        className="h-44 w-full object-cover"
                      />
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-800">
                        {fav.nama_resep}
                      </h3>
                      <div className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>
                          {fav.waktu_memasak ? fav.waktu_memasak : 30}
                          min
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {favorites?.length === 0 && (
                  <div className="col-span-full text-center text-gray-500 py-10">
                    Belum ada resep favorit.
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
