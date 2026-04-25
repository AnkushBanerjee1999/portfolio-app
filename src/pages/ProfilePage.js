import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import { useSearch } from '../SearchContext';
import { useCart } from '../CartContext';

const ProfilePage = () => {
  const { openSearch } = useSearch();
  const { theme, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-background dark:bg-black text-on-background dark:text-gray-100 font-body-md text-body-md antialiased min-h-screen flex flex-col transition-colors duration-300 animate-reveal">
      {/* TopAppBar */}
      <header className="sticky top-0 w-full z-50 glass-header shadow-none font-epilogue antialiased tracking-tight text-black dark:text-white">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center px-8 h-20">
          <Link to="/" className="font-epilogue text-xl font-bold tracking-[0.2em] transition-transform active:scale-95 hover:opacity-70">ESSENTIALS</Link>
          <nav className="hidden md:flex gap-8">
            <Link to="/shop" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-500 ease-in-out hover:opacity-70 cursor-pointer active:scale-95">Shop All</Link>
            <Link to="/collections" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-500 ease-in-out hover:opacity-70 cursor-pointer active:scale-95">Collections</Link>
            <Link to="/journal" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-500 ease-in-out hover:opacity-70 cursor-pointer active:scale-95">Journal</Link>
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
            <Link to="/profile" className="cursor-pointer transition-transform active:scale-95 hover:opacity-70"><span className="material-symbols-outlined text-primary dark:text-white">person</span></Link>
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
             <Link to="/journal" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 dark:text-gray-400">Journal</Link>
             <Link to="/our-story" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 dark:text-gray-400">Our Story</Link>
          </div>
        )}
      </header>

      <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 md:px-8 py-16">
        <div className="mb-12">
          <h1 className="font-display text-[40px] md:text-[56px] font-bold tracking-tight text-on-surface dark:text-white">My Account</h1>
          <p className="font-body-md text-[16px] text-on-surface-variant dark:text-gray-400 mt-2">Manage your profile details and preferences.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Sidebar Menu */}
          <aside className="w-full md:w-64 flex-shrink-0 border-r border-surface-container-high dark:border-gray-800 md:pr-8">
            <nav className="space-y-4 font-body-md text-[16px]">
              <a href="/profile" className="block font-medium text-primary dark:text-white">Profile Details</a>
              <a href="/profile" className="block text-on-surface-variant dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors">Order History</a>
              <a href="/profile" className="block text-on-surface-variant dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors">Saved Addresses</a>
              <a href="/profile" className="block text-on-surface-variant dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors">Payment Methods</a>
              <a href="/profile" className="block text-on-surface-variant dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors mt-8">Sign Out</a>
            </nav>
          </aside>

          {/* Main Content Area */}
          <div className="flex-grow w-full max-w-2xl">
            <h2 className="font-h2 text-[24px] font-semibold text-on-surface dark:text-white mb-8 border-b border-surface-container-high dark:border-gray-800 pb-4">Personal Information</h2>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-label-sm text-[12px] uppercase tracking-widest text-on-surface-variant dark:text-gray-400 mb-2">First Name</label>
                  <input type="text" defaultValue="Alex" className="w-full bg-surface-container dark:bg-gray-900 border border-outline-variant dark:border-gray-700 px-4 py-3 rounded-sm focus:outline-none focus:border-primary dark:focus:border-white text-on-surface dark:text-white transition-colors" />
                </div>
                <div>
                  <label className="block font-label-sm text-[12px] uppercase tracking-widest text-on-surface-variant dark:text-gray-400 mb-2">Last Name</label>
                  <input type="text" defaultValue="Morgan" className="w-full bg-surface-container dark:bg-gray-900 border border-outline-variant dark:border-gray-700 px-4 py-3 rounded-sm focus:outline-none focus:border-primary dark:focus:border-white text-on-surface dark:text-white transition-colors" />
                </div>
              </div>

              <div>
                <label className="block font-label-sm text-[12px] uppercase tracking-widest text-on-surface-variant dark:text-gray-400 mb-2">Email Address</label>
                <input type="email" defaultValue="alex.morgan@example.com" className="w-full bg-surface-container dark:bg-gray-900 border border-outline-variant dark:border-gray-700 px-4 py-3 rounded-sm focus:outline-none focus:border-primary dark:focus:border-white text-on-surface dark:text-white transition-colors" />
              </div>

              <div>
                <label className="block font-label-sm text-[12px] uppercase tracking-widest text-on-surface-variant dark:text-gray-400 mb-2">Phone Number</label>
                <input type="tel" defaultValue="+1 (555) 000-0000" className="w-full bg-surface-container dark:bg-gray-900 border border-outline-variant dark:border-gray-700 px-4 py-3 rounded-sm focus:outline-none focus:border-primary dark:focus:border-white text-on-surface dark:text-white transition-colors" />
              </div>

              <div className="pt-6">
                <button type="submit" className="bg-primary dark:bg-white text-on-primary dark:text-black px-8 py-3 rounded font-label-sm text-[14px] uppercase tracking-widest hover:bg-black/80 dark:hover:bg-gray-200 transition-colors w-full sm:w-auto">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="bg-white dark:bg-black text-black dark:text-white font-epilogue text-sm uppercase tracking-widest w-full border-t border-gray-100 dark:border-gray-900 shadow-none mt-auto">
        <div className="max-w-[1280px] mx-auto px-8 py-24 flex flex-col md:flex-row justify-between items-start gap-12">
          <Link to="/" className="font-epilogue font-bold text-lg">ESSENTIALS</Link>
          <nav className="flex flex-col md:flex-row gap-6 md:gap-12">
            <Link className="text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white underline-offset-4 hover:underline transition-all duration-300" to="/privacy">Privacy Policy</Link>
            <Link className="text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white underline-offset-4 hover:underline transition-all duration-300" to="/terms">Terms of Service</Link>
            <Link className="text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white underline-offset-4 hover:underline transition-all duration-300" to="/shipping">Shipping</Link>
            <Link className="text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white underline-offset-4 hover:underline transition-all duration-300" to="/returns">Returns</Link>
            <Link className="text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white underline-offset-4 hover:underline transition-all duration-300" to="/contact">Contact</Link>
          </nav>
          <div className="text-gray-400 dark:text-gray-600">© 2024 ESSENTIALS. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default ProfilePage;
