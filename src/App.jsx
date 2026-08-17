import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import FilterSidebar from './components/FilterSidebar';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderReceiptModal from './components/OrderReceiptModal';
import OrderTracker from './components/OrderTracker';
import AddProductModal from './components/AddProductModal';
import { INITIAL_PRODUCTS } from './data/mockProducts';
import { ShoppingBag, Heart, PackageCheck, AlertCircle } from 'lucide-react';

export default function App() {
  // Product Catalog State
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('nexstore_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Shopping Cart & Wishlist & Orders State
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('nexstore_cart');
    return saved ? JSON.parse(saved) : [
      { ...INITIAL_PRODUCTS[0], quantity: 1, color: '#0f172a', size: 'Standard' }
    ];
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('nexstore_wishlist');
    return saved ? JSON.parse(saved) : [INITIAL_PRODUCTS[1]];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('nexstore_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // UI Filter States
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [priceRange, setPriceRange] = useState(400);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Frame Controls
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [latestOrderReceipt, setLatestOrderReceipt] = useState(null);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isMobileMode, setIsMobileMode] = useState(false);
  const [theme, setTheme] = useState('dark');

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('nexstore_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('nexstore_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('nexstore_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    localStorage.setItem('nexstore_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Cart Actions
  const handleAddToCart = (product, qty = 1, color = '', size = '') => {
    const existingIndex = cartItems.findIndex(
      item => item.id === product.id && item.color === color && item.size === size
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += qty;
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, { ...product, quantity: qty, color, size }]);
    }
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: newQty } : item));
    }
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Wishlist Actions
  const handleToggleWishlist = (product) => {
    const exists = wishlistItems.some(item => item.id === product.id);
    if (exists) {
      setWishlistItems(wishlistItems.filter(item => item.id !== product.id));
    } else {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  // Add Product Action
  const handleAddProduct = (newProd) => {
    setProducts([newProd, ...products]);
  };

  // Order Placement Action
  const handlePlaceOrder = (newOrder) => {
    setOrders([newOrder, ...orders]);
    setLatestOrderReceipt(newOrder);
    setCartItems([]); // Clear cart
    setIsCheckoutOpen(false);
  };

  // Filtering & Sorting Logic
  const filteredProducts = products.filter(p => {
    if (selectedCategory !== 'All Categories' && p.category !== selectedCategory) return false;
    if (p.price > priceRange) return false;
    if (p.rating < minRating) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchCat) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured default
  });

  return (
    <div className={`app-container ${isMobileMode ? 'mobile-mode' : ''}`}>
      <div className={isMobileMode ? 'mobile-frame' : ''} style={{ width: '100%' }}>
        
        {isMobileMode && <div className="mobile-frame-notch" />}

        {/* Top Navbar Header */}
        <Navbar 
          cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
          wishlistCount={wishlistItems.length}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenAddModal={() => setIsAddModalOpen(true)}
          onOpenOrders={() => setIsOrderTrackerOpen(true)}
          isMobileMode={isMobileMode}
          setIsMobileMode={setIsMobileMode}
          theme={theme}
          setTheme={setTheme}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <main className="container" style={{ padding: '0 16px 40px 16px', flex: 1 }}>
          
          {/* Hero Promotional Banner */}
          <HeroBanner onShopNow={() => {
            setSelectedCategory('All Categories');
            window.scrollTo({ top: 400, behavior: 'smooth' });
          }} />

          {/* Category & Price Filter Bar */}
          <FilterSidebar 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            minRating={minRating}
            setMinRating={setMinRating}
            sortBy={sortBy}
            setSortBy={setSortBy}
            totalCount={filteredProducts.length}
          />

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="glass-card" style={{ padding: '48px', textAlign: 'center', margin: '20px 0' }}>
              <AlertCircle size={44} color="var(--text-muted)" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>No products match your criteria</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Try adjusting your max price slider, category pills, or search keywords.
              </p>
            </div>
          ) : (
            <div className="grid-products">
              {filteredProducts.map(prod => (
                <ProductCard 
                  key={prod.id}
                  product={prod}
                  onSelectProduct={setSelectedProductModal}
                  onAddToCart={handleAddToCart}
                  isInWishlist={wishlistItems.some(w => w.id === prod.id)}
                  onToggleWishlist={handleToggleWishlist}
                />
              ))}
            </div>
          )}

        </main>

        {/* Footer */}
        <footer style={{ 
          background: 'var(--bg-secondary)', 
          borderTop: '1px solid var(--border-color)', 
          padding: '20px 16px', 
          textAlign: 'center', 
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <div>NexStore PRO E-Commerce Store v1.0 • React & Vite Architecture</div>
          <div style={{ fontSize: '0.72rem', marginTop: '4px', opacity: 0.8 }}>
            Built for Desktop & Mobile • LocalStorage Cart & Checkout System
          </div>
        </footer>

      </div>

      {/* Modals & Drawers */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <WishlistDrawer 
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlistItems}
        onAddToCart={handleAddToCart}
        onRemoveFromWishlist={(id) => setWishlistItems(wishlistItems.filter(w => w.id !== id))}
      />

      {selectedProductModal && (
        <ProductModal 
          product={selectedProductModal}
          onClose={() => setSelectedProductModal(null)}
          onAddToCart={handleAddToCart}
          isInWishlist={wishlistItems.some(w => w.id === selectedProductModal.id)}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onPlaceOrder={handlePlaceOrder}
      />

      {latestOrderReceipt && (
        <OrderReceiptModal 
          order={latestOrderReceipt}
          onClose={() => setLatestOrderReceipt(null)}
          onTrackOrder={() => {
            setLatestOrderReceipt(null);
            setIsOrderTrackerOpen(true);
          }}
        />
      )}

      <OrderTracker 
        isOpen={isOrderTrackerOpen}
        onClose={() => setIsOrderTrackerOpen(false)}
        orders={orders}
      />

      <AddProductModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProduct={handleAddProduct}
      />

    </div>
  );
}
