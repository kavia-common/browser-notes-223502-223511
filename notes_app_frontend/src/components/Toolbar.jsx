import React from 'react';

/**
 * Toolbar renders search input, tag filter dropdown, and Clear All button.
 * Props:
 * - searchText, onSearchTextChange
 * - tagFilter, onTagFilterChange
 * - availableTags: string[]
 * - onClearAll: () => void
 */
// PUBLIC_INTERFACE
export default function Toolbar({
  searchText,
  onSearchTextChange,
  tagFilter,
  onTagFilterChange,
  availableTags,
  onClearAll
}) {
  return (
    <div className="toolbar" role="region" aria-label="Notes toolbar">
      <div style={{ flex: 2, minWidth: 220 }}>
        <label htmlFor="search" className="label">Search</label>
        <input
          id="search"
          className="input"
          type="search"
          placeholder="Search title or content..."
          value={searchText}
          onChange={(e) => onSearchTextChange(e.target.value)}
        />
      </div>

      <div style={{ flex: 1, minWidth: 160 }}>
        <label htmlFor="tagFilter" className="label">Filter by tag</label>
        <select
          id="tagFilter"
          className="select"
          value={tagFilter}
          onChange={(e) => onTagFilterChange(e.target.value)}
        >
          <option value="">All tags</option>
          {availableTags.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="toolbar-spacer" />

      <div>
        <label className="label" htmlFor="clearAllBtn" style={{ visibility: 'hidden' }}>
          Clear all notes
        </label>
        <button
          id="clearAllBtn"
          className="btn"
          onClick={onClearAll}
          aria-label="Clear all notes"
          title="Clear all notes"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
