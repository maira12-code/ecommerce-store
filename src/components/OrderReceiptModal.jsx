import React from 'react';
import { X, CheckCircle, PackageCheck, Printer, Download, ArrowRight } from 'lucide-react';

export default function OrderReceiptModal({ order, onClose, onTrackOrder }) {
  if (!order) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '2px solid var(--accent-emerald)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px auto'
          }}>
            <CheckCircle size={32} color="var(--accent-emerald)" />
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
            Order Placed Successfully!
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
            Thank you for shopping with NexStore. A confirmation email has been sent.
          </p>
        </div>

        {/* Invoice Container */}
        <div style={{ 
          background: 'var(--bg-primary)', 
          border: '1px solid var(--border-color)', 
          borderRadius: 'var(--radius-md)', 
          padding: '16px',
          marginBottom: '20px'
        }}>
          {/* Order Meta */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '12px', fontSize: '0.82rem' }}>
            <div>
              <div style={{ color: 'var(--text-muted)' }}>Order ID</div>
              <strong style={{ color: 'var(--accent-primary)', fontSize: '0.95rem' }}>{order.orderId}</strong>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ color: 'var(--text-muted)' }}>Date & Time</div>
              <strong style={{ color: 'var(--text-primary)' }}>{order.date}</strong>
            </div>
          </div>

          {/* Customer & Payment */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.78rem', marginBottom: '14px', color: 'var(--text-secondary)' }}>
            <div>
              <strong>Billed To:</strong>
              <div>{order.customer.fullName}</div>
              <div>{order.customer.email}</div>
              <div>{order.customer.address}</div>
            </div>
            <div>
              <strong>Payment Method:</strong>
              <div>{order.paymentMethod}</div>
              <div style={{ color: 'var(--accent-emerald)', fontWeight: 700, marginTop: '4px' }}>Status: Confirmed ✓</div>
            </div>
          </div>

          {/* Items Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px dashed var(--border-color)', paddingTop: '10px', fontSize: '0.82rem' }}>
            {order.items.map(it => (
              <div key={it.id} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>{it.quantity}x {it.title}</span>
                <strong>${(it.price * it.quantity).toFixed(2)}</strong>
              </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '8px', fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              <span>Total Paid</span>
              <span style={{ color: 'var(--accent-emerald)' }}>${order.total.toFixed(2)}</span>
            </div>
          </div>

        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={onTrackOrder}
            className="btn btn-primary"
            style={{ flex: 1.5 }}
          >
            <PackageCheck size={18} />
            <span>Track Order Status</span>
          </button>

          <button 
            onClick={onClose}
            className="btn btn-secondary"
            style={{ flex: 1 }}
          >
            Close Invoice
          </button>
        </div>

      </div>
    </div>
  );
}
