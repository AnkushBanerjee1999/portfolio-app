import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import { useSearch } from '../SearchContext';
import { useCart } from '../CartContext';

const ProductDetailPage = () => {
  const { openSearch } = useSearch();
  const { theme, toggleTheme } = useTheme();
  const { addItem, totalItems } = useCart();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const [selectedColor, setSelectedColor] = useState('Charcoal');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState(null);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem({
      id: 101,
      name: 'The Signature Overcoat',
      price: 595.00,
      selectedColor,
      selectedSize,
      quantity,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtLSq-Zh6KQDi29aumXDxMonj7TCK3uy-pOTvrBAJ-SNLUVgQdBykoZv4baj26eIocIizHlgdVM5dcCuQ24f5v5sc4Ln2ceMAaLhIvfIGtayjDSEYJDVnJyXwNXXLg1ZTBE93K-Wq6BYSoj88V0Okct32llrdnapnYTKA33iZAdsqwr-RZjm918shkHvMTJxr_vDjFdlFsh2zCmS95H56gpSsz1v1_l6CTCVixvC77AIXq6frpiAbcrKGHCLyH4UyftaP2ErK2wcgi'
    });
    navigate('/cart');
  };

  const colors = [
    { name: 'Charcoal', hex: '#333333' },
    { name: 'Oat', hex: '#F5F5DC' },
    { name: 'Midnight', hex: '#1A1A1A' }
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const toggleAccordion = (name) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  return (
    <div className="bg-background dark:bg-gray-900 text-on-background dark:text-gray-100 font-body-md text-body-md antialiased min-h-screen transition-colors duration-300 animate-reveal">
      {/* TopAppBar */}
      <nav className="sticky top-0 w-full z-50 glass-header shadow-none hidden md:block">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center px-8 h-20">
          <Link to="/" className="font-epilogue text-xl font-bold tracking-[0.2em] text-black dark:text-white uppercase">
            ESSENTIALS
          </Link>
          <ul className="flex items-center gap-8 font-epilogue antialiased tracking-tight">
            <li>
              <Link to="/shop" className="text-black dark:text-white border-b border-black dark:border-white pb-1 transition-transform active:scale-95 cursor-pointer block">
                Shop All
              </Link>
            </li>
            <li>
              <Link to="/shop" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-500 ease-in-out hover:opacity-70 active:scale-95 cursor-pointer block">
                Collections
              </Link>
            </li>
            <li>
              <Link to="/shop" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-500 ease-in-out hover:opacity-70 active:scale-95 cursor-pointer block">
                Journal
              </Link>
            </li>
            <li>
              <Link to="/shop" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-500 ease-in-out hover:opacity-70 active:scale-95 cursor-pointer block">
                Our Story
              </Link>
            </li>
          </ul>
          <div className="flex items-center gap-6 text-black dark:text-white">
            <button aria-label="Toggle Dark Mode" className="transition-transform active:scale-95 cursor-pointer hover:opacity-70 duration-500 ease-in-out flex items-center" onClick={toggleTheme} type="button">
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
            <Link to="/cart" aria-label="shopping_bag" className="transition-transform active:scale-95 cursor-pointer hover:opacity-70 duration-500 ease-in-out relative">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>shopping_bag</span>
              {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-primary dark:bg-white text-on-primary dark:text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{totalItems}</span>}
            </Link>
            <button aria-label="person" className="transition-transform active:scale-95 cursor-pointer hover:opacity-70 duration-500 ease-in-out">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>person</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Header */}
      <nav className="sticky top-0 w-full z-50 glass-header md:hidden">
        <div className="flex justify-between items-center px-[20px] h-20">
          <button aria-label="menu" className="text-primary dark:text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
          <Link to="/" className="font-display text-[18px] font-bold tracking-[0.2em] text-primary dark:text-white uppercase">
            ESSENTIALS
          </Link>
          <div className="flex items-center gap-4">
            <button aria-label="Toggle Dark Mode" className="text-primary dark:text-white flex items-center" onClick={toggleTheme}>
              {theme === 'dark' ? (
                <span className="material-symbols-outlined">light_mode</span>
              ) : (
                <span className="material-symbols-outlined">dark_mode</span>
              )}
            </button>
            <Link to="/cart" aria-label="shopping_bag" className="text-primary dark:text-white relative">
              <span className="material-symbols-outlined">shopping_bag</span>
              {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-primary dark:bg-white text-on-primary dark:text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{totalItems}</span>}
            </Link>
          </div>
        </div>
        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 px-[20px] py-4 flex flex-col gap-4">
             <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-black dark:text-white font-medium">Shop All</Link>
             <Link to="/collections" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 dark:text-gray-400">Collections</Link>
             <Link to="/journal" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 dark:text-gray-400">Journal</Link>
             <Link to="/our-story" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 dark:text-gray-400">Our Story</Link>
          </div>
        )}
      </nav>

      <main>
        {/* PDP Hero Section */}
        <section className="max-w-[1280px] mx-auto px-[20px] md:px-8 py-[120px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[32px] lg:gap-16">
            {/* Gallery Column */}
            <div className="lg:col-span-7 flex flex-col gap-[8px]">
              <div className="w-full relative overflow-hidden bg-surface dark:bg-gray-800 rounded group">
                <img alt="The Minimalist Wool Coat in Charcoal" className="w-full aspect-[4/5] object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105 cursor-crosshair hover-lift" data-alt="studio portrait of a model wearing a sleek, tailored charcoal grey wool overcoat, neutral light grey background, soft highly professional lighting emphasizing fabric texture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtLSq-Zh6KQDi29aumXDxMonj7TCK3uy-pOTvrBAJ-SNLUVgQdBykoZv4baj26eIocIizHlgdVM5dcCuQ24f5v5sc4Ln2ceMAaLhIvfIGtayjDSEYJDVnJyXwNXXLg1ZTBE93K-Wq6BYSoj88V0Okct32llrdnapnYTKA33iZAdsqwr-RZjm918shkHvMTJxr_vDjFdlFsh2zCmS95H56gpSsz1v1_l6CTCVixvC77AIXq6frpiAbcrKGHCLyH4UyftaP2ErK2wcgi"/>
              </div>
              <div className="grid grid-cols-4 gap-[8px] mt-[12px]">
                <button className="border border-primary dark:border-white rounded overflow-hidden aspect-[4/5] bg-surface dark:bg-gray-800 relative transition-opacity hover:opacity-80 hover-lift">
                  <img alt="Thumbnail 1" className="w-full h-full object-cover" data-alt="studio portrait of a model wearing a sleek, tailored charcoal grey wool overcoat, neutral light grey background, soft highly professional lighting emphasizing fabric texture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRIaECEPnOvGmzb6ty9MZphRiyr_-9O5RxaVtWyuSoiMiXlrLSPpBd6dxFFq7fw3xwBTq3xyGWP4Ya3ZnUIX9RcYwVLjXm3nyM4zXyOONzOcIS0AW9nMQ06IiJYecYpeAQAdHd-BlCUisItfvjzSBra_UyO-hKq4ig9KzaZ1sKizp2sHUKxzi4adjXRFx2NIhDEcJ3ipcairYHTfcAbhuyu4FZzJcsB_DDQWu2JTZJtiCnK3NK3CsMKTNV4nMSj158ir2t68eiCLR7"/>
                </button>
                <button className="border border-transparent rounded overflow-hidden aspect-[4/5] bg-surface dark:bg-gray-800 relative transition-opacity hover:opacity-80 hover-lift">
                  <img alt="Thumbnail 2" className="w-full h-full object-cover" data-alt="close up detail shot of the collar and lapel of a charcoal grey wool overcoat, showing fine stitching and premium fabric texture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFu1iNCzl6pDqiGazJhUWQibvIL7qNaw3GXrCM10zjxBnoNux27YQ7u6IJyXUG-58tY2lsB6nIaiHr5XvINOuJCE88aIBCSyJmNPW1c9Y89C1eXrQRV5h-72fsTg1Wx5yeYKU5qAsSFZF7QB7KvdYrigOrz-ySYxzTfP2mTAbCn_QWs6ic2cOWn_OeQCK1OJ-6KTzHwLdZkirSAXh0ifRUr27nvSJH8YJqSHS7EmYUPs5lw5IZqeTPEISIKKUYG1Bw8rebfNpGnldG"/>
                </button>
                <button className="border border-transparent rounded overflow-hidden aspect-[4/5] bg-surface dark:bg-gray-800 relative transition-opacity hover:opacity-80 hover-lift">
                  <img alt="Thumbnail 3" className="w-full h-full object-cover" data-alt="back view of a model wearing a tailored charcoal grey wool overcoat, neutral minimalist background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuClMQOzfuGfL6xMMSkBzp7ikmhemDIezQpFFxcVsLjL10XV8zSymmoEVtdytl_gDEcJPn046uaK_qqSD-YGWHPyaR3b5e5sOTMKAHdyWwohvKlJH0hUQO-BtKrBJNFTnnsj_R0sExrdjC-6ZJhK0yy2JvAnwt5gDFrsFw3_MsSksP_716WtGG3TVDcfCv0oL06aXXeyj9Dx9S6upx1MBKnlVaHl7IohsGD1LGK6KPCTBhGlD81Sw6w_kIjsNLezuy-ey1oG0ypKMG-j"/>
                </button>
                <button onClick={() => alert('Video coming soon!')} className="border border-transparent rounded overflow-hidden aspect-[4/5] bg-surface dark:bg-gray-800 relative transition-opacity hover:opacity-80 flex items-center justify-center bg-surface-container dark:bg-gray-700 hover:bg-surface-container-high dark:hover:bg-gray-600 transition-colors hover-lift">
                  <span className="material-symbols-outlined text-on-surface-variant dark:text-gray-300" style={{ fontVariationSettings: "'FILL' 0" }}>play_arrow</span>
                </button>
              </div>
            </div>

            {/* Product Info Column */}
            <div className="lg:col-span-5 relative">
              <div className="lg:sticky lg:top-32 flex flex-col pt-[24px] lg:pt-0">
                {/* Breadcrumbs & Badges */}
                <div className="flex items-center gap-4 mb-[24px]">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-surface-container-high dark:bg-gray-800 text-on-surface dark:text-gray-200 font-label-sm text-[14px] uppercase tracking-wider">
                    Core Collection
                  </span>
                </div>

                {/* Title & Price */}
                <h1 className="font-h1 text-[48px] font-bold text-primary dark:text-white mb-[8px]">The Signature Overcoat</h1>
                <p className="font-h3 text-[24px] font-semibold text-on-surface-variant dark:text-gray-400 mb-[48px]">$595.00</p>

                {/* Description */}
                <p className="font-body-lg text-[18px] text-on-surface dark:text-gray-300 mb-[48px] border-b border-surface-variant dark:border-gray-800 pb-[48px]">
                  Crafted from heavyweight Italian virgin wool, this structured overcoat is the foundation of the modern wardrobe. Featuring a concealed placket, minimal hardware, and an architectural silhouette designed to drape effortlessly over both tailoring and knitwear.
                </p>

                {/* Color Selector */}
                <div className="mb-[48px]">
                  <div className="flex justify-between items-end mb-[12px]">
                    <span className="font-label-sm text-[14px] text-primary dark:text-white uppercase tracking-widest">Color</span>
                    <span className="font-body-md text-[16px] text-on-surface-variant dark:text-gray-400">{selectedColor}</span>
                  </div>
                  <div className="flex gap-4">
                    {colors.map((color) => (
                      <button 
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        aria-label={`Select ${color.name}`} 
                        className={`w-10 h-10 rounded-full transition-all ${selectedColor === color.name ? 'border-2 border-primary dark:border-white ring-2 ring-transparent ring-offset-2 ring-offset-background dark:ring-offset-gray-900' : 'border border-outline-variant dark:border-gray-600 hover:border-outline dark:hover:border-gray-400'}`}
                        style={{ backgroundColor: color.hex }}
                      ></button>
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="mb-[48px]">
                  <div className="flex justify-between items-end mb-[12px]">
                    <span className="font-label-sm text-[14px] text-primary dark:text-white uppercase tracking-widest">Size</span>
                    <button className="font-label-sm text-[14px] text-on-surface-variant dark:text-gray-400 underline underline-offset-4 hover:text-primary dark:hover:text-white transition-colors">Size Guide</button>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {sizes.map(size => (
                      <button 
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 rounded font-label-sm text-[14px] transition-colors ${selectedSize === size ? 'border border-primary dark:border-white bg-primary dark:bg-white text-on-primary dark:text-black' : 'border border-outline-variant dark:border-gray-700 text-on-surface dark:text-gray-300 hover:border-primary dark:hover:border-white'}`}
                      >
                        {size}
                      </button>
                    ))}
                    <button className="py-3 border border-surface-variant dark:border-gray-800 bg-surface dark:bg-gray-800 text-outline-variant dark:text-gray-600 rounded font-label-sm text-[14px] cursor-not-allowed line-through" disabled>XXL</button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mb-[48px] mt-[24px]">
                  {/* Quantity */}
                  <div className="flex items-center justify-between border border-outline-variant dark:border-gray-700 rounded w-full sm:w-32 px-4 py-3 h-14">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-on-surface dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors"><span className="material-symbols-outlined" style={{ fontSize: '16px' }}>remove</span></button>
                    <span className="font-label-sm text-[14px] text-primary dark:text-white">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="text-on-surface dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors"><span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span></button>
                  </div>
                  {/* Add to Cart */}
                  <button onClick={handleAddToCart} className="flex-1 bg-primary dark:bg-white text-on-primary dark:text-black rounded font-label-sm text-[14px] uppercase tracking-[0.1em] h-14 hover:bg-inverse-surface dark:hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center gap-2 group">
                    Add to Cart
                    <span className="material-symbols-outlined text-[18px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">arrow_forward</span>
                  </button>
                </div>

                {/* Accordion Details */}
                <div className="border-t border-surface-variant dark:border-gray-800 divide-y divide-surface-variant dark:border-gray-800">
                  <div className="py-6 group cursor-pointer" onClick={() => toggleAccordion('details')}>
                    <div className="flex justify-between items-center">
                      <span className="font-label-sm text-[14px] text-primary dark:text-white uppercase tracking-widest">Details &amp; Care</span>
                      <span className="material-symbols-outlined text-on-surface-variant dark:text-gray-400 transition-transform duration-300 group-hover:text-primary dark:group-hover:text-white">
                        {openAccordion === 'details' ? 'expand_less' : 'expand_more'}
                      </span>
                    </div>
                    {openAccordion === 'details' && (
                      <div className="mt-4 font-body-md text-[16px] text-on-surface-variant dark:text-gray-400">
                        Made from 100% virgin wool. Dry clean only. Iron on low heat. Do not bleach or tumble dry.
                      </div>
                    )}
                  </div>
                  <div className="py-6 group cursor-pointer" onClick={() => toggleAccordion('shipping')}>
                    <div className="flex justify-between items-center">
                      <span className="font-label-sm text-[14px] text-primary dark:text-white uppercase tracking-widest">Shipping &amp; Returns</span>
                      <span className="material-symbols-outlined text-on-surface-variant dark:text-gray-400 transition-transform duration-300 group-hover:text-primary dark:group-hover:text-white">
                        {openAccordion === 'shipping' ? 'expand_less' : 'expand_more'}
                      </span>
                    </div>
                    {openAccordion === 'shipping' && (
                      <div className="mt-4 font-body-md text-[16px] text-on-surface-variant dark:text-gray-400">
                        Free standard shipping on all orders over $200. Returns accepted within 30 days of delivery.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="max-w-[1280px] mx-auto px-[20px] md:px-8 py-[120px] border-t border-surface-variant dark:border-gray-800">
          <div className="flex justify-between items-end mb-[48px]">
            <h2 className="font-h2 text-[32px] font-semibold text-primary dark:text-white tracking-tight">Complete the Look</h2>
            <Link to="/shop" className="hidden md:inline-flex items-center gap-2 font-label-sm text-[14px] uppercase tracking-widest text-on-surface dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors border-b border-transparent hover:border-primary dark:hover:border-white pb-1">
              Shop Accessories <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[32px]">
            {/* Card 1 */}
            <Link to="/product" className="group block">
              <div className="w-full aspect-[4/5] overflow-hidden rounded bg-surface dark:bg-gray-800 mb-[12px] relative hover-lift">
                <img alt="Cashmere Knit" className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" data-alt="minimalist white ribbed knit cashmere sweater folded neatly on a clean concrete surface, soft natural lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC41i-42wXrBcyb4N30yf2AfnSVbRc1-XYJVL51aBywJcEAhmeSVCQ6mJocmpMTlv7sgfzsU49XAU8c-NntFUc7iMo0jMnM1-iluQgRwC3EPwydzHqP80vv3ON2IVE7dhDTwZMpikI20CoVDDYjuI1Q4aqPcv4AxlRBw7dgTmrNZlvptq1wFsQ3lcKgY5XdTcRFxzPH5mbrbb3awq8XXUr3_NNvqdor548LnBMgR1dSHYEqh_-gH5MSNTSnV-lybGoEgBGjdW0CPS2N"/>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors duration-500"></div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-body-lg text-[18px] text-primary dark:text-white">Cashmere Crew</h3>
                  <p className="font-label-sm text-[14px] text-on-surface-variant dark:text-gray-400 mt-1">Oatmeal</p>
                </div>
                <span className="font-body-md text-[16px] text-primary dark:text-white">$295</span>
              </div>
            </Link>
            {/* Card 2 */}
            <Link to="/product" className="group block">
              <div className="w-full aspect-[4/5] overflow-hidden rounded bg-surface dark:bg-gray-800 mb-[12px] relative hover-lift">
                <img alt="Leather Sneakers" className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" data-alt="classic white minimal leather sneakers on a smooth pale grey background, studio lighting emphasizing clean lines" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKbyuFfhOA0O4oa8FY3RUj_IIduJEr8ts7MLdHQ5-NY1dPuqYYFTki9iRJcPmdef1IFLSv0zAke7AnBTAe0sf-H-UbwFAf9nkzc3W4TWpvteyz_okebJ9k9B8ngQrlbVP6nun5UmCK1aPthCYQMgmrRxcLbQ6zYWgBtj9DxM5JBmQU8csZtfJYq4NxAtH833lkf7Djzy7X2nk6peautpES7zIrR36MEH4S8qhFs2-Tj00ysC_W93mBw5aYtOgEzw9js21tKAQl2X9A"/>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors duration-500"></div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-body-lg text-[18px] text-primary dark:text-white">Essential Sneaker</h3>
                  <p className="font-label-sm text-[14px] text-on-surface-variant dark:text-gray-400 mt-1">Optic White</p>
                </div>
                <span className="font-body-md text-[16px] text-primary dark:text-white">$220</span>
              </div>
            </Link>
            {/* Card 3 */}
            <Link to="/product" className="group hidden sm:block">
              <div className="w-full aspect-[4/5] overflow-hidden rounded bg-surface dark:bg-gray-800 mb-[12px] relative hover-lift">
                <img alt="Structured Tote" className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" data-alt="black leather structured tote bag sitting on a marble plinth, minimalist luxury aesthetic with stark shadows" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfrRNkULYH2IJAQ4qhL5kPIJt8gPOsSwfG-pZP_0UCX06eDNINtmy6pNEc7d8v5jc7s0Y3yd-r4VQFZQHQ6QXE2BqNnMZ94ZtGf9kKU9D9qRZ0vGr5Uy0817vZyuk60ZPRD5FLYYRhEaDOoVt_kJcSSHp0-gGlAFJ-RcmFLd86BsEmIpHSwmM5GQKFQx7M5-DLiVlHQyD2cZPLRfBQmqnH3MY7Mqik-obr9cuxb20H6syWaYwycXfsBjaPhe4khPsicmEyEkxLK7o9"/>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors duration-500"></div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-body-lg text-[18px] text-primary dark:text-white">The Weekender Tote</h3>
                  <p className="font-label-sm text-[14px] text-on-surface-variant dark:text-gray-400 mt-1">Black Leather</p>
                </div>
                <span className="font-body-md text-[16px] text-primary dark:text-white">$450</span>
              </div>
            </Link>
            {/* Card 4 */}
            <Link to="/product" className="group hidden lg:block">
              <div className="w-full aspect-[4/5] overflow-hidden rounded bg-surface dark:bg-gray-800 mb-[12px] relative hover-lift">
                <img alt="Tailored Trousers" className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" data-alt="close up of tailored black wool trousers with a sharp front crease, fabric texture visible under soft studio lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwQIcNeR0HN9R9WjEJnNI8tJLl_pa8LhN5K-pn9DhDprGPybjLdk2L8hOIwPjlBMKyfa2QW3femn05vYCtjZ73wtZ7vGjddvP2X5KMPQ9xdWi89vvBBc9VhyTqFGoouSoaRKDGL5c6GEHYePYtv5eGFe1dwRNssliDlGHAb6VMLcXQfWhDoeJCcQfDTvZQWpn5v2lkXL2KQmZPrFlhpX_gVmImou94AR8iSi-LNTmUriRPMtbo0ltTBv6lxJW2YtRJW4_MnG11mVHu"/>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors duration-500"></div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-body-lg text-[18px] text-primary dark:text-white">Pleated Trouser</h3>
                  <p className="font-label-sm text-[14px] text-on-surface-variant dark:text-gray-400 mt-1">Charcoal</p>
                </div>
                <span className="font-body-md text-[16px] text-primary dark:text-white">$185</span>
              </div>
            </Link>
          </div>
          <div className="mt-[48px] text-center md:hidden">
            <Link to="/shop" className="inline-flex items-center justify-center w-full px-6 py-4 border border-outline dark:border-gray-700 font-label-sm text-[14px] uppercase tracking-widest text-primary dark:text-white hover:bg-surface-container dark:hover:bg-gray-800 transition-colors rounded">
              Shop Accessories
            </Link>
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

export default ProductDetailPage;
