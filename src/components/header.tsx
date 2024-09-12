"use client"

export default function Header({ isAuthenticated }: { isAuthenticated: boolean }) {

  return (
    <header className="bg-gray-100">
      <ul className="container flex flex-wrap items-center justify-between mx-auto p-2 space-x-6 ms-5">
        <li className="text-lg my-2">
          <a href="/" className="my-2 py-2 px-4 border border-transparent rounded-md text-sm text-white font-medium bg-black hover:bg-gray-900 focus:ring-black focus:outline-none focus:ring-2 focus:ring-offset-2">Home</a>
        </li>
        <li className="text-lg my-2">
          <a
            href={isAuthenticated ? '/api/logout' : '/api/youtube/auth'}
            className={`my-2 py-2 px-4 border border-transparent rounded-md text-sm font-medium ${isAuthenticated ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'} focus:outline-none focus:ring-2 focus:ring-offset-2`}
          >
            {isAuthenticated ? 'Logout' : 'Login'}
          </a>
        </li>
      </ul>
    </header>
  );
};
