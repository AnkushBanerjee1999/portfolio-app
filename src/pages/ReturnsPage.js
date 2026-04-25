import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import { useSearch } from '../SearchContext';
import { useCart } from '../CartContext';

const ReturnsPage = () => {
  const { openSearch } = useSearch();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');

  return (
    <div className="bg-background dark:bg-black text-on-background dark:text-gray-100 font-body-md text-body-md antialiased min-h-screen flex flex-col transition-colors duration-300 animate-reveal">
      <header className="sticky top-0 w-full z-50 glass-header shadow-none font-epilogue antialiased tracking-tight">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center px-8 h-20">
          {/* Brand Logo */}
          <Link to="/" className="font-epilogue text-xl font-bold tracking-[0.2em] text-black dark:text-white cursor-pointer transition-transform active:scale-95 transition-all duration-500 ease-in-out hover:opacity-70">
            ESSENTIALS
          </Link>
          {/* Navigation Links */}
          <nav className="hidden md:flex gap-8">
            <Link to="/shop" className="text-black dark:text-white border-b border-black dark:border-white pb-1 transition-all duration-500 ease-in-out hover:opacity-70 cursor-pointer active:scale-95">Shop All</Link>
            <Link to="/collections" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-500 ease-in-out hover:opacity-70 cursor-pointer active:scale-95">Collections</Link>
            <Link to="/journal" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-500 ease-in-out hover:opacity-70 cursor-pointer active:scale-95">Journal</Link>
            <Link to="/our-story" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-500 ease-in-out hover:opacity-70 cursor-pointer active:scale-95">Our Story</Link>
          </nav>
          {/* Trailing Icons */}
          <div className="flex gap-6 items-center text-black dark:text-white">
            <button 
              onClick={openSearch} 
              className="cursor-pointer transition-transform active:scale-95 transition-all duration-500 ease-in-out hover:opacity-70 group flex items-center gap-2"
            >
              <span className="material-symbols-outlined group-hover:text-accent-funky transition-colors" data-icon="search">search</span>
              <span className="font-label-sm uppercase tracking-widest hidden xl:block group-hover:text-accent-funky transition-colors">Quick Search</span>
            </button>
            <Link to="/cart" className="cursor-pointer transition-transform active:scale-95 transition-all duration-500 ease-in-out hover:opacity-70 relative">
              <span className="material-symbols-outlined" data-icon="shopping_bag">shopping_bag</span>
              {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-primary dark:bg-white text-on-primary dark:text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{totalItems}</span>}
            </Link>
            <Link to="/profile" className="cursor-pointer transition-transform active:scale-95 transition-all duration-500 ease-in-out hover:opacity-70"><span className="material-symbols-outlined" data-icon="person">person</span></Link>
            {/* Dark Mode Toggle */}
            <button className="cursor-pointer transition-transform active:scale-95 transition-all duration-500 ease-in-out hover:opacity-70 flex items-center" onClick={toggleTheme} type="button">
              {theme === 'dark' ? (
                <span className="material-symbols-outlined">light_mode</span>
              ) : (
                <span className="material-symbols-outlined">dark_mode</span>
              )}
            </button>
            <button className="md:hidden cursor-pointer transition-transform active:scale-95 transition-all duration-500 ease-in-out hover:opacity-70" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <span className="material-symbols-outlined" data-icon="menu">{isMobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 px-8 py-4 flex flex-col gap-4">
             <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-black dark:text-white font-medium">Shop All</Link>
             <Link to="/collections" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 dark:text-gray-400">Collections</Link>
             <Link to="/journal" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 dark:text-gray-400">Journal</Link>
             <Link to="/our-story" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 dark:text-gray-400">Our Story</Link>
          </div>
        )}
      </header>

      <main className="flex-grow w-full max-w-[800px] mx-auto px-4 md:px-8 py-16 md:py-24">
        <h1 className="font-display text-[40px] md:text-[56px] font-bold tracking-tight text-on-surface dark:text-white mb-12">Returns & Exchanges</h1>
        <div className="space-y-6 font-body-md text-[16px] text-on-surface-variant dark:text-gray-400 leading-relaxed">
          <p>We accept returns within 30 days of delivery for a full refund. Items must be in their original condition and packaging. Please contact support to initiate a return.</p>
        </div>
      </main>

      <footer className="bg-white dark:bg-black w-full border-t border-gray-100 dark:border-gray-900 font-epilogue text-[14px] uppercase tracking-widest text-black dark:text-white transition-all duration-300">
        <div className="max-w-[1280px] mx-auto px-8 py-24 flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Brand Logo */}
          <Link to="/" className="font-epilogue font-bold text-lg">
            ESSENTIALS
          </Link>
          {/* Links */}
          <nav className="flex flex-col md:flex-row gap-6 md:gap-12">
            <Link className="text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white underline-offset-4 hover:underline transition-all duration-300" to="/privacy">Privacy Policy</Link>
            <Link className="text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white underline-offset-4 hover:underline transition-all duration-300" to="/terms">Terms of Service</Link>
            <Link className="text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white underline-offset-4 hover:underline transition-all duration-300" to="/shipping">Shipping</Link>
            <Link className="text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white underline-offset-4 hover:underline transition-all duration-300" to="/returns">Returns</Link>
            <Link className="text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white underline-offset-4 hover:underline transition-all duration-300" to="/contact">Contact</Link>
          </nav>
          {/* Copyright */}
          <div className="text-gray-400 dark:text-gray-600">
            © 2024 ESSENTIALS. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ReturnsPage;
