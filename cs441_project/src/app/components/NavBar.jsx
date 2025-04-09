import React from 'react';
import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className="bg-black border-b border-gray-800 shadow-md px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-bold text-white hover:text-gray-300 transition-colors cursor-pointer">
            Healthcare Appeals
          </span>
        </Link>
        <div className="space-x-6">
          <Link href="/">
            <span className="text-white hover:text-gray-300 transition-colors cursor-pointer">Home</span>
          </Link>
          <Link href="/about">
            <span className="text-white hover:text-gray-300 transition-colors cursor-pointer">About</span>
          </Link>
          <Link href="/data">
            <span className="text-white hover:text-gray-300 transition-colors cursor-pointer">Data</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 