import React from 'react';
import { X, PackageCheck, Truck, CheckCircle2, Clock, MapPin, AlertCircle } from 'lucide-react';

export default function OrderTracker({ isOpen, onClose, orders }) {
  if (!isOpen) return null;

  const trackingSteps = [
    { label: 'Order Placed', desc: 'Received & Confirmed', done: true },
    { label: 'Processing', desc: 'Quality Check & Packing', done: true },
    { label: 'Out for Delivery', desc: 'In Transit with Express Courier', done: true },
    { label: 'Delivered', desc: 'Package Arrived', done: false }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <PackageCheck size={22} color="var(--accent-primary)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              My Orders & Live Package Tracker
            </h3>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 16px', color: 'var(--text-muted)' }}>
            <PackageCheck size={48} color="var(--border-color)" style={{ marginBottom: '12px' }} />
            <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '4px' }}>No orders placed yet</h4>
            <p style={{ fontSize: '0.85rem' }}>Complete a checkout to track your live delivery status here!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {orders.map((ord) => (
              <div 
                key={ord.orderId}
                className="glass-card"
                style={{ padding: '18px', borderLeft: '4px solid var(--accent-emerald)' }}
              >
                {/* Meta Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.12)', padding: '2px 8px', borderRadius: '10px' }}>
                      {ord.orderId}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginLeft: '8px' }}>{ord.date}</span>
                  </div>

                  <span className="badge badge-info">
                    In Transit
                  </span>
                </div>

                {/* Progress Steps Timeline */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', margin: '16px 0', textAlign: 'center', position: 'relative' }}>
                  {trackingSteps.map((st, idx) => (
                    <div key={st.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: st.done ? 'var(--accent-emerald)' : 'var(--bg-primary)',
                        color: st.done ? '#ffffff' : 'var(--text-muted)',
                        border: st.done ? 'none' : '1px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        marginBottom: '6px'
                      }}>
                        {st.done ? '✓' : idx + 1}
                      </div>
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: st.done ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Items & Shipping Address */}
                <div style={{ background: 'var(--bg-primary)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span>Shipping To: <strong>{ord.customer.address}</strong></span>
                    <strong style={{ color: 'var(--accent-primary)' }}>Total: ${ord.total.toFixed(2)}</strong>
                  </div>
                  <div>Items: {ord.items.map(i => `${i.quantity}x ${i.title}`).join(', ')}</div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
