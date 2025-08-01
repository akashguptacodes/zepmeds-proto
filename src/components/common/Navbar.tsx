import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Heart, MapPin, Zap, Sun, Moon, Pill } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { state } = useCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/medicines?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const scrollToInvestors = () => {
    // First check if we're on the home page
    if (window.location.pathname !== '/') {
      // If not on home page, navigate to home page first
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById('investors');
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 500);
    } else {
      // If already on home page, just scroll
      const element = document.getElementById('investors');
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };



  return (
    <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-xl sticky top-0 z-50 border-b border-gray-100 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <div className='flex'>
            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 dark:from-cyan-400 dark:to-green-400 p-2 rounded-xl">
                  <Pill className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 dark:from-cyan-400 dark:to-green-400 bg-clip-text text-transparent">
                  ZapMeds
                </span>
              </Link>
            </div>

            {/* Location */}
            <div className="hidden md:flex items-center space-x-2 bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-xl">
              <MapPin className="h-4 w-4 text-blue-600" />
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Deliver to</span>
                <div className="font-bold text-gray-900 dark:text-white font-sans">HSR Layout</div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors duration-200">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors duration-200">
              About
            </Link>
            <button
              onClick={scrollToInvestors}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors duration-200 cursor-pointer"
            >
              Investors
            </button>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon className="h-6 w-6" />
              ) : (
                <Sun className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-4">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search medicines..."
            className="w-full pl-6 pr-14 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 dark:text-white"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-xl shadow-lg"
          >
            <Search className="h-5 w-5" />
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;