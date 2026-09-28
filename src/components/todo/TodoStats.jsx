import React from 'react';
import { CheckCircle2, Clock, ListTodo, Trash2 } from 'lucide-react';
import Button from '../common/Button';

/**
 * TodoStats Component
 * Demonstrates: Props destructuring, ES6+ Template literals, Derived state calculations
 */
const TodoStats = ({ todos, onClearCompleted }) => {
  // Derived state using ES6+ array filter method
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const pending = total - completed;
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="todo-stats-card">
      <div className="stats-grid">
        <div className="stat-item total">
          <div className="stat-icon-wrapper">
            <ListTodo size={20} />
          </div>
          <div className="stat-details">
            <span className="stat-label">Total Tasks</span>
            <span className="stat-value">{total}</span>
          </div>
        </div>

        <div className="stat-item pending">
          <div className="stat-icon-wrapper">
            <Clock size={20} />
          </div>
          <div className="stat-details">
            <span className="stat-label">Pending</span>
            <span className="stat-value">{pending}</span>
          </div>
        </div>

        <div className="stat-item completed">
          <div className="stat-icon-wrapper">
            <CheckCircle2 size={20} />
          </div>
          <div className="stat-details">
            <span className="stat-label">Completed</span>
            <span className="stat-value">{completed}</span>
          </div>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-header">
          <span className="progress-title">Task Completion</span>
          <span className="progress-percentage">{completionPercentage}%</span>
        </div>
        <div className="progress-bar-bg">
          <div
            className="progress-bar-fill"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {completed > 0 && (
        <div className="stats-footer">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearCompleted}
            icon={<Trash2 size={15} />}
            className="clear-completed-btn"
          >
            Clear Completed ({completed})
          </Button>
        </div>
      )}
    </div>
  );
};

export default TodoStats;
