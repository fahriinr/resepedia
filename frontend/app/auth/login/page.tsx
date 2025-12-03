"use client";

import { useState } from "react";
import SignInForm from "@/components/auth/signinform";
import SignUpForm from "@/components/auth/SignUpForm";

export default function LoginPage() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8 space-y-6">
        <h1 className="text-2xl font-bold text-black text-center mb-2">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>

        <p className="text-center text-gray-600 text-sm mb-4">
          {isSignIn
            ? "Masuk untuk memulai pengalaman memasak lebih mudah"
            : "Daftar dan mulai eksplorasi resep terbaik"}
        </p>

        {isSignIn ? <SignInForm /> : <SignUpForm />}

        <p className="text-sm text-center text-black mt-4">
          {isSignIn ? (
            <>
              Don`t have an account?{" "}
              <span
                onClick={() => setIsSignIn(false)}
                className="text-green-400 hover:underline cursor-pointer font-medium"
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setIsSignIn(true)}
                className="text-green-400 hover:underline cursor-pointer font-medium"
              >
                Sign In
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
