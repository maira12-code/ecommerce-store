import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export default function HeroBanner({ onShopNow }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="glass-card" style={{ 
      margin: '20px 0', 
      padding: '32px 24px', 
      background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(6, 182, 212, 0.15))',
      borderColor: 'rgba(59, 130, 246, 0.3)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
        
        {/* Left Hero Copy */}
        <div style={{ flex: 1, minWidth: '280px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(59, 130, 246, 0.2)', color: 'var(--accent-primary)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px' }}>
            <Sparkles size={14} /> Flash Deal of the Week
          </div>

          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.25, marginBottom: '10px' }}>
            Next-Gen Tech & Premium Lifestyle Gear
          </h2>

          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '20px', maxWidth: '520px', lineHeight: 1.5 }}>
            Upgrade your daily setup with up to <strong>50% OFF</strong> on premium wireless audio, smart wearables, and ergonomic accessories. Use promo code <code style={{ background: 'var(--bg-secondary)', padding: '2px 6px', borderRadius: '4px', color: 'var(--accent-cyan)' }}>SAVE20</code> at checkout!
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button onClick={onShopNow} className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '0.95rem' }}>
              <span>Shop Featured Collection</span>
              <ArrowRight size={18} />
            </button>

            {/* Countdown Timer */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-secondary)', padding: '8px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <Clock size={16} color="var(--accent-amber)" />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Ends in:</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-amber)', fontFamily: 'monospace' }}>
                {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Right Feature Highlights */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-secondary)', padding: '10px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            <Truck size={18} color="var(--accent-emerald)" />
            <span>Free Express Shipping over $50</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-secondary)', padding: '10px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            <ShieldCheck size={18} color="var(--accent-cyan)" />
            <span>2-Year Official Brand Warranty</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-secondary)', padding: '10px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            <RotateCcw size={18} color="var(--accent-amber)" />
            <span>30-Day Hassle-Free Returns</span>
          </div>
        </div>

      </div>

    </div>
  );
}
