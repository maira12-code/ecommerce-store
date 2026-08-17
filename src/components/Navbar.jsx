import React from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Sun, 
  Moon, 
  Smartphone, 
  Monitor, 
  PlusCircle, 
  PackageCheck,
  Sparkles
} from 'lucide-react';

export default function Navbar({ 
  cartCount, 
  wishlistCount, 
  onOpenCart, 
  onOpenWishlist, 
  onOpenAddModal, 
  onOpenOrders,
  isMobileMode, 
  setIsMobileMode, 
  theme, 
  setTheme, 
  searchQuery, 
  setSearchQuery 
}) {
  return (
    <header className="glass-card" style={{ borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0, sticky: 'top', top: 0, zIndex: 100 }}>
      <div className="container" style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          
          {/* Logo & Branding */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)'
            }}>
              <ShoppingBag size={22} color="#ffffff" />
            </div>
            <div>
              <h1 style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--text-primary)', margin: 0 }}>
                NexStore <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.12)', padding: '2px 8px', borderRadius: '10px' }}>PRO</span>
              </h1>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', margin: 0 }}>
                Premium Digital Market
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div style={{ flex: '1', maxWidth: '420px', position: 'relative' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search headphones, smartwatches, shoes, laptops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 14px 9px 38px',
                fontSize: '0.86rem',
                borderRadius: '24px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
          </div>

          {/* Action Icons & Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            
            {/* Add Product Button */}
            <button 
              onClick={onOpenAddModal}
              className="btn btn-primary btn-sm"
              title="Add New Product to Store Catalog"
            >
              <PlusCircle size={16} />
              <span>Add Item</span>
            </button>

            {/* Orders Tracker Button */}
            <button 
              onClick={onOpenOrders}
              className="btn btn-secondary btn-icon"
              title="View My Orders & Package Tracker"
            >
              <PackageCheck size={19} />
            </button>

            {/* Wishlist Button */}
            <button 
              onClick={onOpenWishlist}
              className="btn btn-secondary btn-icon"
              style={{ position: 'relative' }}
              title="View Saved Wishlist"
            >
              <Heart size={19} color={wishlistCount > 0 ? "var(--accent-rose)" : "currentColor"} />
              {wishlistCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-3px',
                  right: '-3px',
                  background: 'var(--accent-rose)',
                  color: '#fff',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button 
              onClick={onOpenCart}
              className="btn btn-primary btn-icon"
              style={{ position: 'relative' }}
              title="Open Shopping Cart"
            >
              <ShoppingBag size={19} />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-3px',
                  right: '-3px',
                  background: '#ffffff',
                  color: 'var(--accent-primary)',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  width: '19px',
                  height: '19px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                }}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile View Toggle */}
            <button 
              onClick={() => setIsMobileMode(!isMobileMode)}
              className="btn btn-secondary btn-icon"
              title={isMobileMode ? "Switch to Desktop View" : "Simulate Phone Screen"}
            >
              {isMobileMode ? <Monitor size={18} /> : <Smartphone size={18} />}
            </button>

            {/* Theme Toggle */}
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="btn btn-secondary btn-icon"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#6366f1" />}
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
