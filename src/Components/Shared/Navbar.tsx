'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import userImage from '../../../public/user-placeholder-image.jpg';
import { NavItem } from '@/type';
import { navItems } from '@/constant';
import { useUser } from '@/hooks/user.hook';
// import { clearUser, setUser } from '@/lib/features/UserState/UserSlice';
import { useDispatch } from 'react-redux';
import { useAuth } from '@/hooks/auth.hook';

// interface User {
//   name: string;
//   image: StaticImageData;
// }

// Mock user state (replace with actual auth logic)
// const useUser = () => {
//   const [user, setUser] = useState<User | null>({name: 'John Doe', image: userImage as StaticImageData});
//   return { user, setUser };
// };

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const { user } = useUser();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { handleLogout: handleLogoutAuth } = useAuth();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogin = () => {
    router.push('/login');
  };

  const handleLogout = async () => {
    handleLogoutAuth();
  };

  return (
    <nav className="bg-background-light p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-primary text-2xl font-bold">
          GardenApp
        </Link>

        {/* Desktop menu */}
        <div className="hidden lg:flex space-x-1 items-center">
          {navItems.map((item: NavItem) => (
            <Link
              key={item.path}
              href={item.path}
              className={`py-2 px-4 rounded transition-all duration-300 ${
                pathname === item.path
                  ? 'bg-primary-light text-text-light font-semibold'
                  : 'text-text-primary hover:bg-primary-light hover:text-text-light'
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
                  src={user?.userImage || userImage}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="rounded-lg  transition-all duration-300 hover:bg-primary-light"
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-background-light rounded-lg  py-3 z-10">
                  <Link
                    href={`/my-profile/${user._id}`}
                    className="block px-4 py-2  text-text-primary hover:bg-primary-light hover:text-text-light rounded-md m-3 transition-all duration-300 "
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2  text-text-primary hover:bg-primary-light hover:text-text-light rounded-md m-3 transition-all duration-300 "
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-[87%] text-left px-4 py-2  text-text-primary hover:bg-primary-light hover:text-text-light rounded-md m-3 transition-all duration-300 "
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                pathname === '/login'
                  ? 'bg-background-dark text-primary font-semibold'
                  : 'text-text-primary hover:bg-primary-light hover:text-text-light '
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
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
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
            <Link
              href={`/my-profile/${user._id}`}
              className="block px-4 py-2  text-text-primary hover:bg-primary-light hover:text-text-light rounded-md mb-2 transition-all duration-300 shadow-neomorphic hover:shadow-neomorphic-inset"
            >
              My Profile
            </Link>
            <Link
              href="/dashboard"
              className="block px-4 py-2  text-text-primary hover:bg-primary-light hover:text-text-light rounded-md mb-2 transition-all duration-300 shadow-neomorphic hover:shadow-neomorphic-inset"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2  text-text-primary hover:bg-primary-light hover:text-text-light rounded-md mb-2 transition-all duration-300 shadow-neomorphic hover:shadow-neomorphic-inset"
            >
              Logout
            </button>
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
