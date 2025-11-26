"use client";

export default function SignUpForm() {
    return (
        <form className="space-y-4">
        <div>
            <label className="text-black font-bold">Full Name</label>
            <input
            type="text"
            className="w-full p-3 mt-1 bg-[#FAF7E8] text-black placeholder-[#8B6E4A] border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="Your name"
            required
            />
        </div>

        <div>
            <label className="text-black font-bold">Email</label>
            <input
            type="email"
            className="w-full p-3 mt-1 bg-[#FAF7E8] text-black placeholder-[#8B6E4A] border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="example@gmail.com"
            required
            />
        </div>

        <div>
            <label className="text-black font-bold">Password</label>
            <input
            type="password"
            className="w-full p-3 mt-1 bg-[#FAF7E8] text-black placeholder-[#8B6E4A] border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            placeholder="********"
            required
            />
        </div>

        <button
            type="submit"
            className="w-full py-2 rounded-lg font-semibold bg-green-500 text-white hover:bg-green-700 transition"
        >
            Sign Up
        </button>
        </form>
    );
}
