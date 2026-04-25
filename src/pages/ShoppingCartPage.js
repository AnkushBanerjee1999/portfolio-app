import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import { useCart } from '../CartContext';

const ShoppingCartPage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { cartItems, removeItem, updateQuantity, subtotal, totalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="bg-background dark:bg-black text-on-background dark:text-gray-100 font-body-md text-body-md antialiased min-h-screen flex flex-col transition-colors duration-300 animate-reveal">
      {/* TopAppBar */}
      <header className="sticky top-0 w-full z-50 glass-header shadow-none font-epilogue antialiased tracking-tight text-black dark:text-white">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center px-8 h-20">
          <Link to="/" className="font-epilogue text-xl font-bold tracking-[0.2em] uppercase transition-transform active:scale-95 hover:opacity-70">ESSENTIALS</Link>
          <nav className="hidden md:flex space-x-8">
            <Link to="/shop" className="border-b border-black dark:border-white pb-1 transition-all duration-500 ease-in-out hover:opacity-70 cursor-pointer active:scale-95 font-body-md text-[16px]">Shop All</Link>
            <Link to="/shop" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-500 ease-in-out hover:opacity-70 cursor-pointer active:scale-95 font-body-md text-[16px]">Collections</Link>
            <Link to="/shop" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-500 ease-in-out hover:opacity-70 cursor-pointer active:scale-95 font-body-md text-[16px]">Journal</Link>
            <Link to="/shop" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-500 ease-in-out hover:opacity-70 cursor-pointer active:scale-95 font-body-md text-[16px]">Our Story</Link>
          </nav>
          <div className="flex items-center space-x-6">
            <button aria-label="Toggle Dark Mode" className="transition-all duration-500 ease-in-out hover:opacity-70 cursor-pointer active:scale-95 flex items-center" onClick={toggleTheme} type="button">
              {theme === 'dark' ? (
                <span className="material-symbols-outlined">light_mode</span>
              ) : (
                <span className="material-symbols-outlined">dark_mode</span>
              )}
            </button>
            <div className="relative hidden lg:block group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-gray-400 z-10" data-icon="search">search</span>
              <input 
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && navigate('/shop?search=' + localSearch)}
                className="pl-10 pr-4 py-2 bg-surface-container-low dark:bg-gray-900 border-b border-outline-variant dark:border-gray-700 focus:border-primary dark:focus:border-white focus:ring-0 w-48 focus:w-64 transition-all duration-300 font-body-md text-[16px] text-on-surface dark:text-white outline-none rounded-t-sm" 
                placeholder="Search..." 
                type="text"
              />
            </div>
            <button onClick={() => navigate('/shop')} className="lg:hidden cursor-pointer transition-transform active:scale-95 transition-all duration-500 ease-in-out hover:opacity-70">
              <span className="material-symbols-outlined" data-icon="search">search</span>
            </button>
            <Link to="/cart" className="transition-all duration-500 ease-in-out hover:opacity-70 cursor-pointer active:scale-95 relative">
              <span className="material-symbols-outlined" data-icon="shopping_bag">shopping_bag</span>
              {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-primary dark:bg-white text-on-primary dark:text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{totalItems}</span>}
            </Link>
            <Link to="/profile" className="hidden lg:block transition-all duration-500 ease-in-out hover:opacity-70 cursor-pointer active:scale-95"><span className="material-symbols-outlined" data-icon="person">person</span></Link>
            <button className="md:hidden transition-all duration-500 ease-in-out hover:opacity-70 cursor-pointer active:scale-95" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
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
      <main className="flex-grow max-w-[1280px] mx-auto w-full px-[20px] md:px-[64px] py-[64px] flex flex-col lg:flex-row gap-[48px] md:gap-[64px]">
        {/* Cart Items Section */}
        <section className="flex-grow">
          <div className="flex justify-between items-end border-b border-surface-variant dark:border-gray-800 pb-[24px] mb-[48px]">
            <h1 className="font-h1 text-[48px] font-bold text-on-surface dark:text-white">Your Cart</h1>
            <span className="font-label-sm text-[14px] text-on-surface-variant dark:text-gray-400 uppercase tracking-widest">{totalItems} Items</span>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-[120px]">
              <h2 className="font-h3 text-[24px] text-on-surface dark:text-white mb-4">Your cart is empty.</h2>
              <Link to="/shop" className="inline-block bg-primary dark:bg-white text-on-primary dark:text-black px-8 py-3 rounded font-label-sm text-[14px] uppercase tracking-widest hover:bg-black/80 dark:hover:bg-gray-200 transition-colors">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-[48px]">
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-[24px] md:gap-[32px] border-b border-surface-container-high dark:border-gray-800 pb-[48px]">
                  {/* Product Image */}
                  <Link to="/product" className="w-full sm:w-[160px] md:w-[200px] aspect-[4/5] bg-surface-container-low dark:bg-gray-900 rounded-sm overflow-hidden flex-shrink-0 group hover-lift">
                    <img alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={item.image}/>
                  </Link>
                  {/* Product Details & Actions */}
                  <div className="flex flex-col flex-grow justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="font-h3 text-[24px] font-semibold text-on-surface dark:text-white mb-1"><Link to="/product" className="hover:opacity-70 transition-opacity">{item.name}</Link></h2>
                        <p className="font-body-md text-[16px] text-on-surface-variant dark:text-gray-400 mb-1">Color: {item.selectedColor}</p>
                        {item.selectedSize && <p className="font-body-md text-[16px] text-on-surface-variant dark:text-gray-400">Size: {item.selectedSize}</p>}
                      </div>
                      <span className="font-body-lg text-[18px] font-medium text-on-surface dark:text-white">${item.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-end mt-[24px] sm:mt-0">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-outline-variant dark:border-gray-700 rounded w-[120px] h-[48px]">
                        <button onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, item.quantity - 1)} className="w-10 h-full flex items-center justify-center text-on-surface dark:text-white hover:bg-surface-container-low dark:hover:bg-gray-800 transition-colors" aria-label="Decrease quantity">
                          <span className="material-symbols-outlined text-[16px]">remove</span>
                        </button>
                        <span className="flex-grow text-center font-body-md text-[16px] text-on-surface dark:text-white">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, item.quantity + 1)} className="w-10 h-full flex items-center justify-center text-on-surface dark:text-white hover:bg-surface-container-low dark:hover:bg-gray-800 transition-colors" aria-label="Increase quantity">
                          <span className="material-symbols-outlined text-[16px]">add</span>
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.id, item.selectedColor, item.selectedSize)} className="font-label-sm text-[14px] text-on-surface-variant dark:text-gray-400 uppercase tracking-widest hover:text-primary dark:hover:text-white transition-colors underline underline-offset-4">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Order Summary Sidebar */}
        <aside className="w-full lg:w-[380px] xl:w-[420px] flex-shrink-0">
          <div className="bg-surface-container-lowest dark:bg-gray-900 border border-surface-container-highest dark:border-gray-800 rounded p-[32px] md:p-[48px] sticky top-[120px]">
            <h2 className="font-h3 text-[24px] font-semibold text-on-surface dark:text-white mb-[32px] pb-[24px] border-b border-surface-container-highest dark:border-gray-800">Order Summary</h2>
            
            <div className="flex flex-col gap-[16px] mb-[32px]">
              <div className="flex justify-between items-center font-body-md text-[16px] text-on-surface dark:text-gray-300">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center font-body-md text-[16px] text-on-surface dark:text-gray-300">
                <span>Estimated Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center font-body-md text-[16px] text-on-surface dark:text-gray-300">
                <span>Shipping</span>
                <span className="text-on-surface-variant dark:text-gray-500 font-label-sm text-[14px] uppercase tracking-widest">Calculated at checkout</span>
              </div>
            </div>

            <div className="flex justify-between items-end border-t border-surface-container-highest dark:border-gray-800 pt-[32px] mb-[48px]">
              <span className="font-h3 text-[24px] font-semibold text-on-surface dark:text-white">Total</span>
              <span className="font-h3 text-[24px] font-semibold text-on-surface dark:text-white">${total.toFixed(2)}</span>
            </div>

            <Link to="/checkout" className={`w-full bg-primary dark:bg-white text-on-primary dark:text-black rounded font-label-sm text-[14px] uppercase tracking-[0.1em] h-[56px] flex items-center justify-center gap-2 group transition-all duration-300 ${cartItems.length === 0 ? 'opacity-50 pointer-events-none' : 'hover:bg-inverse-surface dark:hover:bg-gray-200 hover:shadow-lg'}`}>
              Proceed to Checkout
              <span className="material-symbols-outlined text-[18px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">arrow_forward</span>
            </Link>

            <div className="mt-[24px] flex items-center justify-center gap-2 text-on-surface-variant dark:text-gray-500">
              <span className="material-symbols-outlined text-[16px]">lock</span>
              <span className="font-label-sm text-[12px] uppercase tracking-widest">Secure Checkout</span>
            </div>
          </div>
        </aside>
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

export default ShoppingCartPage;
