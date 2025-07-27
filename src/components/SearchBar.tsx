"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import debounce from "lodash.debounce";

export default function SearchBar({ onSearch }: SearchBarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const defaultValue = searchParams.get("q") || "";
  const [query, setQuery] = useState(defaultValue);

  // Debounced search function
  const handleSearch = debounce((value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value.trim()) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    router.replace(`/?${params.toString()}`);
  }, 300); // 300ms debounce

  useEffect(() => {
    handleSearch(query);
    // cancel debounce on unmount
    return () => {
      handleSearch.cancel();
    };
  }, [query]);

  return (
    <input
      type="text"
      placeholder="Search products..."
      className="input input-bordered input-sm w-64 shadow-lg border-2 border-[#27548A] p-2 bg-[#fff]"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
