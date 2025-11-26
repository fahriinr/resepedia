"use client";

import "./globals.css";
import Navbar from "@/components/navbar";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "./context/authDummy";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <AuthProvider>
            <Navbar />      {/* Pastikan navbar di dalam provider */}
            {children}
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
