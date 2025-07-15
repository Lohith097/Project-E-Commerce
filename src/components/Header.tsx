import React, { useState } from 'react';
import { Heart, ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Header() {
  const { state, dispatch } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartItemCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  const handleNavigation = (page: string) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
    setIsMobileMenuOpen(false);
  };

  const handleLogin = () => {
    dispatch({ type: 'TOGGLE_LOGIN_MODAL' });
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => handleNavigation('home')}
              className="text-3xl font-bold text-white tracking-wide hover:text-[#B6F500] transition-colors"
            >
              SLAY
            </button>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-[#B6F500] focus:outline-none transition-colors"
              />
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => handleNavigation('home')}
              className={`text-white hover:text-[#B6F500] transition-colors font-medium ${
                state.currentPage === 'home' ? 'text-[#B6F500]' : ''
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('shop')}
              className={`text-white hover:text-[#B6F500] transition-colors font-medium ${
                state.currentPage === 'shop' ? 'text-[#B6F500]' : ''
              }`}
            >
              Shop
            </button>
            <button 
              onClick={() => handleNavigation('categories')}
              className={`text-white hover:text-[#B6F500] transition-colors font-medium ${
                state.currentPage === 'categories' ? 'text-[#B6F500]' : ''
              }`}
            >
              Categories
            </button>
            <button 
              onClick={() => handleNavigation('sale')}
              className="bg-[#B6F500] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#A5E600] transition-colors"
            >
              SALE
            </button>
          </nav>
          
          {/* Right Side Icons */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:block w-px h-6 bg-gray-700"></div>
            
            {/* User Account */}
            <button 
              onClick={handleLogin}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors text-white relative group"
            >
              <User className="w-5 h-5" />
              {state.user && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#B6F500] rounded-full"></div>
              )}
            </button>
            
            {/* Wishlist */}
            <button 
              onClick={() => handleNavigation('wishlist')}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors text-white"
            >
              <Heart className="w-5 h-5" />
            </button>
            
            {/* Cart */}
            <button 
              onClick={() => handleNavigation('cart')}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors text-white relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B6F500] text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {cartItemCount}
                </span>
              )}
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-2 ml-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800 py-4 animate-in slide-in-from-top duration-200">
            {/* Mobile Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-[#B6F500] focus:outline-none transition-colors"
                />
              </div>
            </div>
            
            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              <button 
                onClick={() => handleNavigation('home')}
                className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation('shop')}
                className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                Shop
              </button>
              <button 
                onClick={() => handleNavigation('categories')}
                className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                Categories
              </button>
              <button 
                onClick={() => handleNavigation('wishlist')}
                className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                Wishlist
              </button>
              <button 
                onClick={handleLogin}
                className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                {state.user ? `Hi, ${state.user.name}` : 'Login / Sign Up'}
              </button>
              <button 
                onClick={() => handleNavigation('sale')}
                className="w-full bg-[#B6F500] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#A5E600] transition-colors"
              >
                SALE
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}