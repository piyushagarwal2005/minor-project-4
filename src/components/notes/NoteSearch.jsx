import React from 'react';
import { Search, Tag, X } from 'lucide-react';
import { NOTE_CATEGORIES } from '../../data/initialData';

/**
 * NoteSearch Component
 * Demonstrates: Controlled inputs, Event handling, Array mapping for filter chips, Props passing
 */
const NoteSearch = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categoryCounts,
}) => {
  return (
    <div className="note-search-panel">
      {/* Search Input */}
      <div className="search-input-wrapper">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search notes by title or content..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button
            type="button"
            className="clear-search-btn"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="category-pills-row" role="tablist">
        <span className="category-label">
          <Tag size={13} style={{ marginRight: '4px' }} /> Categories:
        </span>
        {NOTE_CATEGORIES.map((category) => {
          const count = categoryCounts[category] || 0;
          return (
            <button
              key={category}
              type="button"
              className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => onCategoryChange(category)}
            >
              <span>{category}</span>
              <span className="pill-count">{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NoteSearch;
