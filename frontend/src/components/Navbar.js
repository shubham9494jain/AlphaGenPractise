import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileMenu from './ProfileMenu';
import MobileSideMenu from './MobileSideMenu';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/">
                <img
                  className="h-8 w-auto"
                  src="/loges/AlphaGenLogo.png"
                  alt="AlphaGen"
                />
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
              <Link to="/about" className="text-primaryText font-medium hover:text-gray-600 text-[15px] transition-colors">About us</Link>
              <Link to="/privacy" className="text-primaryText font-medium hover:text-gray-600 text-[15px] transition-colors">Privacy policies</Link>
              <Link to="/terms" className="text-primaryText font-medium hover:text-gray-600 text-[15px] transition-colors">Terms of use</Link>
              <Link to="/subscription" className="text-primaryText font-medium hover:text-gray-600 text-[15px] transition-colors">Subscription plans</Link>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="hidden md:block">
                <ProfileMenu />
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 py-2 bg-primary hover:bg-blue-600 hover:text-white rounded-full text-white px-6 font-semibold text-[15px]"
                >
                  Log in
                </Link>
                <Link
                  to="/sign-up"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-primaryText font-semibold text-[15px] rounded-full border-2 border-primaryText"
                >
                  Sign up
                </Link>
              </div>
            )}
            <div className="md:hidden">
              <MobileSideMenu />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
