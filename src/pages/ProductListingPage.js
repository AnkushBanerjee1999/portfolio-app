import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import { useSearch } from '../SearchContext';
import { useCart } from '../CartContext';

const ProductListingPage = () => {
  const { openSearch } = useSearch();
  const { theme, toggleTheme } = useTheme();
  const { addItem, totalItems } = useCart();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [sortBy, setSortBy] = useState('Featured');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedRating, setSelectedRating] = useState(0);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    addItem({
      ...product,
      selectedColor: product.name === 'Charcoal Wool Overcoat' ? 'Charcoal' : 'Default',
      selectedSize: 'M',
      quantity: 1
    });
  };

  
  const initialProducts = [
    {
      id: 1,
      name: 'Charcoal Wool Overcoat',
      price: '$495',
      priceValue: 495,
      category: 'Apparel',
      desc: 'Italian crafted heavyweight wool',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwXKeoZIBuEgEyc_SOrgI89nIiy9ZsQlhAYxcqO0KbBiQvt5e1uWAREJLArESIQBI76JZm4HzBDH_10CxWiqehs7Uvz133e8uoWjXvL8V09S1b9TI97UBwsOcHKh1rD8eNoaex66ty-RPYNMf9N7q6O2-jK9KxS4kdrFgOAOQKTumM7knG9bNBzlO5EAPt37AhaNMThVUNy2Dc4MvmRQgJ1Bv8N3xRjaJPcwCx7-unqZWmp80by3Dp4D5WuCQCUw4KC4rYuokUvnQ7',
      isNew: true,
      rating: 4.5,
      reviews: 42
    },
    {
      id: 2,
      name: 'Cashmere Cable Knit',
      price: '$320',
      priceValue: 320,
      category: 'Apparel',
      desc: '100% Mongolian Cashmere',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD91cFa3o4IaVQt1gfM3uuIPxZFNGw3G8aAQhZqxpUh3ZYmAOrqEIxogSoROLzDBZJ7WB4oOlIWMUHGB4NPmB6uKWjC5-GJrrBweENZllgcqSQL1NMyr9YTpz7oW8svl_wNVK8pV5H4eBTE0VG7MOwab0_B-N65ZFWeOKpHQVcDRu9G1pGUU15t9ENJxnABZ6a1_faiJuw8WpEyRlPHLPrj4W1vXJlEkfdA1PlFQby1Azk4Z5Gowb5IGS-QPqdpGvIHeBUQ4PKVM4bZ',
      isNew: false,
      rating: 5,
      reviews: 18
    },
    {
      id: 3,
      name: 'Pleated Wool Trousers',
      price: '$245',
      priceValue: 245,
      category: 'Apparel',
      desc: 'Relaxed fit, tapered leg',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKBw3w5hqWFl-JjbM5_KLtqOBVvTus_QNQgj0V9s6bnc6IPxSkS2WUOQ-P4AYYyTrNfa82tDNjtjWjMf8mmDfLu9y_uRazqW5bcbTJkVH_8_lrUwdUBeo9hFKwJ7qWiWULIgHMgXUMzazdebLpGZ_qetiCitxDnalK7HdbCsPjFemq81rtVDW2Aj31195qArJJJV5M-0NmGiAY7xI-KcH4Pep6fnVOvE6-RonkkablLNP0SCT2zTNO5jLfzwhMs7i5CNWbGWNPKV1e',
      isNew: false,
      rating: 4,
      reviews: 7
    }
  ];

  const moreProducts = [
    {
      id: 4,
      name: 'Minimalist Leather Tote',
      price: '$380',
      priceValue: 380,
      category: 'Accessories',
      desc: 'Premium full-grain leather',
      image: '/product_tote_1777091786875.png',
      isNew: true,
      rating: 5,
      reviews: 24
    },
    {
      id: 5,
      name: 'Matte Black Table Lamp',
      price: '$195',
      priceValue: 195,
      category: 'Home',
      desc: 'Architectural soft glow',
      image: '/product_lamp_1777091802758.png',
      isNew: false,
      rating: 4.5,
      reviews: 12
    },
    {
      id: 6,
      name: 'Ceramic Coffee Set',
      price: '$85',
      priceValue: 85,
      category: 'Home',
      desc: 'Speckled white glaze',
      image: '/product_coffee_set_1777091819427.png',
      isNew: false,
      rating: 5,
      reviews: 56
    }
  ];

  const [products, setProducts] = useState(initialProducts);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setProducts(prev => [...prev, ...moreProducts]);
      setIsLoadingMore(false);
      setHasMore(false);
    }, 1500);
  };

  const filteredProducts = products
    .filter(p => selectedCategory === 'All Products' || p.category === selectedCategory)
    .filter(p => p.priceValue <= maxPrice)
    .filter(p => p.rating >= selectedRating)
    .filter(p => searchQuery === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.desc.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.priceValue - b.priceValue;
      if (sortBy === 'Price: High to Low') return b.priceValue - a.priceValue;
      if (sortBy === 'Newest Arrivals') return b.isNew - a.isNew;
      return 0; // Featured
    });

  const categories = [
    { name: 'All Products', count: 124 },
    { name: 'Apparel', count: 3 },
    { name: 'Accessories', count: 1 },
    { name: 'Home', count: 2 },
  ];

  return (
    <div className="bg-background dark:bg-black text-on-background dark:text-gray-100 font-body-md text-body-md antialiased min-h-screen flex flex-col transition-colors duration-300 animate-reveal">
      {/* TopAppBar */}
      <header className="sticky top-0 w-full z-50 glass-header shadow-none font-epilogue antialiased tracking-tight text-black dark:text-white transition-colors duration-300">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center px-8 h-20">
          {/* Brand */}
          <Link to="/" className="font-epilogue text-xl font-bold tracking-[0.2em] text-black dark:text-white transition-transform active:scale-95 hover:opacity-70">ESSENTIALS</Link>
          
          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/shop" className="text-black dark:text-white border-b border-black dark:border-white pb-1 transition-all duration-500 ease-in-out hover:opacity-70 cursor-pointer active:scale-95">Shop All</Link>
            <Link to="/collections" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-500 ease-in-out hover:opacity-70 cursor-pointer active:scale-95">Collections</Link>
            <Link to="/journal" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-500 ease-in-out hover:opacity-70 cursor-pointer active:scale-95">Journal</Link>
            <Link to="/our-story" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-500 ease-in-out hover:opacity-70 cursor-pointer active:scale-95">Our Story</Link>
          </nav>
          
          {/* Trailing Icons / Search */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={openSearch} 
              className="cursor-pointer transition-transform active:scale-95 transition-all duration-500 ease-in-out hover:opacity-70 group flex items-center gap-2"
            >
              <span className="material-symbols-outlined group-hover:text-accent-funky transition-colors" data-icon="search">search</span>
              <span className="font-label-sm uppercase tracking-widest hidden xl:block group-hover:text-accent-funky transition-colors">Quick Search</span>
            </button>
            <Link to="/cart" className="text-black dark:text-white transition-all duration-500 ease-in-out hover:opacity-70 cursor-pointer active:scale-95 relative">
              <span className="material-symbols-outlined" data-icon="shopping_bag">shopping_bag</span>
              {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-primary dark:bg-white text-on-primary dark:text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{totalItems}</span>}
            </Link>
            <Link to="/profile" className="text-black dark:text-white transition-all duration-500 ease-in-out hover:opacity-70 cursor-pointer active:scale-95"><span className="material-symbols-outlined" data-icon="person">person</span></Link>
            
            {/* Dark Mode Toggle */}
            <button className="text-black dark:text-white transition-all duration-500 ease-in-out hover:opacity-70 cursor-pointer active:scale-95 flex items-center" onClick={toggleTheme} type="button">
              {theme === 'dark' ? (
                <span className="material-symbols-outlined">light_mode</span>
              ) : (
                <span className="material-symbols-outlined">dark_mode</span>
              )}
            </button>
            
            {/* Mobile Menu Trigger */}
            <button className="md:hidden text-black dark:text-white transition-all duration-500 ease-in-out hover:opacity-70 cursor-pointer active:scale-95 ml-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
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

      {/* Main Content Area */}
      <main className="flex-grow max-w-[1280px] mx-auto w-full px-[32px] py-[120px] flex flex-col md:flex-row gap-[32px]">
        {/* Filters Sidebar (Desktop) */}
        <aside className="hidden md:block w-64 flex-shrink-0 border-r border-surface-container-high dark:border-gray-800 pr-8 sticky top-[120px] h-fit">
          <div className="mb-[48px]">
            <h3 className="font-h3 text-[24px] font-semibold text-on-surface dark:text-white mb-[24px] pb-4 border-b border-surface-container-high dark:border-gray-800">Filters</h3>
            
            {/* Category Filter */}
            <div className="mb-[24px]">
              <h4 className="font-label-sm text-[14px] text-on-surface-variant dark:text-gray-400 mb-4 uppercase tracking-wider">Category</h4>
              <ul className="space-y-3 font-body-md text-[16px] text-on-surface dark:text-gray-300">
                {categories.map((cat) => (
                  <li key={cat.name} onClick={() => setSelectedCategory(cat.name)} className="flex items-center justify-between cursor-pointer group">
                    <span className={`transition-colors duration-300 ${selectedCategory === cat.name ? 'font-medium text-primary dark:text-white' : 'group-hover:text-primary dark:group-hover:text-white'}`}>{cat.name}</span>
                    <span className="text-on-surface-variant dark:text-gray-500 text-sm group-hover:text-primary dark:group-hover:text-white transition-colors duration-300">{cat.count}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Price Filter */}
            <div className="mb-[24px]">
              <h4 className="font-label-sm text-[14px] text-on-surface-variant dark:text-gray-400 mb-4 uppercase tracking-wider">Price Range (Max: ${maxPrice})</h4>
              <div className="flex flex-col space-y-4">
                <input 
                  className="w-full accent-primary dark:accent-white bg-surface-container-highest dark:bg-gray-700 rounded-full h-1 outline-none appearance-none cursor-pointer" 
                  max="1000" 
                  min="0" 
                  type="range"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                />
                <div className="flex justify-between font-body-md text-[16px] text-on-surface-variant dark:text-gray-400">
                  <span>$0</span>
                  <span>$1,000+</span>
                </div>
              </div>
            </div>
            
            {/* Rating Filter */}
            <div>
              <h4 className="font-label-sm text-[14px] text-on-surface-variant dark:text-gray-400 mb-4 uppercase tracking-wider">Rating</h4>
              <div className="space-y-3 font-body-md text-[16px] text-on-surface dark:text-gray-300">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center space-x-3 cursor-pointer group">
                    <input 
                      className="form-checkbox h-4 w-4 text-primary dark:text-white border-outline-variant dark:border-gray-600 rounded-sm focus:ring-primary dark:focus:ring-white" 
                      type="checkbox"
                      checked={selectedRating === rating}
                      onChange={() => setSelectedRating(selectedRating === rating ? 0 : rating)}
                    />
                    <div className="flex text-primary dark:text-white">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`material-symbols-outlined text-[18px] ${i < rating ? '' : 'text-surface-container-highest dark:text-gray-700'}`} data-icon="star" data-weight="fill">star</span>
                      ))}
                    </div>
                    {rating < 5 && <span className="text-on-surface-variant dark:text-gray-400 text-sm">& Up</span>}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <button 
            onClick={() => {
              setSelectedCategory('All Products');
              setMaxPrice(1000);
              setSelectedRating(0);
              setSortBy('Featured');
            }}
            className="w-full bg-surface-container dark:bg-gray-800 text-on-surface dark:text-white font-label-sm text-[14px] py-3 rounded hover:bg-surface-container-high dark:hover:bg-gray-700 transition-colors duration-300"
          >
            Clear Filters
          </button>
        </aside>

        {/* Product Grid Area */}
        <div className="flex-grow">
          {/* Header & Sorting */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-[48px] gap-4">
            <div>
              <h1 className="font-h1 text-[48px] font-bold text-on-surface dark:text-white">{selectedCategory}</h1>
              <p className="font-body-md text-[16px] text-on-surface-variant dark:text-gray-400 mt-2">Showing 1-12 of {categories.find(c => c.name === selectedCategory)?.count || 124} products</p>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)} className="md:hidden flex items-center gap-2 px-4 py-2 border border-outline-variant dark:border-gray-700 rounded text-on-surface dark:text-white font-label-sm text-[14px] hover:bg-surface-container-low dark:hover:bg-gray-800 transition-colors w-full justify-center">
                <span className="material-symbols-outlined text-[20px]" data-icon="tune">tune</span> Filters
              </button>
              <div className="relative w-full md:w-56">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none bg-surface dark:bg-transparent border-b border-outline-variant dark:border-gray-700 px-4 py-2 pr-8 focus:outline-none focus:border-primary dark:focus:border-white focus:ring-0 font-body-md text-[16px] text-on-surface dark:text-white cursor-pointer rounded-t-sm"
                >
                  <option value="Featured" className="dark:bg-gray-900">Sort by: Featured</option>
                  <option value="Price: Low to High" className="dark:bg-gray-900">Price: Low to High</option>
                  <option value="Price: High to Low" className="dark:bg-gray-900">Price: High to Low</option>
                  <option value="Newest Arrivals" className="dark:bg-gray-900">Newest Arrivals</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant dark:text-gray-400" data-icon="expand_more">expand_more</span>
              </div>
            </div>
          </div>

          {/* Mobile Filters Section */}
          {isMobileFiltersOpen && (
            <div className="md:hidden mb-8 p-4 bg-surface-container dark:bg-gray-900 rounded">
               <h4 className="font-label-sm text-[14px] text-on-surface-variant dark:text-gray-400 mb-4 uppercase tracking-wider">Category</h4>
               <ul className="space-y-3 font-body-md text-[16px] text-on-surface dark:text-gray-300">
                {categories.map((cat) => (
                  <li key={cat.name} onClick={() => { setSelectedCategory(cat.name); setIsMobileFiltersOpen(false); }} className="flex items-center justify-between cursor-pointer group">
                    <span className={`transition-colors duration-300 ${selectedCategory === cat.name ? 'font-medium text-primary dark:text-white' : 'group-hover:text-primary dark:group-hover:text-white'}`}>{cat.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

                    {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[32px] gap-y-[48px]">
            {filteredProducts.map(product => (
              <Link to="/product" key={product.id} className="group cursor-pointer flex flex-col">
                <div className="relative w-full aspect-[4/5] bg-surface-container-low dark:bg-gray-900 overflow-hidden mb-4 rounded-sm hover-lift">
                  <img alt={product.name} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" src={product.image}/>
                  {product.isNew && <div className="absolute top-3 left-3 bg-surface dark:bg-black/60 text-on-surface dark:text-white px-3 py-1 rounded-full font-label-sm text-xs tracking-wider uppercase border border-outline-variant/30 dark:border-gray-700/50 backdrop-blur-md">New</div>}
                  <div className="absolute bottom-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <button onClick={(e) => { e.preventDefault(); alert("Added to favorites"); }} className="bg-white/90 dark:bg-black/90 hover:bg-white dark:hover:bg-black text-primary dark:text-white p-2 rounded-full shadow-lg">
                      <span className="material-symbols-outlined" data-icon="favorite_border">favorite_border</span>
                    </button>
                    <button onClick={(e) => handleAddToCart(e, product)} className="bg-primary dark:bg-white text-on-primary dark:text-black p-2 rounded-full shadow-lg">
                      <span className="material-symbols-outlined" data-icon="add_shopping_cart">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-h3 text-lg text-on-surface dark:text-white group-hover:text-primary dark:group-hover:text-gray-300 transition-colors">{product.name}</h3>
                    <span className="font-body-md text-[16px] text-on-surface dark:text-white font-medium">{product.price}</span>
                  </div>
                  <p className="font-body-md text-sm text-on-surface-variant dark:text-gray-400 mb-2">{product.desc}</p>
                  <div className="flex items-center text-primary dark:text-white mt-auto">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={`material-symbols-outlined text-[14px] ${star > Math.ceil(product.rating) ? 'text-surface-container-highest dark:text-gray-700' : ''}`} data-icon={star > product.rating ? (star - product.rating === 0.5 ? 'star_half' : 'star') : 'star'} data-weight="fill">{star > product.rating ? (star - product.rating === 0.5 ? 'star_half' : 'star') : 'star'}</span>
                    ))}
                    <span className="font-label-sm text-xs text-on-surface-variant dark:text-gray-400 ml-2">({product.reviews})</span>
                  </div>
                </div>
              </Link>
            ))}

            {/* Skeleton Loaders */}
            {isLoadingMore && [1, 2, 3].map(i => (
              <div key={`skeleton-${i}`} className="flex flex-col animate-pulse">
                <div className="w-full aspect-[4/5] bg-surface-container dark:bg-gray-800 rounded-sm mb-4 hover-lift"></div>
                <div className="h-6 bg-surface-container dark:bg-gray-800 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-surface-container dark:bg-gray-800 rounded mb-4 w-1/2"></div>
                <div className="h-4 bg-surface-container dark:bg-gray-800 rounded w-1/4 mt-auto"></div>
              </div>
            ))}
          </div>

          {/* Pagination / Load More */}
          {hasMore && (
            <div className="mt-[48px] flex justify-center">
              <button 
                onClick={handleLoadMore} 
                disabled={isLoadingMore}
                className="px-8 py-3 bg-white dark:bg-transparent border border-outline-variant dark:border-gray-700 text-on-surface dark:text-white font-label-sm text-[14px] rounded hover:bg-surface-container-low dark:hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoadingMore && <span className="material-symbols-outlined animate-spin text-[16px]" style={{animation: "spin 1s linear infinite"}}>progress_activity</span>}
                {isLoadingMore ? 'Loading...' : 'Load More Products'}
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
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

export default ProductListingPage;
