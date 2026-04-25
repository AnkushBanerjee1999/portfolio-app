import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import { useSearch } from '../SearchContext';
import { useCart } from '../CartContext';

const JournalPage = () => {
  const { openSearch } = useSearch();
  const { theme, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-background dark:bg-black text-on-background dark:text-gray-100 font-body-md text-body-md antialiased min-h-screen flex flex-col transition-colors duration-300 animate-reveal">
      {/* TopAppBar */}
      <header className="sticky top-0 w-full z-50 glass-header shadow-none font-epilogue antialiased tracking-tight">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center px-8 h-20">
          <Link to="/" className="font-epilogue text-xl font-bold tracking-[0.2em] text-black dark:text-white transition-transform active:scale-95 hover:opacity-70">ESSENTIALS</Link>
          <nav className="hidden md:flex gap-8">
            <Link to="/shop" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-500 ease-in-out hover:opacity-70 cursor-pointer active:scale-95">Shop All</Link>
            <Link to="/collections" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-500 ease-in-out hover:opacity-70 cursor-pointer active:scale-95">Collections</Link>
            <Link to="/journal" className="text-black dark:text-white border-b border-black dark:border-white pb-1 transition-all duration-500 ease-in-out hover:opacity-70 cursor-pointer active:scale-95">Journal</Link>
            <Link to="/our-story" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-500 ease-in-out hover:opacity-70 cursor-pointer active:scale-95">Our Story</Link>
          </nav>
          <div className="flex gap-6 items-center text-black dark:text-white">
            <button 
              onClick={openSearch} 
              className="cursor-pointer transition-transform active:scale-95 transition-all duration-500 ease-in-out hover:opacity-70 group flex items-center gap-2"
            >
              <span className="material-symbols-outlined group-hover:text-accent-funky transition-colors" data-icon="search">search</span>
              <span className="font-label-sm uppercase tracking-widest hidden xl:block group-hover:text-accent-funky transition-colors">Quick Search</span>
            </button>
            <Link to="/cart" className="cursor-pointer transition-transform active:scale-95 hover:opacity-70 relative">
              <span className="material-symbols-outlined">shopping_bag</span>
              {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-primary dark:bg-white text-on-primary dark:text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{totalItems}</span>}<span className="absolute -top-1 -right-1 bg-primary dark:bg-white text-on-primary dark:text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">2</span>
            </Link>
            <Link to="/profile" className="cursor-pointer transition-transform active:scale-95 hover:opacity-70"><span className="material-symbols-outlined">person</span></Link>
            <button className="cursor-pointer transition-transform active:scale-95 hover:opacity-70 flex items-center" onClick={toggleTheme} type="button">
              {theme === 'dark' ? <span className="material-symbols-outlined">light_mode</span> : <span className="material-symbols-outlined">dark_mode</span>}
            </button>
            <button className="md:hidden cursor-pointer transition-transform active:scale-95 hover:opacity-70" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 px-8 py-4 flex flex-col gap-4">
             <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 dark:text-gray-400">Shop All</Link>
             <Link to="/collections" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 dark:text-gray-400">Collections</Link>
             <Link to="/journal" onClick={() => setIsMobileMenuOpen(false)} className="text-black dark:text-white font-medium">Journal</Link>
             <Link to="/our-story" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 dark:text-gray-400">Our Story</Link>
          </div>
        )}
      </header>

      <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <h1 className="font-display text-[48px] md:text-[72px] font-bold tracking-tight text-on-surface dark:text-white mb-6">Journal</h1>
          <p className="font-body-lg text-[18px] text-on-surface-variant dark:text-gray-400 max-w-2xl">
            Thoughts, interviews, and deep dives into the world of minimalist design. A space for reflection on the objects that shape our daily lives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Article 1 */}
          <Link to="/journal" className="group block cursor-pointer flex flex-col h-full">
            <div className="relative aspect-[4/3] bg-surface-container dark:bg-gray-900 overflow-hidden rounded mb-6">
              <img alt="The Art of Slow Living" className="w-full h-full object-cover transition-transform duration-[10s] ease-out group-hover:scale-105" src="/journal_slow_living_1777091198471.png" />
            </div>
            <div className="mb-4">
              <span className="font-label-sm text-[12px] uppercase tracking-widest text-on-surface-variant dark:text-gray-500">Lifestyle — May 12, 2024</span>
            </div>
            <h3 className="font-h3 text-[24px] font-semibold text-on-surface dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-gray-300 transition-colors">The Art of Slow Living</h3>
            <p className="font-body-md text-on-surface-variant dark:text-gray-400 mb-6 flex-grow">How intentional choices and a minimalist environment can foster a deeper sense of daily peace.</p>
            <span className="font-label-sm text-[14px] uppercase tracking-widest text-primary dark:text-white group-hover:underline underline-offset-4 mt-auto">Read Article</span>
          </Link>

          {/* Article 2 */}
          <Link to="/journal" className="group block cursor-pointer flex flex-col h-full">
            <div className="relative aspect-[4/3] bg-surface-container dark:bg-gray-900 overflow-hidden rounded mb-6">
              <img alt="Behind the Design: The Odin Chair" className="w-full h-full object-cover transition-transform duration-[10s] ease-out group-hover:scale-105" src="/journal_chair_design_1777091213672.png" />
            </div>
            <div className="mb-4">
              <span className="font-label-sm text-[12px] uppercase tracking-widest text-on-surface-variant dark:text-gray-500">Design — April 28, 2024</span>
            </div>
            <h3 className="font-h3 text-[24px] font-semibold text-on-surface dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-gray-300 transition-colors">Behind the Design: The Odin Chair</h3>
            <p className="font-body-md text-on-surface-variant dark:text-gray-400 mb-6 flex-grow">A look into the two-year development process of our most iconic seating piece, from sketch to final prototype.</p>
            <span className="font-label-sm text-[14px] uppercase tracking-widest text-primary dark:text-white group-hover:underline underline-offset-4 mt-auto">Read Article</span>
          </Link>

          {/* Article 3 */}
          <Link to="/journal" className="group block cursor-pointer flex flex-col h-full">
            <div className="relative aspect-[4/3] bg-surface-container dark:bg-gray-900 overflow-hidden rounded mb-6">
              <img alt="Material Focus: Cashmere" className="w-full h-full object-cover transition-transform duration-[10s] ease-out group-hover:scale-105" src="/journal_cashmere_1777091228671.png" />
            </div>
            <div className="mb-4">
              <span className="font-label-sm text-[12px] uppercase tracking-widest text-on-surface-variant dark:text-gray-500">Materials — April 15, 2024</span>
            </div>
            <h3 className="font-h3 text-[24px] font-semibold text-on-surface dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-gray-300 transition-colors">Material Focus: Cashmere</h3>
            <p className="font-body-md text-on-surface-variant dark:text-gray-400 mb-6 flex-grow">Exploring the origins and craftsmanship behind the ultra-soft, sustainable cashmere used in our knitwear collection.</p>
            <span className="font-label-sm text-[14px] uppercase tracking-widest text-primary dark:text-white group-hover:underline underline-offset-4 mt-auto">Read Article</span>
          </Link>
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

export default JournalPage;
