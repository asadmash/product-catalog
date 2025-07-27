"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  // Mock login function — normally call API here
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace this with real API call and token retrieval
    if (username === "admin" && password === "password") {
      login("fake-jwt-token");
    } else {
      alert("Invalid credentials");
    }
  };

    return (
    <main className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-80 p-6 border rounded">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-3 w-full p-2 border"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3 w-full p-2 border"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Login
        </button>
      </form>
    </main>
  );
}