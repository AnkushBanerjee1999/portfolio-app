import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import { CartProvider } from './CartContext';
import { SearchProvider } from './SearchContext';
import SearchOverlay from './SearchOverlay';
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import CheckoutConfirmationPage from './pages/CheckoutConfirmationPage';
import CollectionsPage from './pages/CollectionsPage';
import JournalPage from './pages/JournalPage';
import OurStoryPage from './pages/OurStoryPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import ShippingPage from './pages/ShippingPage';
import ReturnsPage from './pages/ReturnsPage';
import ContactPage from './pages/ContactPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setScrollProgress((currentScroll / scrollHeight) * 100);
      }
    };
    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <ThemeProvider>
      <CartProvider>
        <SearchProvider>
          <BrowserRouter>
            <SearchOverlay />
            <div className="scroll-progress">
              <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
            </div>
            <div className="grain-overlay" />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ProductListingPage />} />
              <Route path="/product" element={<ProductDetailPage />} />
              <Route path="/cart" element={<ShoppingCartPage />} />
              <Route path="/checkout" element={<CheckoutConfirmationPage />} />
              <Route path="/collections" element={<CollectionsPage />} />
              <Route path="/journal" element={<JournalPage />} />
              <Route path="/our-story" element={<OurStoryPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsOfServicePage />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/returns" element={<ReturnsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </BrowserRouter>
        </SearchProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
