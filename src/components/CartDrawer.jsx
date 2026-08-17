import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck, CheckCircle2 } from 'lucide-react';
import { PROMO_CODES } from '../data/mockProducts';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onProceedToCheckout 
}) {
  const [promoInput, setPromoInput] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  // Subtotal calculation
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = subtotal * discountPercent;
  const freeShippingThreshold = 50.00;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 9.99;
  const tax = (subtotal - discountAmount) * 0.08; // 8% sales tax
  const total = subtotal - discountAmount + shippingFee + tax;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setDiscountPercent(PROMO_CODES[code]);
      setPromoSuccess(`Applied! ${PROMO_CODES[code] * 100}% Discount`);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try SAVE20');
      setPromoSuccess('');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ justifyContent: 'flex-end', padding: 0 }}>
      <div 
        className="modal-content animate-slide-down" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100vh',
          maxHeight: '100vh',
          borderRadius: 0,
          display: 'flex',
          flexDirection: 'column',
          padding: 0
        }}
      >
        
        {/* Cart Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-secondary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={20} color="var(--accent-primary)" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Your Shopping Cart ({cartItems.length})
            </h3>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div style={{ padding: '12px 20px', background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)', fontSize: '0.78rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: 'var(--text-secondary)' }}>
            <span><Truck size={14} style={{ display: 'inline', marginRight: '4px' }} /> Free Express Shipping</span>
            <span>{subtotal >= freeShippingThreshold ? 'Unlocked! ✓' : `$${(freeShippingThreshold - subtotal).toFixed(2)} away`}</span>
          </div>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{
              width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`,
              height: '100%',
              background: subtotal >= freeShippingThreshold ? 'var(--accent-emerald)' : 'linear-gradient(90deg, #3b82f6, #06b6d4)',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* Cart Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', paddingTop: '60px' }}>
              <ShoppingBag size={48} color="var(--border-color)" style={{ marginBottom: '12px' }} />
              <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '4px' }}>Your cart is empty</h4>
              <p style={{ fontSize: '0.82rem' }}>Add some products to start your order!</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div 
                key={`${item.id}-${item.color}-${item.size}`}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center'
                }}
              >
                <img src={item.image} alt={item.title} style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover' }} />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.title}
                  </h4>
                  
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    ${item.price.toFixed(2)} {item.color && `• ${item.color}`} {item.size && `• ${item.size}`}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} style={{ padding: '3px 8px', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}><Minus size={12} /></button>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, padding: '0 8px' }}>{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} style={{ padding: '3px 8px', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}><Plus size={12} /></button>
                    </div>
                    <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)', marginLeft: 'auto' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </strong>
                  </div>
                </div>

                <button onClick={() => onRemoveItem(item.id)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Promo Code Form & Summary */}
        {cartItems.length > 0 && (
          <div style={{ padding: '16px 20px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
            
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <Tag size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Promo code (Try SAVE20)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px 8px 30px',
                    fontSize: '0.8rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                />
              </div>
              <button type="submit" className="btn btn-secondary btn-sm">Apply</button>
            </form>

            {promoError && <div style={{ fontSize: '0.72rem', color: 'var(--accent-rose)', marginBottom: '8px' }}>{promoError}</div>}
            {promoSuccess && <div style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', marginBottom: '8px' }}>{promoSuccess}</div>}

            {/* Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-emerald)' }}>
                  <span>Discount ({discountPercent * 100}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Shipping</span>
                <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Estimated Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', borderTop: '1px solid var(--border-color)', paddingTop: '8px', marginTop: '4px' }}>
                <span>Total Amount</span>
                <span style={{ color: 'var(--accent-primary)' }}>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button 
              onClick={onProceedToCheckout}
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
