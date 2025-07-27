'use client';
import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export default function SearchBar({onSearch}: SearchBarProps){
  const [input, setInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    onSearch(value);
  }

  return(
    <input
    type="text"
    placeholder="Search Products..."
    value={input}
    onChange={handleChange}
    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  )
}