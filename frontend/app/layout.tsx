"use client";

import "./globals.css";
import Navbar from "@/components/navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
            <Navbar />      {/* Pastikan navbar di dalam provider */}
            {children}
      </body>
    </html>
  );
}
