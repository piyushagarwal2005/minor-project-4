import React from 'react';
import { Calendar, Check, Clock, Edit2, Flame, Tag, Trash2 } from 'lucide-react';
import Badge from '../common/Badge';
import { formatDate, isDueToday, isOverdue } from '../../utils/dateUtils';

/**
 * TodoItem Component
 * Demonstrates: Props Destructuring, Conditional Rendering, Event Handling, ES6+ Template Literals
 */
const TodoItem = ({ todo, onToggleComplete, onEdit, onDelete }) => {
  const { id, title, description, completed, dueDate, priority, category, createdAt } = todo;

  const overdue = !completed && isOverdue(dueDate);
  const dueToday = !completed && isDueToday(dueDate);

  // Helper for priority badge colors
  const getPriorityVariant = (level) => {
    switch (level?.toLowerCase()) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'neutral';
    }
  };

  return (
    <div className={`todo-item-card ${completed ? 'is-completed' : ''} ${overdue ? 'is-overdue' : ''}`}>
      {/* Checkbox for toggling completion */}
      <button
        type="button"
        className={`todo-checkbox ${completed ? 'checked' : ''}`}
        onClick={() => onToggleComplete(id)}
        aria-label={completed ? 'Mark task as pending' : 'Mark task as completed'}
      >
        {completed && <Check size={14} className="check-icon" />}
      </button>

      {/* Task Content Area */}
      <div className="todo-content-col">
        <div className="todo-header-row">
          <h4 className="todo-title" onClick={() => onToggleComplete(id)}>
            {title}
          </h4>

          {/* Status Badge: Completed / Pending (Requirement) */}
          <Badge variant={completed ? 'success' : 'warning'} size="sm">
            {completed ? 'Completed' : 'Pending'}
          </Badge>
        </div>

        {description && <p className="todo-description">{description}</p>}

        {/* Metadata Badges: Due Date, Priority, Category */}
        <div className="todo-meta-row">
          {dueDate && (
            <span className={`todo-due-date ${overdue ? 'overdue' : dueToday ? 'today' : ''}`}>
              <Calendar size={13} />
              <span>
                {overdue ? 'Overdue: ' : dueToday ? 'Due Today: ' : 'Due: '}
                {formatDate(dueDate)}
              </span>
            </span>
          )}

          {priority && (
            <Badge variant={getPriorityVariant(priority)} size="sm">
              <Flame size={12} style={{ marginRight: '3px' }} />
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </Badge>
          )}

          {category && (
            <span className="todo-category-tag">
              <Tag size={12} />
              <span>{category}</span>
            </span>
          )}

          <span className="todo-created-at" title={`Created on ${formatDate(createdAt, true)}`}>
            <Clock size={12} />
            <span>Added {formatDate(createdAt)}</span>
          </span>
        </div>
      </div>

      {/* Action Buttons: Edit & Delete */}
      <div className="todo-actions-col">
        <button
          type="button"
          className="action-btn edit-btn"
          onClick={() => onEdit(todo)}
          title="Edit task"
          aria-label="Edit task"
        >
          <Edit2 size={16} />
        </button>

        <button
          type="button"
          className="action-btn delete-btn"
          onClick={() => onDelete(id)}
          title="Delete task"
          aria-label="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
