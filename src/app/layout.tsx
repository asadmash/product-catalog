import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import CartModal from "@/components/CartModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Product Catalog",
  description: "Browse and explore exclusive products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex-col">
        <CartProvider>
          <Navbar />
          <CartModal />
          <main className="flex-grow container mx-auto px-4 py-6">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
