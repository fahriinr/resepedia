"use client";

import "./globals.css";
import Navbar from "@/components/navbar";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
            <Navbar />      {/* Pastikan navbar di dalam provider */}
            {children}
        </SessionProvider>
      </body>
    </html>
  );
}
