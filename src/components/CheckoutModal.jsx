import React, { useState } from 'react';
import { X, CreditCard, Lock, ShieldCheck, MapPin, User, Mail, Phone, CheckCircle2 } from 'lucide-react';

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  cartItems, 
  onPlaceOrder 
}) {
  const [fullName, setFullName] = useState('Alex Rivera');
  const [email, setEmail] = useState('alex.rivera@example.com');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [address, setAddress] = useState('742 Evergreen Terrace, Suite 4B');
  const [city, setCity] = useState('Springfield');
  const [zipCode, setZipCode] = useState('97477');
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'apple', 'cod'

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal >= 50 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !address) return;

    const newOrder = {
      orderId: `NEX-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      customer: { fullName, email, phone, address: `${address}, ${city} ${zipCode}` },
      items: cartItems,
      subtotal,
      tax,
      shipping,
      total,
      paymentMethod: paymentMethod === 'card' ? 'Credit / Debit Card' : paymentMethod === 'apple' ? 'Apple Pay' : 'Cash on Delivery',
      status: 'Processing'
    };

    onPlaceOrder(newOrder);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Lock size={20} color="var(--accent-emerald)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Secure Checkout
            </h3>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* Contact Details */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '8px' }}>
              1. Customer Information
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Full Name *</label>
                <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} style={{ width: '100%', padding: '8px 10px', fontSize: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Email Address *</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '8px 10px', fontSize: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '8px' }}>
              2. Shipping Address
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input type="text" required placeholder="Street Address" value={address} onChange={(e) => setAddress(e.target.value)} style={{ width: '100%', padding: '8px 10px', fontSize: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} style={{ width: '100%', padding: '8px 10px', fontSize: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
                <input type="text" placeholder="Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} style={{ width: '100%', padding: '8px 10px', fontSize: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '8px' }}>
              3. Payment Option
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                style={{
                  padding: '10px',
                  borderRadius: 'var(--radius-sm)',
                  border: paymentMethod === 'card' ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                  background: paymentMethod === 'card' ? 'rgba(59, 130, 246, 0.15)' : 'var(--bg-primary)',
                  color: paymentMethod === 'card' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                💳 Credit Card
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('apple')}
                style={{
                  padding: '10px',
                  borderRadius: 'var(--radius-sm)',
                  border: paymentMethod === 'apple' ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                  background: paymentMethod === 'apple' ? 'rgba(59, 130, 246, 0.15)' : 'var(--bg-primary)',
                  color: paymentMethod === 'apple' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                 Apple Pay
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                style={{
                  padding: '10px',
                  borderRadius: 'var(--radius-sm)',
                  border: paymentMethod === 'cod' ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                  background: paymentMethod === 'cod' ? 'rgba(59, 130, 246, 0.15)' : 'var(--bg-primary)',
                  color: paymentMethod === 'cod' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                💵 Cash on Delivery
              </button>
            </div>
          </div>

          {/* Total & Submit */}
          <div style={{ background: 'var(--bg-primary)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Amount to Pay</div>
              <strong style={{ fontSize: '1.25rem', color: 'var(--accent-emerald)' }}>${total.toFixed(2)}</strong>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
              <button type="submit" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                <CheckCircle2 size={18} /> Place Order Now
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
