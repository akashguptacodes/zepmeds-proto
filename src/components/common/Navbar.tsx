import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Heart, MapPin, Zap } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { state } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/medicines?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-xl sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl shadow-lg">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-display">ZapMeds</h1>
              <p className="text-xs text-gray-500 font-medium font-mono">15-min delivery</p>
            </div>
          </Link>

          {/* Location */}
          <div className="hidden md:flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-xl">
            <MapPin className="h-4 w-4 text-blue-600" />
            <div>
              <span className="text-xs text-gray-500">Deliver to</span>
              <div className="font-bold text-gray-900 font-sans">HSR Layout</div>
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for medicines, health products..."
                className="w-full pl-6 pr-14 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 hover:bg-white transition-colors duration-200 text-gray-900 placeholder-gray-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            {/* Mobile Search */}
            <button className="md:hidden text-gray-600 hover:text-blue-600 transition-colors duration-200">
              <Search className="h-6 w-6" />
            </button>

            {/* Wishlist */}
            <button className="text-gray-600 hover:text-red-500 transition-colors duration-200">
              <Heart className="h-6 w-6" />
            </button>

            {/* Cart */}
            <Link to="/cart" className="relative text-gray-600 hover:text-blue-600 transition-colors duration-200">
              <ShoppingCart className="h-6 w-6" />
              {state.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {state.itemCount}
                </span>
              )}
            </Link>

            {/* Profile */}
            <Link to="/profile" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
              <User className="h-6 w-6" />
            </Link>
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
            className="w-full pl-6 pr-14 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
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