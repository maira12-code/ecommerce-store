import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, ShieldCheck, Truck, Plus, Minus, Check } from 'lucide-react';

export default function ProductModal({ 
  product, 
  onClose, 
  onAddToCart, 
  isInWishlist, 
  onToggleWishlist 
}) {
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedColor, selectedSize);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <span className="badge badge-info">{product.category}</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {/* Grid Body */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          
          {/* Image */}
          <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '260px', background: 'var(--bg-primary)' }}>
            <img src={product.image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, lineHeight: 1.3 }}>
              {product.title}
            </h2>

            {/* Rating & Stock */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-amber)', fontWeight: 700 }}>
                <Star size={15} fill="var(--accent-amber)" />
                <span>{product.rating}</span>
                <span style={{ color: 'var(--text-muted)' }}>({product.reviewsCount} reviews)</span>
              </div>
              <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>
                ✓ In Stock ({product.stock} left)
              </span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', margin: '4px 0' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              {product.description}
            </p>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Select Color:</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {product.colors.map(c => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        background: c,
                        border: selectedColor === c ? '2px solid var(--accent-primary)' : '2px solid transparent',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Options */}
            {product.sizes && product.sizes.length > 1 && (
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Select Size:</span>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {product.sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      style={{
                        padding: '4px 10px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        borderRadius: '6px',
                        border: selectedSize === s ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                        background: selectedSize === s ? 'rgba(59, 130, 246, 0.2)' : 'var(--bg-primary)',
                        color: selectedSize === s ? 'var(--accent-primary)' : 'var(--text-secondary)',
                        cursor: 'pointer'
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)' }}>Quantity:</span>
              <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ padding: '6px 10px', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
                >
                  <Minus size={14} />
                </button>
                <span style={{ padding: '0 12px', fontSize: '0.85rem', fontWeight: 700 }}>{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  style={{ padding: '6px 10px', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Specs Table */}
        {product.specs && (
          <div style={{ background: 'var(--bg-primary)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginBottom: '20px', display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '0.78rem' }}>
            {Object.entries(product.specs).map(([k, v]) => (
              <div key={k}>
                <span style={{ color: 'var(--text-muted)' }}>{k}: </span>
                <strong style={{ color: 'var(--text-primary)' }}>{v}</strong>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={handleAdd}
            className="btn btn-primary"
            style={{ flex: 2, padding: '12px' }}
          >
            <ShoppingBag size={18} />
            <span>Add to Shopping Cart (${(product.price * quantity).toFixed(2)})</span>
          </button>

          <button 
            onClick={() => onToggleWishlist(product)}
            className="btn btn-secondary"
            style={{ flex: 1, borderColor: isInWishlist ? 'var(--accent-rose)' : 'var(--border-color)', color: isInWishlist ? 'var(--accent-rose)' : 'var(--text-primary)' }}
          >
            <Heart size={18} fill={isInWishlist ? "var(--accent-rose)" : "none"} />
            <span>{isInWishlist ? 'Saved' : 'Wishlist'}</span>
          </button>
        </div>

        {addedToast && (
          <div style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', marginTop: '8px', textAlign: 'center', fontWeight: 700 }}>
            ✓ Added to cart successfully!
          </div>
        )}

      </div>
    </div>
  );
}
