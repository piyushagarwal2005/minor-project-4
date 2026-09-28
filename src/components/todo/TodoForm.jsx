import React, { useState } from 'react';
import { Calendar, Check, Flag, Plus, Tag, X } from 'lucide-react';
import Button from '../common/Button';
import { getTodayDateInputFormat } from '../../utils/dateUtils';

/**
 * TodoForm Component
 * Handles creating a new task and editing an existing task.
 * Demonstrates: useState, Controlled components, Form validation, ES6+ Object manipulation and Spread Operator
 */
const TodoForm = ({ initialData = null, onSubmit, onCancel, isEditing = false }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [dueDate, setDueDate] = useState(initialData?.dueDate || '');
  const [priority, setPriority] = useState(initialData?.priority || 'medium');
  const [category, setCategory] = useState(initialData?.category || 'Study');
  const [error, setError] = useState('');

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('medium');
    setCategory('Study');
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!title.trim()) {
      setError('Task title is required.');
      return;
    }

    const taskData = {
      ...(initialData ? { id: initialData.id, completed: initialData.completed, createdAt: initialData.createdAt } : {}),
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || '',
      priority,
      category,
      updatedAt: new Date().toISOString(),
    };

    onSubmit(taskData);

    if (!isEditing) {
      resetForm();
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {error && <div className="form-error-banner">{error}</div>}

      <div className="form-group">
        <label htmlFor="todo-title" className="form-label">
          Task Title <span className="required-star">*</span>
        </label>
        <input
          id="todo-title"
          type="text"
          className="form-input"
          placeholder="e.g. Build React Components..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError('');
          }}
          autoFocus={isEditing}
        />
      </div>

      <div className="form-group">
        <label htmlFor="todo-desc" className="form-label">
          Description (Optional)
        </label>
        <textarea
          id="todo-desc"
          rows={2}
          className="form-textarea"
          placeholder="Add details, steps, or reference links..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-row three-cols">
        {/* Due Date */}
        <div className="form-group">
          <label htmlFor="todo-due-date" className="form-label">
            <Calendar size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
            Due Date
          </label>
          <input
            id="todo-due-date"
            type="date"
            className="form-input"
            value={dueDate}
            min={getTodayDateInputFormat()}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        {/* Priority */}
        <div className="form-group">
          <label htmlFor="todo-priority" className="form-label">
            <Flag size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
            Priority
          </label>
          <select
            id="todo-priority"
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Category */}
        <div className="form-group">
          <label htmlFor="todo-category" className="form-label">
            <Tag size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
            Category
          </label>
          <select
            id="todo-category"
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Study">Study</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="General">General</option>
          </select>
        </div>
      </div>

      {/* Form Action Buttons */}
      <div className="form-actions-row">
        {isEditing && (
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            icon={<X size={16} />}
          >
            Cancel
          </Button>
        )}

        <Button
          type="submit"
          variant="primary"
          icon={isEditing ? <Check size={16} /> : <Plus size={16} />}
        >
          {isEditing ? 'Save Changes' : 'Add Task'}
        </Button>
      </div>
    </form>
  );
};

export default TodoForm;
