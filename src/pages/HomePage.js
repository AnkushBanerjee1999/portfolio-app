import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import { useSearch } from '../SearchContext';
import { useCart } from '../CartContext';

const HomePage = () => {
  const { openSearch } = useSearch();
  const { theme, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const [email, setEmail] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(null);

  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with ${email}!`);
      setEmail('');
    }
  };

  return (
    <div className="bg-background dark:bg-black text-on-background dark:text-gray-100 font-body-md text-body-md antialiased selection:bg-primary dark:selection:bg-white selection:text-on-primary dark:selection:text-black transition-colors duration-300 animate-reveal">
      {/* TopAppBar */}
      <header className="sticky top-0 w-full z-50 glass-header shadow-none font-epilogue antialiased tracking-tight">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center px-8 h-20">
          {/* Brand Logo */}
          <Link to="/" className="font-epilogue text-xl font-bold tracking-[0.2em] text-black dark:text-white cursor-pointer transition-transform active:scale-95 transition-all duration-500 ease-in-out hover:opacity-70">
            ESSENTIALS
          </Link>
          {/* Navigation Links */}
          <nav className="hidden md:flex gap-8">
            <Link to="/shop" className="text-black dark:text-white border-b border-black dark:border-white pb-1 transition-all duration-500 ease-in-out hover:opacity-70 cursor-pointer active:scale-95 magnetic-link">Shop All</Link>
            <Link to="/collections" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-500 ease-in-out hover:opacity-70 cursor-pointer active:scale-95 magnetic-link">Collections</Link>
            <Link to="/journal" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-500 ease-in-out hover:opacity-70 cursor-pointer active:scale-95 magnetic-link">Journal</Link>
            <Link to="/our-story" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-500 ease-in-out hover:opacity-70 cursor-pointer active:scale-95 magnetic-link">Our Story</Link>
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

      <main>
        {/* Hero Banner */}
        <section className="relative h-[819px] min-h-[600px] w-full bg-surface-container dark:bg-gray-900 overflow-hidden group" onClick={() => navigate('/shop')}>
          {/* Subtle Premium Gradient Overlay */}
          <div className="absolute inset-0 z-10 premium-gradient pointer-events-none opacity-50" />
          
          <img 
            alt="Hero Banner Image" 
            className="absolute inset-0 w-full h-[120%] object-cover object-center transition-transform duration-300 ease-out cursor-pointer" 
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop"
          />
          <div className="absolute inset-0 bg-black/20 dark:bg-black/40 transition-colors duration-300 pointer-events-none"></div>
          <div className="relative max-w-[1280px] mx-auto px-[20px] md:px-[64px] h-full flex items-end pb-24 pointer-events-none">
            <div className="max-w-2xl text-on-primary">
              <h1 className="font-display text-[72px] font-bold leading-[1.1] tracking-[-0.04em] mb-[24px] text-white text-reveal">
                <span style={{ animationDelay: '0.2s' }}>The Art of Subtraction.</span>
              </h1>
              <p className="font-body-lg text-[18px] leading-[1.6] mb-[48px] text-white/90 animate-reveal" style={{ animationDelay: '0.4s' }}>Curated essentials designed for modern living. Elevate your space with pieces that embody form and function.</p>
              <Link to="/shop" className="inline-block bg-accent-forest text-white px-8 py-4 rounded font-label-sm text-[14px] font-medium uppercase tracking-widest hover:bg-accent-gold transition-all duration-500 pointer-events-auto hover-lift">
                Explore Collection
              </Link>
            </div>
          </div>
        </section>

        {/* Category Bento Grid */}
        <section className="max-w-[1280px] mx-auto px-[20px] md:px-[64px] py-[120px]">
          <div className="flex justify-between items-end mb-[48px]">
            <h2 className="font-h2 text-[32px] font-semibold text-on-background dark:text-white">Curated Categories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[8px] h-[600px]">
            {/* Large Item */}
            <div onClick={() => navigate('/shop')} className="md:col-span-2 relative group overflow-hidden bg-surface-container dark:bg-gray-900 cursor-pointer rounded hover-lift">
              <img alt="Living Space" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" data-alt="modern minimalist living room with a sleek sofa, abstract art, and soft natural lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbGx4eRgAmDj-mGrNTj8UsRQg9nLup6zHcMkxqqvJSSUd9wXZ1QlEclE1tp1EI_jSyHhUI34ZK0cGXlDGju8JnIryF9xwDIIFVvE0nf2sHud4AEIqO92050Zx92PxW8lFgfi5wD0v__Xek6JT8n287dcCRcGjq_XzNI4Jsibr__Xz5OENSdBPRDEAdP4Rvz0wVU_Y9nHTNLYEeSqhF0QP5oOK4v63RFgQ5PbZQwmsCJvmpDkCYsvY6AnVT_8G2lPsNhW7ZhqWnTb3t"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent dark:from-black/80"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <span className="bg-white/90 dark:bg-black/90 backdrop-blur px-3 py-1 rounded-full font-label-sm text-[14px] text-black dark:text-white mb-4 inline-block">Home</span>
                <h3 className="font-h3 text-[24px] font-semibold text-white">Living Spaces</h3>
              </div>
            </div>
            {/* Stacked Items */}
            <div className="grid grid-rows-2 gap-[8px] h-full">
              <div onClick={() => navigate('/shop')} className="relative group overflow-hidden bg-surface-container dark:bg-gray-900 cursor-pointer rounded hover-lift">
                <img alt="Tech" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" data-alt="high-end minimalist headphones resting on a concrete surface with dramatic lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmfEnPp8MyvDtbSSmW9FN7fyCUa0hf66AUb8RCE6tuHu3g7eyJl5s3kgVj1v4M3OpUPj3S4OwaJSncqzkineRWxYy_ZdPyg1u58JOPUf-zgnP5KBS9Qn30g9S_ga6apt6xe9bBz4hRyq_xSFnAoLfykWl-YOLrULibnRjqaRyPPe8OrsCeZ9LsNUP-2g-oGVAY-HkKV1Pmw57Vg-DVqCL2NcIFX6noezfTE61DFRGMPG_O4fbliCuRKLv6cCsFW0BJXLnm2ctJAHsf"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent dark:from-black/70"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="font-h3 text-[24px] font-semibold text-white">Audio</h3>
                </div>
              </div>
              {/* Tall Item */}
              <div onClick={() => navigate('/shop')} className="relative group overflow-hidden bg-surface-container dark:bg-gray-900 cursor-pointer rounded hover-lift">
                <img alt="Apparel" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" data-alt="close up of premium textured fabric in muted tones, highlighting craftsmanship" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrJvEKiWjmtinELSA7SJ6aql7mE0QnLfI8me-eldLFRc9xkKNMhH-gdKSOzZmRdaQhUH7IcedMTI68y_axMHozqoLykBiZbHD-v2HlMLNA-TAY13XKIH45BdXtUTZXNIg4i9e-qRpkHn0WtwcJPdOnY_a0HGuNHKo4NkvXbOgSGAWmLq52wOzldVQ0SHEYtQWPvWBuvRCirSNJWCH5-jnsVGkW7g0HhiRyk84HqT1Ojr2Jw83OwvUDJl5xsHp_X0ll1Wje8kTBzGGT"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent dark:from-black/70"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="font-h3 text-[24px] font-semibold text-white">Apparel</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Marquee */}
        <section className="bg-surface-container dark:bg-white/5 py-10 overflow-hidden border-y border-primary/5 dark:border-white/5 relative">
          <div className="flex whitespace-nowrap animate-marquee">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-16 px-8">
                <span className="font-display text-[24px] font-medium text-primary dark:text-white uppercase tracking-[0.4em] opacity-80">Quality over Quantity</span>
                <span className="w-2 h-2 rounded-full bg-accent-gold"></span>
                <span className="font-display text-[24px] font-medium text-primary dark:text-white uppercase tracking-[0.4em] opacity-80">Sustainably Crafted</span>
                <span className="w-2 h-2 rounded-full bg-accent-gold"></span>
                <span className="font-display text-[24px] font-medium text-primary dark:text-white uppercase tracking-[0.4em] opacity-80">Essentials for Living</span>
                <span className="w-2 h-2 rounded-full bg-accent-gold"></span>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial Section */}
        <section className="max-w-[1280px] mx-auto px-[20px] md:px-[64px] py-[120px] grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1 animate-reveal" style={{ animationDelay: '0.2s' }}>
            <h2 className="font-display text-[48px] font-bold leading-tight mb-8 text-primary dark:text-white">Form follows function, <br/>beauty follows purpose.</h2>
            <p className="font-body-lg text-[20px] text-on-surface-variant dark:text-gray-400 mb-12 leading-relaxed italic">
              "We believe that the things you surround yourself with should be as intentional as the life you lead. Our pieces are designed to be the quiet foundation of your modern wardrobe."
            </p>
            <div className="flex flex-col gap-6 border-l-2 border-primary/10 dark:border-white/10 pl-8">
              <div>
                <h4 className="font-h3 text-[18px] font-bold mb-2 text-primary dark:text-white">Timeless Design</h4>
                <p className="font-body-md text-on-surface-variant dark:text-gray-500">Beyond trends. Beyond seasons. Built for the long haul.</p>
              </div>
              <div>
                <h4 className="font-h3 text-[18px] font-bold mb-2 text-primary dark:text-white">Ethical Craft</h4>
                <p className="font-body-md text-on-surface-variant dark:text-gray-500">Produced in small batches with fair wages and minimal waste.</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative aspect-[4/5] overflow-hidden rounded-lg group hover-lift">
             <img src="https://picsum.photos/id/43/800/1000" alt="Editorial Lookbook" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
             <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-700"></div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="relative max-w-[1280px] mx-auto px-[20px] md:px-[64px] py-[120px] bg-surface-container-low/30 dark:bg-white/5 rounded-[40px] my-[64px] overflow-hidden">
          {/* Background Kinetic Text */}
          <div 
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none select-none opacity-[0.03] dark:opacity-[0.05] whitespace-nowrap font-display text-[300px] font-black uppercase text-primary dark:text-white"
            style={{ transform: `translateX(${-scrollY * 0.1}px)` }}
          >
            Essentials Essentials Essentials
          </div>
          
          <div className="relative z-10 flex justify-between items-end mb-[64px]">
            <div>
              <span className="font-label-sm text-primary/50 dark:text-white/50 uppercase tracking-[0.3em] mb-4 block">Selected Works</span>
              <h2 className="font-h2 text-[40px] font-bold text-on-background dark:text-white">Essentials for Every Day</h2>
            </div>
            <Link to="/shop" className="hidden md:inline-flex items-center gap-3 font-label-sm text-[14px] uppercase tracking-widest text-on-surface dark:text-gray-300 hover:text-primary dark:hover:text-white transition-all group">
              View All <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-2">arrow_right_alt</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[32px]">
              {/* Product Card 1 */}
              <Link to="/product" className="group cursor-pointer block">
                <div className="relative aspect-[4/5] bg-surface-container dark:bg-gray-900 overflow-hidden rounded mb-[24px] hover-lift">
                  <img alt="Chair" className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 mix-blend-multiply dark:mix-blend-normal" data-alt="minimalist wooden dining chair with elegant curves, isolated against a soft grey background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAII4CHDuu9yFQKsP1kGrskZNTzjdrQqvLmG0aAy1FtKigUTGzc-KVuHR1OjWUfq3MVcTt5hbYmxVlJsT2yiSghW1YOj5X5zQJnrKYy561dxgT-itxkVkOsxKz4E_43_FktVkNq85nm-WQnqKms0GoPYsRAcvIAm6RRIrOecQGPEDc7lup_TuQMA3FK0_ckbB8i6WRnvXW1ucAkWNYiHix9gRXCcEskNFuYgGUcwDSUZmbl1rAI42wWeDfKvHRUPKvVBpluZ4b1Yw8P"/>
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent-gold/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full font-label-sm text-[11px] font-bold uppercase tracking-widest">Limited Edition</span>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-body-md text-[16px] font-medium text-on-background dark:text-white">Odin Lounge Chair</h4>
                    <p className="font-label-sm text-[14px] text-on-surface-variant dark:text-gray-400 mt-1">Ash Wood</p>
                  </div>
                  <span className="font-body-md text-[16px] text-on-background dark:text-white">$895</span>
                </div>
              </Link>
              {/* Product Card 2 */}
              <Link to="/product" className="group cursor-pointer block">
                <div className="relative aspect-[4/5] bg-surface-container dark:bg-gray-900 overflow-hidden rounded mb-[24px] hover-lift">
                  <img alt="Watch" className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 mix-blend-multiply dark:mix-blend-normal" data-alt="sleek modern smartwatch with a matte black finish resting on a stone surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNoB41OLipvyruvcfOSvw8QaFJ5tRivxdza99CgMsQW4gvy2OEeG7JZTa5jiY7SqTrOYPNvWDumklkWCDL9uDUd7Sli4Z3M_hGt5Y-C-2Kap_5Bo6p-zOQPkD9y0vgo4dYK7j6uqIQbPYW3gd-fPBHu7s63PSHTUotNyizXn94o8O2jMtiUEAfxUYBcXE1shF6ljkFOTM0f09evS0CwLJT-W9Kubl-yC-DDGPx0lffg5tEiKAufdx8orub9fUfmLc4Pyfnx7qQMVsR"/>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-body-md text-[16px] font-medium text-on-background dark:text-white">Timepiece 01</h4>
                    <p className="font-label-sm text-[14px] text-on-surface-variant dark:text-gray-400 mt-1">Matte Black</p>
                  </div>
                  <span className="font-body-md text-[16px] text-on-background dark:text-white">$245</span>
                </div>
              </Link>
              {/* Product Card 3 */}
              <Link to="/product" className="group cursor-pointer block">
                <div className="relative aspect-[4/5] bg-surface-container dark:bg-gray-900 overflow-hidden rounded mb-[24px] hover-lift">
                  <img alt="T-Shirt" className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 mix-blend-multiply dark:mix-blend-normal" data-alt="folded premium cotton t-shirt in soft beige, minimalist studio lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_S4Mbv3d_3pUw61BoOw3Eetu8qqeSLf7gOODQq8PLN_AKdPlzdB0_0lIXxeo4VI3XnoyCMhT5_xLk57nXP39hnvB7sutpC23-4HCpJC5dM5qU0O6QbHJGwDAlnx6RPSORxk3UAa3FhzXTuHDwazJjnG2-kWnD4laEQFT6Zvvjz01HinjQcz6psDUMX62mWcfaaZ7rl2MMBZQ0T4MV01cVq8j_tlRn6AjeKfU_gYI-SyFjgfdfKLEm7iU6m5iRMREM4K8YfOCjEGC5"/>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-body-md text-[16px] font-medium text-on-background dark:text-white">Essential Tee</h4>
                    <p className="font-label-sm text-[14px] text-on-surface-variant dark:text-gray-400 mt-1">Heavyweight Cotton</p>
                  </div>
                  <span className="font-body-md text-[16px] text-on-background dark:text-white">$65</span>
                </div>
              </Link>
              {/* Product Card 4 */}
              <Link to="/product" className="group cursor-pointer block">
                <div className="relative aspect-[4/5] bg-surface-container dark:bg-gray-900 overflow-hidden rounded mb-[24px] hover-lift">
                  <img alt="Sofa" className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 mix-blend-multiply dark:mix-blend-normal" data-alt="contemporary modular sofa in light grey bouclé fabric, set against a white wall" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCy0Gwy-LgrCi0L1pqet8OEd1iQ6nR33lO6tRS2DMfFBhMD-QvpDHhg62uhDF4X5qeRv-OBsOX4urQK2rJ1n0wGnxCXuosa5FuRYhGZO11mnC1k5MLxCnuvzagHneUubrln1Hj-lzIunDV22T8DScfnM8nT2N5pkykI2nyIonty7hwawxHsEOrxsg4_uztm7OS7EZSbHI1UCpZbdby2GvsBoY5czyjqkY-OziobQ0DH4KXDdcv7rKmGB_NnHgJAWcjz-J5nP-O1fqRd"/>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-body-md text-[16px] font-medium text-on-background dark:text-white">Modular Sofa</h4>
                    <p className="font-label-sm text-[14px] text-on-surface-variant dark:text-gray-400 mt-1">Bouclé</p>
                  </div>
                  <span className="font-body-md text-[16px] text-on-background dark:text-white">$2,400</span>
                </div>
              </Link>
            </div>
        </section>

        {/* Shop the Look Section */}
        <section className="py-[120px] bg-white dark:bg-black overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-[20px] md:px-[64px]">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div>
                <span className="font-label-sm text-primary/50 dark:text-white/50 uppercase tracking-[0.3em] mb-4 block">Editorial Edit</span>
                <h2 className="font-h2 text-[40px] font-bold text-primary dark:text-white">Shop the Look</h2>
              </div>
              <p className="max-w-md font-body-md text-on-surface-variant dark:text-gray-400 mt-6 md:mt-0">
                Discover the curated coordination of our latest collection. Each piece is designed to complement the next in perfect harmony.
              </p>
            </div>
            
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl group">
              <img 
                src="https://images.unsplash.com/photo-1679217121311-cdba4c533593?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Shop the Look" 
                className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
              />
              
              {/* Hotspots */}
              {[
                { id: 1, top: '25%', left: '45%', name: 'Sunglass', price: '$150', link: '/product' },
                { id: 2, top: '96%', left: '72%', name: 'Shirt', price: '$380', link: '/product' },
                { id: 3, top: '72%', left: '74%', name: 'Coat', price: '$520', link: '/product' }
              ].map((spot) => (
                <div 
                  key={spot.id}
                  className="absolute z-20 group/spot"
                  style={{ top: spot.top, left: spot.left }}
                  onMouseEnter={() => setActiveHotspot(spot.id)}
                  onMouseLeave={() => setActiveHotspot(null)}
                >
                  <button className="relative flex items-center justify-center">
                    <span className="absolute w-8 h-8 bg-white/30 rounded-full animate-ping"></span>
                    <span className="relative w-4 h-4 bg-white rounded-full shadow-lg border-2 border-black/10"></span>
                  </button>
                  
                  {activeHotspot === spot.id && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 bg-white dark:bg-neutral-900 p-4 rounded-xl shadow-2xl animate-hotspot border border-primary/5 dark:border-white/5 pointer-events-auto">
                      <h4 className="font-bold text-sm dark:text-white">{spot.name}</h4>
                      <p className="text-xs text-gray-500 mb-3">{spot.price}</p>
                      <Link to={spot.link} className="text-[10px] uppercase tracking-widest font-bold border-b border-black dark:border-white pb-1 hover:opacity-50 transition-all">Shop Item</Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-[160px] bg-[#05080a] relative overflow-hidden">
          {/* Subtle Glow behind the grid */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent-gold/10 blur-[150px] pointer-events-none" />

          <div className="max-w-[1280px] mx-auto px-[20px] md:px-[64px] relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 h-auto md:h-[700px]">
              {/* Image 1 */}
              <div className="relative group overflow-hidden rounded-[40px] border border-white/10 hover-lift h-[500px] md:h-full">
                <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop" alt="Lifestyle 1" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                
                {/* Glassy Title Card */}
                <div className="absolute bottom-8 left-8 right-8 bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 transition-all duration-700">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                  <span className="text-accent-gold font-label-sm uppercase tracking-[0.4em] block mb-2">Perspective</span>
                  <h3 className="text-white font-display text-3xl font-medium tracking-tight">The Atmosphere of Space</h3>
                </div>
              </div>

              {/* Image 2 */}
              <div className="relative group overflow-hidden rounded-[40px] border border-white/10 hover-lift h-[500px] md:h-full">
                <img src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2067&auto=format&fit=crop" alt="Lifestyle 2" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                
                {/* Glassy Title Card */}
                <div className="absolute bottom-8 left-8 right-8 bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 transition-all duration-700">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                  <span className="text-accent-gold font-label-sm uppercase tracking-[0.4em] block mb-2">Structure</span>
                  <h3 className="text-white font-display text-3xl font-medium tracking-tight">Geometry in Motion</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="relative w-full py-[160px] overflow-hidden bg-[#05080a] transition-colors duration-300">
          {/* Animated Glows */}
          <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-full blur-[120px] animate-pulse pointer-events-none" />
          <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] bg-gradient-to-br from-accent-gold/20 to-accent-forest/20 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '3s' }} />

          <div className="max-w-4xl mx-auto px-8 relative z-10">
            <div className="bg-white/5 dark:bg-black/40 border border-white/10 backdrop-blur-[30px] rounded-[40px] p-12 md:p-20 shadow-2xl text-center">
              {/* Corner Reflection */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-[40px]" />

              <span className="material-symbols-outlined text-[48px] text-accent-gold mb-8 animate-float">mail</span>
              <h2 className="font-h2 text-[40px] md:text-[56px] font-medium text-white mb-6 tracking-tight">Join the Registry.</h2>
              <p className="font-body-lg text-[18px] text-white/60 mb-12 max-w-lg mx-auto leading-relaxed">
                Sign up for early access to seasonal edits, studio notes, and members-only events.
              </p>
              
              <form className="flex flex-col md:flex-row gap-6 max-w-lg mx-auto relative z-10" onSubmit={handleSubscribe}>
                <div className="flex-grow relative group">
                  <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border-b border-white/20 py-4 font-body-md text-[18px] text-white focus:outline-none focus:border-accent-gold transition-all placeholder:text-white/20" 
                    placeholder="Email Address" 
                    type="email"
                    required
                  />
                </div>
                <button className="bg-white text-black px-12 py-4 rounded-full font-label-sm text-[14px] uppercase tracking-widest hover:bg-accent-gold hover:text-white transition-all duration-500 hover-lift active:scale-95 whitespace-nowrap" type="submit">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
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

export default HomePage;
