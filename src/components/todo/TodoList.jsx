import React from 'react';
import { ClipboardList, Filter } from 'lucide-react';
import TodoItem from './TodoItem';

/**
 * TodoList Component
 * Demonstrates: List Rendering using .map(), Key props, Conditional Rendering, Props passing
 */
const TodoList = ({ todos, onToggleComplete, onEdit, onDelete, hasActiveFilters, onResetFilters }) => {
  if (todos.length === 0) {
    return (
      <div className="empty-state-card">
        <div className="empty-icon-wrapper">
          {hasActiveFilters ? <Filter size={36} /> : <ClipboardList size={36} />}
        </div>
        <h4 className="empty-title">
          {hasActiveFilters ? 'No tasks match your filters' : 'No tasks yet'}
        </h4>
        <p className="empty-description">
          {hasActiveFilters
            ? 'Try changing your search term, priority, or status filter to see other tasks.'
            : 'Get started by creating your first task above. Stay organized and productive!'}
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            className="btn btn-outline btn-sm reset-filter-btn"
            onClick={onResetFilters}
          >
            Clear Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="todo-items-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
