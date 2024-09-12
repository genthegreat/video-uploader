"use client"

import React from 'react';
import { useRouter } from 'next/navigation';

const Header = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const router = useRouter();

  const handleAuthClick = () => {
    if (isAuthenticated) {
        router.push('/api/logout');
    } else {
        router.push('/api/youtube/auth');
    }
  };

  return (
    <header className="bg-gray-800">
      <nav className="flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3">
          <a href="/" className="text-xl font-bold">Home</a>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleAuthClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {isAuthenticated ? 'Logout' : 'Login'}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
