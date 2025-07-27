"use client";
import Link from "next/link";
import React from "react";
import CartCounter from "./CartCounter";
import { useAuth } from "../context/AuthContext";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { state, logout } = useAuth();
  const pathname = usePathname();
  return (
    <nav className="bg-gray-800 text-white p-4 md:px-12 flex justify-between items-center sticky top-0  shadow-md">
      <Link href="/" className="text-xl font-bold">
        Product Catalog
      </Link>
      <div className="flex gap-4">
        {pathname !== "/" && (
          <Link href="/" className=" mr-4 hover:underline">
            Home
          </Link>
        )}
        <CartCounter />
        {state.isAuthenticated ? (
          <>
            <span>admin</span>
            <button
              onClick={logout}
              className="bg-blue-600 hover:bg-red-700 px-5 rounded"
            >
              Log out
            </button>
          </>
        ) : (
          <button className="bg-red-600 hover:bg-blue-700 px-5 rounded">
            <a href="/login">Log in</a>
          </button>
        )}
      </div>
    </nav>
  );
}
