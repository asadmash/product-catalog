import Link from 'next/link'
import React, { useState } from 'react'

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <nav className='bg-gray-800 text-white p-4 flex justify-between items-center'>
      <Link href="/" className="text-xl font-bold">Product Catalog</Link>
       <div>
        <Link href='/' className=" mr-4 hover:underline">
        Home
        </Link>

        {isLoggedIn ? (
            <button onClick={() => setIsLoggedIn(false)}>
                Logout
            </button>
        ) : (
            <Link href={`/login`} className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700">
            Login
            </Link>
        )}
      </div>
    </nav>
  )
}
