"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Send, User as UserIcon } from "lucide-react";

interface Comment {
  id_komentar: number;
  nama_user: string;
  isi_komentar: string;
  tanggal_komentar: string;
}

interface CommentsSectionProps {
  resepId: number | string;
}

export default function CommentsSection({ resepId }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    // Get user from local storage for UI purposes if needed, though API handles the actual auth
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    fetchComments();
  }, [resepId]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:2045/api/resep/${resepId}/comments`
      );
      if (res.data && res.data.data) {
        setComments(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Silakan login terlebih dahulu untuk memberikan komentar.");
        return;
      }

      await axios.post(
        `http://localhost:2045/api/resep/${resepId}/comments`,
        { komentar: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setNewComment("");
      fetchComments(); // Refresh comments
    } catch (err) {
      console.error("Error posting comment:", err);
      alert("Gagal mengirim komentar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Komentar</h2>

      {/* Comment Input */}
      <div className="flex gap-4 mb-8">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
          <UserIcon className="w-6 h-6" />
        </div>
        <div className="flex-grow">
          <form
            onSubmit={handleSubmit}
            className="border border-gray-200 rounded-xl p-4 focus-within:border-orange-300 transition-colors"
          >
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Tambahkan Komentar"
              className="w-full h-24 resize-none focus:outline-none text-gray-700 placeholder-orange-300"
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={isSubmitting || !newComment.trim()}
                className="bg-orange-400 hover:bg-orange-500 disabled:bg-orange-200 text-white px-6 py-2 rounded-lg font-semibold transition-colors text-sm"
              >
                {isSubmitting ? "Mengirim..." : "Kirim"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <hr className="border-gray-100 mb-8" />

      {/* Comments List */}
      <div className="space-y-6">
        {loading ? (
          <p className="text-gray-500 text-center">Memuat komentar...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-400 text-center">Belum ada komentar.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id_komentar} className="flex gap-4 group">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white">
                <UserIcon className="w-6 h-6" />
              </div>
              <div className="flex-grow">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-bold text-gray-800">
                    {comment.nama_user}
                  </h3>
                  {/* Optional: Add date specific formatting if needed */}
                  {/* <span className="text-xs text-gray-400">{new Date(comment.tanggal_komentar).toLocaleDateString()}</span> */}
                </div>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {comment.isi_komentar}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
