import React from 'react';
import { CATEGORIES } from '../data/mockProducts';
import { Filter, SlidersHorizontal, Star, ArrowUpDown } from 'lucide-react';

export default function FilterSidebar({ 
  selectedCategory, 
  setSelectedCategory, 
  priceRange, 
  setPriceRange, 
  minRating, 
  setMinRating, 
  sortBy, 
  setSortBy,
  totalCount 
}) {
  return (
    <div className="glass-card" style={{ padding: '16px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        
        {/* Top Filter Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          
          {/* Price Range Slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <SlidersHorizontal size={16} color="var(--accent-primary)" />
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Max Price:</span>
            <input
              type="range"
              min="30"
              max="400"
              step="10"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              style={{ cursor: 'pointer', accentColor: 'var(--accent-primary)' }}
            />
            <strong style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', minWidth: '50px' }}>
              ${priceRange}
            </strong>
          </div>

          {/* Rating Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Star size={15} color="var(--accent-amber)" fill="var(--accent-amber)" />
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Rating:</span>
            {[0, 4.5, 4.8].map((rate) => (
              <button
                key={rate}
                onClick={() => setMinRating(rate)}
                style={{
                  padding: '3px 10px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  borderRadius: '12px',
                  border: minRating === rate ? '1px solid var(--accent-amber)' : '1px solid var(--border-color)',
                  background: minRating === rate ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                  color: minRating === rate ? 'var(--accent-amber)' : 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                {rate === 0 ? 'All' : `${rate}+ ★`}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowUpDown size={15} color="var(--accent-cyan)" />
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '5px 10px',
                fontSize: '0.82rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Showing <strong>{totalCount}</strong> products
          </div>

        </div>

        {/* Category Pills Slider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          <Filter size={15} color="var(--text-muted)" style={{ flexShrink: 0 }} />
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  whiteSpace: 'nowrap',
                  padding: '6px 14px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  borderRadius: '20px',
                  border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                  background: isSelected ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' : 'var(--bg-secondary)',
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
