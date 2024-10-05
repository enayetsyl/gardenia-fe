'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import userImage from '../../../public/user-profile-image-2.jpg'

interface NavItem {
  name: string;
  path: string;
}

const navItems: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'News Feed', path: '/news-feed' },
  { name: 'Gallery', path: '/image-gallery' },
  { name: 'About Us', path: '/about-us' },
  { name: 'Contact', path: '/contact-us' },
];

interface User {
  name: string;
  image: string;
}

// Mock user state (replace with actual auth logic)
const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  return { user, setUser };
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const { user, setUser } = useUser();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogin = () => {
    // Mock login (replace with actual login logic)
    setUser({ name: 'John Doe', image: '/path-to-user-image.jpg' });
  };

  const handleLogout = () => {
    setUser(null);
    setIsDropdownOpen(false);
  };
/* From Uiverse.io by ilkhoeri */ 
{/* <button
  class="group flex items-center justify-center relative z-10 [transition:all_0.5s_ease] rounded-[0.375rem] p-[5px] cursor-pointer border border-[#999] outline-none focus-visible:outline-0"
>
  <svg
    fill="currentColor"
    stroke="none"
    stroke-width="0"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    class="w-7 h-7 overflow-visible [transition:transform_.35s_ease] group-hover:[transition-delay:.25s] [&amp;_path]:[transition:transform_.35s_ease] group-hover:rotate-45"
  >
    <path
      class="group-hover:[transform:rotate(112.5deg)_translate(-27.2%,-80.2%)]"
      d="m3.45,8.83c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31L14.71,2.08c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31L3.84,8.75c-.13.05-.25.08-.38.08Z"
    ></path>
    <path
      class="group-hover:[transform:rotate(22.5deg)_translate(15.5%,-23%)]"
      d="m2.02,17.13c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31L21.6,6.94c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31L2.4,17.06c-.13.05-.25.08-.38.08Z"
    ></path>
    <path
      class="group-hover:[transform:rotate(112.5deg)_translate(-15%,-149.5%)]"
      d="m8.91,21.99c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31l11.64-4.82c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31l-11.64,4.82c-.13.05-.25.08-.38.08Z"
    ></path>
  </svg>
</button> */}

  return (
    <nav className="bg-background-light p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-primary text-2xl font-bold">
          GardenApp
        </Link>
        
        {/* Desktop menu */}
        <div className="hidden lg:flex space-x-4 items-center">
          {navItems.map((item: NavItem) => (
            <Link
              key={item.path}
              href={item.path}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                pathname === item.path
                  ? 'bg-background-dark text-primary font-semibold shadow-neomorphic-inset'
                  : 'text-text-primary hover:bg-primary-light hover:text-text-light shadow-neomorphic'
              }`}
            >
              {item.name}
            </Link>
          ))}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center focus:outline-none"
              >
                <Image
                  src={userImage}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="rounded-lg shadow-neomorphic transition-all duration-300 hover:bg-primary-light"
/>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-background-light rounded-lg shadow-neomorphic py-3 z-10">
                  <Link href="/my-profile" className="block px-4 py-2  text-text-primary hover:bg-primary-light hover:text-text-light rounded-md m-3 transition-all duration-300 shadow-neomorphic">My Profile</Link>
                  <Link href="/dashboard" className="block px-4 py-2  text-text-primary hover:bg-primary-light hover:text-text-light rounded-md m-3 transition-all duration-300 shadow-neomorphic">Dashboard</Link>
                  <button onClick={handleLogout} className="block w-[87%] text-left px-4 py-2  text-text-primary hover:bg-primary-light hover:text-text-light rounded-md m-3 transition-all duration-300 shadow-neomorphic">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <button
  onClick={handleLogin}
  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
    pathname === '/login'
      ? 'bg-background-dark text-primary font-semibold shadow-neomorphic-inset'
      : 'text-text-primary hover:bg-primary-light hover:text-text-light shadow-neomorphic'
  }`}
>
  Login
</button>

          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-primary focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'} mt-4`}>
        {navItems.map((item: NavItem) => (
          <Link
            key={item.path}
            href={item.path}
            className={`block px-4 py-2 rounded-lg mb-2 transition-all duration-300 ${
              pathname === item.path
                ? 'bg-background-dark text-primary font-semibold shadow-neomorphic-inset'
                : 'text-text-primary hover:bg-primary-light hover:text-text-light shadow-neomorphic'
            }`}
            onClick={() => setIsOpen(false)}
          >
            {item.name}
          </Link>
        ))}
        {user ? (
          <>
            <Link href="/profile" className="block px-4 py-2  text-text-primary hover:bg-primary-light hover:text-text-light rounded-md mb-2 transition-all duration-300 shadow-neomorphic hover:shadow-neomorphic-inset">My Profile</Link>
            <Link href="/dashboard" className="block px-4 py-2  text-text-primary hover:bg-primary-light hover:text-text-light rounded-md mb-2 transition-all duration-300 shadow-neomorphic hover:shadow-neomorphic-inset">Dashboard</Link>
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2  text-text-primary hover:bg-primary-light hover:text-text-light rounded-md mb-2 transition-all duration-300 shadow-neomorphic hover:shadow-neomorphic-inset">Logout</button>
          </>
        ) : (
          <button
  onClick={handleLogin}
  className={`px-4 py-2 rounded-lg transition-all duration-300 w-full text-start ${
    pathname === '/login'
      ? 'bg-background-dark text-primary font-semibold shadow-neomorphic-inset'
      : 'text-text-primary hover:bg-primary-light hover:text-text-light shadow-neomorphic'
  }`}
>
  Login
</button>

        )}
      </div>
    </nav>
  );
};

export default Navbar;