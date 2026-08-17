import React from 'react';
import { Star, ShoppingBag, Heart, Eye } from 'lucide-react';

export default function ProductCard({ 
  product, 
  onSelectProduct, 
  onAddToCart, 
  isInWishlist, 
  onToggleWishlist 
}) {
  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', overflow: 'hidden' }}>
      
      {/* Product Image Container */}
      <div 
        onClick={() => onSelectProduct(product)}
        style={{ 
          position: 'relative', 
          width: '100%', 
          height: '200px', 
          background: 'var(--bg-secondary)', 
          overflow: 'hidden', 
          cursor: 'pointer' 
        }}
      >
        <img 
          src={product.image} 
          alt={product.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />

        {/* Badge */}
        {product.badge && (
          <span className="badge badge-sale" style={{ position: 'absolute', top: '10px', left: '10px' }}>
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(4px)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isInWishlist ? 'var(--accent-rose)' : '#ffffff',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          title={isInWishlist ? "Remove from Wishlist" : "Save to Wishlist"}
        >
          <Heart size={16} fill={isInWishlist ? "var(--accent-rose)" : "none"} />
        </button>
      </div>

      {/* Product Info Content */}
      <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        
        {/* Category & Rating */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem' }}>
          <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>
            {product.category}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-amber)', fontWeight: 700 }}>
            <Star size={13} fill="var(--accent-amber)" />
            <span>{product.rating}</span>
            <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({product.reviewsCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onSelectProduct(product)}
          style={{ 
            fontSize: '0.92rem', 
            fontWeight: 700, 
            color: 'var(--text-primary)', 
            lineHeight: 1.35,
            cursor: 'pointer',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            margin: 0
          }}
        >
          {product.title}
        </h3>

        {/* Price Row */}
        <div style={{ marginTop: 'auto', paddingTop: '6px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

      </div>

      {/* Footer Buttons */}
      <div style={{ 
        padding: '10px 14px', 
        borderTop: '1px solid var(--border-color)', 
        display: 'flex', 
        gap: '8px', 
        background: 'var(--bg-secondary)' 
      }}>
        <button 
          onClick={() => onSelectProduct(product)}
          className="btn btn-secondary btn-sm"
          style={{ flex: 1 }}
        >
          <Eye size={14} /> View
        </button>

        <button 
          onClick={() => onAddToCart(product)}
          className="btn btn-primary btn-sm"
          style={{ flex: 1.3 }}
        >
          <ShoppingBag size={14} /> Add to Cart
        </button>
      </div>

    </div>
  );
}
