import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from './SearchContext';

const SearchOverlay = () => {
  const { isSearchOpen, closeSearch } = useSearch();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
  }, [isSearchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      closeSearch();
    }
  };

  const trendingSearches = ['Odin Chair', 'Cashmere', 'Minimalist', 'New Arrivals', 'Home Office'];

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center animate-reveal">
      {/* Glassy Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0a0f14]/60 backdrop-blur-[40px] transition-all duration-700 ease-in-out"
        onClick={closeSearch}
      />
      
      {/* Background Animated Glows (The 'Orange Square' effect) */}
      <div className="absolute top-[20%] left-[30%] w-96 h-96 bg-gradient-to-br from-orange-500 to-red-600 rounded-[60px] blur-[80px] opacity-40 animate-pulse pointer-events-none" />
      <div className="absolute bottom-[20%] right-[30%] w-96 h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-[60px] blur-[80px] opacity-20 animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

      {/* Floating Glass Pane */}
      <div className="relative w-full max-w-4xl px-12 py-20 flex flex-col items-center bg-white/5 dark:bg-black/20 border border-white/20 dark:border-white/10 rounded-[40px] shadow-[0_32px_64px_rgba(0,0,0,0.4)] backdrop-blur-[20px] overflow-hidden">
        {/* Reflection Highlights */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        
        <button 
          onClick={closeSearch}
          className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-[32px]">close</span>
        </button>

        <form onSubmit={handleSearch} className="w-full mb-12 relative z-10">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search our world..."
            className="w-full bg-transparent border-b border-white/20 py-6 text-[40px] md:text-[56px] font-display font-light text-white placeholder:text-white/20 focus:outline-none focus:border-white/50 transition-all duration-300"
          />
          <p className="mt-4 text-white/40 font-label-sm uppercase tracking-[0.4em]">Intentional Living</p>
        </form>

        <div className="w-full relative z-10">
          <h3 className="text-accent-gold font-label-sm uppercase tracking-[0.3em] mb-6">Discovery</h3>
          <div className="flex flex-wrap gap-4">
            {trendingSearches.map((term) => (
              <button
                key={term}
                onClick={() => {
                  setQuery(term);
                  navigate(`/shop?search=${encodeURIComponent(term)}`);
                  closeSearch();
                }}
                className="px-8 py-3 bg-white/5 border border-white/10 text-white/80 rounded-full font-body-md hover:bg-white hover:text-black transition-all duration-500 hover-lift"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>

        {/* Subtle Decorative Gradient */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent-sand/10 blur-[120px] -z-10" />
    </div>
  );
};

export default SearchOverlay;
