import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

/**
 * TodoFilter Component
 * Demonstrates: Props, Event Handling, ES6+ Array methods, Controlled Inputs
 */
const TodoFilter = ({
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  searchQuery,
  onSearchChange,
  counts, // { all, pending, completed }
}) => {
  return (
    <div className="todo-filter-panel">
      {/* Search Input */}
      <div className="search-input-wrapper">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks by title or description..."
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

      <div className="filter-controls-row">
        {/* Status Filter Tabs */}
        <div className="status-tabs" role="tablist">
          <button
            type="button"
            className={`status-tab ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => onStatusChange('all')}
          >
            All <span className="tab-count">{counts.all}</span>
          </button>
          <button
            type="button"
            className={`status-tab ${statusFilter === 'pending' ? 'active' : ''}`}
            onClick={() => onStatusChange('pending')}
          >
            Pending <span className="tab-count">{counts.pending}</span>
          </button>
          <button
            type="button"
            className={`status-tab ${statusFilter === 'completed' ? 'active' : ''}`}
            onClick={() => onStatusChange('completed')}
          >
            Completed <span className="tab-count">{counts.completed}</span>
          </button>
        </div>

        {/* Priority Filter */}
        <div className="filter-select-wrapper">
          <SlidersHorizontal size={15} className="filter-select-icon" />
          <select
            className="filter-select"
            value={priorityFilter}
            onChange={(e) => onPriorityChange(e.target.value)}
            aria-label="Filter tasks by priority"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TodoFilter;
