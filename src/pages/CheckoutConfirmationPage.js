import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import { useSearch } from '../SearchContext';
import { useCart } from '../CartContext';

const CheckoutConfirmationPage = () => {
  const { openSearch } = useSearch();
  const { theme, toggleTheme } = useTheme();
  const { cartItems, clearCart, subtotal } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    clearCart();
    window.scrollTo(0, 0);
  };

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="bg-background text-on-background dark:bg-neutral-950 dark:text-neutral-100 antialiased min-h-screen flex flex-col transition-colors duration-300 animate-reveal">
      {/* Simplified Transactional Header */}
      <header className="w-full bg-surface-container-lowest dark:bg-neutral-900 border-b border-surface-container-highest dark:border-neutral-800 sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-[1280px] mx-auto px-[32px] h-20 flex justify-between items-center">
          <Link className="flex items-center gap-2 text-primary dark:text-white hover:opacity-70 transition-opacity" to="/cart">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            <span className="font-label-sm text-[14px] uppercase tracking-widest">Return to Cart</span>
          </Link>
          <Link className="font-display text-[24px] tracking-[0.2em] font-bold text-primary dark:text-white" to="/">
            ESSENTIALS
          </Link>
          <div className="flex items-center gap-4">
            <button aria-label="Toggle Dark Mode" className="text-on-surface-variant dark:text-neutral-400 hover:text-primary dark:hover:text-white transition-colors flex items-center" onClick={toggleTheme}>
              {theme === 'dark' ? (
                <span className="material-symbols-outlined text-[20px]">light_mode</span>
              ) : (
                <span className="material-symbols-outlined text-[20px]">dark_mode</span>
              )}
            </button>
            <div className="flex items-center gap-2 text-on-surface-variant dark:text-neutral-400">
              <span className="material-symbols-outlined text-[20px]">lock</span>
              <span className="font-label-sm text-[14px] uppercase tracking-widest hidden md:inline-block">Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      {!isSubmitted ? (
        <main className="flex-grow max-w-[1280px] mx-auto w-full px-[20px] md:px-[32px] py-[64px] grid grid-cols-1 lg:grid-cols-12 gap-[32px] lg:gap-16">
          {/* Left Column: Checkout Flow */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-[48px]">
            {/* Progress Indicator */}
            <nav aria-label="Progress">
              <ol className="flex items-center space-x-2 md:space-x-4" role="list">
                <li className="flex items-center">
                  <span className="font-label-sm text-[14px] uppercase tracking-widest text-primary dark:text-white border-b border-primary dark:border-white pb-1">Shipping</span>
                </li>
                <li className="flex items-center">
                  <span className="material-symbols-outlined text-outline dark:text-neutral-500 text-[16px] mx-1 md:mx-2">chevron_right</span>
                  <span className="font-label-sm text-[14px] uppercase tracking-widest text-outline dark:text-neutral-500">Payment</span>
                </li>
                <li className="flex items-center">
                  <span className="material-symbols-outlined text-outline dark:text-neutral-500 text-[16px] mx-1 md:mx-2">chevron_right</span>
                  <span className="font-label-sm text-[14px] uppercase tracking-widest text-outline dark:text-neutral-500">Review</span>
                </li>
              </ol>
            </nav>

            {/* Step 1: Shipping Form */}
            <section className="flex flex-col gap-[24px]">
              <h1 className="font-h2 text-[32px] font-semibold text-primary dark:text-white">Contact Details</h1>
              <form className="flex flex-col gap-[24px]" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <label className="font-label-sm text-[14px] text-on-surface-variant dark:text-neutral-400 mb-2" htmlFor="email">Email Address</label>
                  <input required className="w-full bg-transparent border-0 border-b border-surface-dim dark:border-neutral-700 focus:ring-0 focus:border-primary dark:focus:border-white py-3 px-0 font-body-md text-[16px] text-primary dark:text-white transition-colors" id="email" name="email" placeholder="Enter your email" type="email"/>
                </div>

                <h2 className="font-h3 text-[24px] font-semibold text-primary dark:text-white mt-[24px]">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[32px] gap-y-[24px]">
                  <div className="flex flex-col">
                    <label className="font-label-sm text-[14px] text-on-surface-variant dark:text-neutral-400 mb-2" htmlFor="firstName">First Name</label>
                    <input required className="w-full bg-transparent border-0 border-b border-surface-dim dark:border-neutral-700 focus:ring-0 focus:border-primary dark:focus:border-white py-3 px-0 font-body-md text-[16px] text-primary dark:text-white transition-colors" id="firstName" name="firstName" type="text"/>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-label-sm text-[14px] text-on-surface-variant dark:text-neutral-400 mb-2" htmlFor="lastName">Last Name</label>
                    <input required className="w-full bg-transparent border-0 border-b border-surface-dim dark:border-neutral-700 focus:ring-0 focus:border-primary dark:focus:border-white py-3 px-0 font-body-md text-[16px] text-primary dark:text-white transition-colors" id="lastName" name="lastName" type="text"/>
                  </div>
                  <div className="flex flex-col md:col-span-2">
                    <label className="font-label-sm text-[14px] text-on-surface-variant dark:text-neutral-400 mb-2" htmlFor="address">Address</label>
                    <input required className="w-full bg-transparent border-0 border-b border-surface-dim dark:border-neutral-700 focus:ring-0 focus:border-primary dark:focus:border-white py-3 px-0 font-body-md text-[16px] text-primary dark:text-white transition-colors" id="address" name="address" type="text"/>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-label-sm text-[14px] text-on-surface-variant dark:text-neutral-400 mb-2" htmlFor="city">City</label>
                    <input required className="w-full bg-transparent border-0 border-b border-surface-dim dark:border-neutral-700 focus:ring-0 focus:border-primary dark:focus:border-white py-3 px-0 font-body-md text-[16px] text-primary dark:text-white transition-colors" id="city" name="city" type="text"/>
                  </div>
                  <div className="grid grid-cols-2 gap-x-[32px]">
                    <div className="flex flex-col">
                      <label className="font-label-sm text-[14px] text-on-surface-variant dark:text-neutral-400 mb-2" htmlFor="state">State</label>
                      <select required className="w-full bg-transparent border-0 border-b border-surface-dim dark:border-neutral-700 focus:ring-0 focus:border-primary dark:focus:border-white py-3 px-0 font-body-md text-[16px] text-primary dark:text-white transition-colors appearance-none" id="state" name="state">
                        <option className="dark:bg-neutral-900" value="">Select</option>
                        <option className="dark:bg-neutral-900" value="NY">NY</option>
                        <option className="dark:bg-neutral-900" value="CA">CA</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="font-label-sm text-[14px] text-on-surface-variant dark:text-neutral-400 mb-2" htmlFor="zip">ZIP Code</label>
                      <input required className="w-full bg-transparent border-0 border-b border-surface-dim dark:border-neutral-700 focus:ring-0 focus:border-primary dark:focus:border-white py-3 px-0 font-body-md text-[16px] text-primary dark:text-white transition-colors" id="zip" name="zip" type="text"/>
                    </div>
                  </div>
                </div>

                <div className="flex items-center mt-[12px]">
                  <input className="h-4 w-4 rounded border-surface-dim dark:border-neutral-700 text-primary dark:text-white focus:ring-primary dark:focus:ring-white focus:ring-offset-background dark:focus:ring-offset-neutral-950 bg-transparent dark:checked:bg-white dark:checked:border-white" id="save-info" type="checkbox"/>
                  <label className="ml-3 font-body-md text-[16px] text-on-surface-variant dark:text-neutral-400" htmlFor="save-info">Save this information for next time</label>
                </div>

                <div className="mt-[48px] flex flex-col sm:flex-row justify-end items-center gap-[24px]">
                  <button className="w-full sm:w-auto px-8 py-4 bg-primary dark:bg-white text-on-primary dark:text-neutral-950 rounded font-label-sm text-[14px] uppercase tracking-widest hover:opacity-80 transition-opacity duration-300" type="submit">
                    Continue to Payment
                  </button>
                </div>
              </form>
            </section>
          </div>

          {/* Right Column: Order Summary Sidebar */}
          <div className="lg:col-span-5 xl:col-span-4 mt-[120px] lg:mt-0">
            <div className="sticky top-32 bg-surface-container-lowest dark:bg-neutral-900 border border-surface-container-highest dark:border-neutral-800 rounded-lg p-[24px] flex flex-col gap-[24px] transition-colors duration-300">
              <h2 className="font-h3 text-[24px] font-semibold text-primary dark:text-white border-b border-surface-container-highest dark:border-neutral-800 pb-4">Order Summary</h2>
              
              {/* Items List */}
              <div className="flex flex-col gap-[12px] divide-y divide-surface-container-highest dark:divide-neutral-800">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex items-start gap-4 py-4">
                    <div className="w-20 h-24 bg-surface-container dark:bg-neutral-800 rounded overflow-hidden flex-shrink-0">
                      <img alt={item.name} className="w-full h-full object-cover" src={item.image}/>
                    </div>
                    <div className="flex-grow flex flex-col justify-between h-full">
                      <div>
                        <h3 className="font-label-sm text-[14px] text-primary dark:text-white uppercase tracking-widest">{item.name}</h3>
                        <p className="font-body-md text-[16px] text-on-surface-variant dark:text-neutral-400 mt-1">Color: {item.selectedColor}</p>
                        {item.selectedSize && <p className="font-body-md text-[16px] text-on-surface-variant dark:text-neutral-400">Size: {item.selectedSize}</p>}
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-label-sm text-[14px] text-on-surface-variant dark:text-neutral-400">Qty: {item.quantity}</span>
                        <span className="font-body-md text-[16px] text-primary dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="flex flex-col gap-2 pt-4 border-t border-surface-container-highest dark:border-neutral-800">
                <div className="flex justify-between items-center">
                  <span className="font-body-md text-[16px] text-on-surface-variant dark:text-neutral-400">Subtotal</span>
                  <span className="font-body-md text-[16px] text-primary dark:text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body-md text-[16px] text-on-surface-variant dark:text-neutral-400">Shipping</span>
                  <span className="font-label-sm text-[14px] text-outline dark:text-neutral-500 uppercase tracking-widest">Calculated next step</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body-md text-[16px] text-on-surface-variant dark:text-neutral-400">Estimated Tax</span>
                  <span className="font-body-md text-[16px] text-primary dark:text-white">${tax.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-primary dark:border-white">
                <span className="font-h3 text-[24px] font-semibold text-primary dark:text-white">Total</span>
                <span className="font-h3 text-[24px] font-semibold text-primary dark:text-white">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </main>
      ) : (
        /* Success Confirmation Section */
        <section className="flex-grow w-full bg-surface-container-low dark:bg-neutral-950 py-[120px] flex justify-center items-center px-[20px] transition-colors duration-300">
          <div className="max-w-2xl w-full flex flex-col items-center text-center gap-[48px] bg-surface-container-lowest dark:bg-neutral-900 p-[64px] rounded-xl shadow-2xl shadow-primary/5 dark:shadow-black/50 border border-surface-container-highest dark:border-neutral-800 transition-colors duration-300">
            <div className="w-20 h-20 rounded-full bg-secondary-container dark:bg-secondary dark:text-white text-on-secondary-container flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[40px]">check_circle</span>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="font-h1 text-[48px] font-bold text-primary dark:text-white">Thank you for your order.</h2>
              <p className="font-body-lg text-[18px] text-on-surface-variant dark:text-neutral-400 max-w-lg mx-auto">
                Your order has been placed successfully. We've sent a confirmation email with your receipt and tracking details.
              </p>
            </div>
            <div className="w-full border-t border-b border-surface-container-highest dark:border-neutral-800 py-[24px] flex flex-col md:flex-row justify-center gap-[48px]">
              <div className="flex flex-col gap-1">
                <span className="font-label-sm text-[14px] text-outline dark:text-neutral-500 uppercase tracking-widest">Order Number</span>
                <span className="font-h3 text-[24px] font-semibold text-primary dark:text-white">#ESS-84920</span>
              </div>
              <div className="hidden md:block w-px bg-surface-container-highest dark:bg-neutral-800"></div>
              <div className="flex flex-col gap-1">
                <span className="font-label-sm text-[14px] text-outline dark:text-neutral-500 uppercase tracking-widest">Estimated Delivery</span>
                <span className="font-h3 text-[24px] font-semibold text-primary dark:text-white">Oct 24 - Oct 26</span>
              </div>
            </div>
            <Link to="/shop" className="mt-4 px-10 py-4 border border-primary dark:border-white text-primary dark:text-white bg-transparent rounded font-label-sm text-[14px] uppercase tracking-widest hover:bg-primary dark:hover:bg-white hover:text-on-primary dark:hover:text-neutral-950 transition-colors duration-500 ease-in-out">
              Continue Shopping
            </Link>
          </div>
        </section>
      )}

      {/* Simplified Footer */}
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

export default CheckoutConfirmationPage;
