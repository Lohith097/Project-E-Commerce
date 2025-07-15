import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ShopPage from './components/ShopPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import ProductDetailPage from './components/ProductDetailPage';
import SalePage from './components/SalePage';
import WishlistPage from './components/WishlistPage';
import LoginModal from './components/LoginModal';
import Footer from './components/Footer';

function AppContent() {
  const { state } = useApp();

  const renderCurrentPage = () => {
    try {
      switch (state.currentPage) {
        case 'home':
          return <HomePage />;
        case 'shop':
        case 'categories':
          return <ShopPage />;
        case 'cart':
          return <CartPage />;
        case 'checkout':
          return <CheckoutPage />;
        case 'sale':
          return <SalePage />;
        case 'wishlist':
          return <WishlistPage />;
        default:
          if (state.currentPage.startsWith('product-')) {
            const productId = state.currentPage.replace('product-', '');
            return <ProductDetailPage productId={productId} />;
          }
          return <HomePage />;
      }
    } catch (error) {
      console.error('Error rendering page:', error);
      return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <Footer />
      <LoginModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}