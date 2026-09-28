import React, { useState } from 'react';
import { Check, Palette, Pin, Plus, Tag, X } from 'lucide-react';
import Button from '../common/Button';
import { NOTE_CATEGORIES, NOTE_COLORS } from '../../data/initialData';

/**
 * NoteForm Component
 * Used for creating new notes and editing existing notes.
 * Demonstrates: useState, Controlled inputs, ES6+ object manipulation
 */
const NoteForm = ({ initialData = null, onSubmit, onCancel, isEditing = false }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [category, setCategory] = useState(initialData?.category || 'Study');
  const [color, setColor] = useState(initialData?.color || '#e0f2fe'); // default sky blue
  const [isPinned, setIsPinned] = useState(Boolean(initialData?.isPinned));
  const [error, setError] = useState('');

  const resetForm = () => {
    setTitle('');
    setContent('');
    setCategory('Study');
    setColor('#e0f2fe');
    setIsPinned(false);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Note title is required.');
      return;
    }

    if (!content.trim()) {
      setError('Note content cannot be empty.');
      return;
    }

    const now = new Date().toISOString();
    const notePayload = {
      ...(initialData ? { id: initialData.id, createdAt: initialData.createdAt } : { createdAt: now }),
      title: title.trim(),
      content: content.trim(),
      category,
      color,
      isPinned,
      updatedAt: now,
    };

    onSubmit(notePayload);

    if (!isEditing) {
      resetForm();
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      {error && <div className="form-error-banner">{error}</div>}

      <div className="form-group">
        <label htmlFor="note-title" className="form-label">
          Note Title <span className="required-star">*</span>
        </label>
        <input
          id="note-title"
          type="text"
          className="form-input"
          placeholder="e.g. React State Management Best Practices"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError('');
          }}
          autoFocus={isEditing}
        />
      </div>

      <div className="form-group">
        <label htmlFor="note-content" className="form-label">
          Content <span className="required-star">*</span>
        </label>
        <textarea
          id="note-content"
          rows={5}
          className="form-textarea"
          placeholder="Write your note thoughts, key points, markdown or checklists..."
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            if (error) setError('');
          }}
        />
      </div>

      <div className="form-row two-cols">
        {/* Category Selector */}
        <div className="form-group">
          <label htmlFor="note-category" className="form-label">
            <Tag size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
            Category
          </label>
          <select
            id="note-category"
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {NOTE_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Pin Checkbox */}
        <div className="form-group pin-toggle-group">
          <label className="checkbox-label" htmlFor="note-pin-checkbox">
            <input
              id="note-pin-checkbox"
              type="checkbox"
              checked={isPinned}
              onChange={(e) => setIsPinned(e.target.checked)}
            />
            <Pin size={15} style={{ verticalAlign: 'middle', marginLeft: '6px' }} />
            <span>Pin this note to top</span>
          </label>
        </div>
      </div>

      {/* Color Palette Selector */}
      <div className="form-group">
        <label className="form-label">
          <Palette size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
          Card Color Theme
        </label>
        <div className="color-palette-options">
          {NOTE_COLORS.map((c) => (
            <button
              key={c.value}
              type="button"
              className={`color-swatch-btn ${color === c.value ? 'selected' : ''}`}
              style={{ backgroundColor: c.value, borderColor: c.border }}
              onClick={() => setColor(c.value)}
              title={c.name}
              aria-label={`Select ${c.name} color`}
            >
              {color === c.value && <Check size={14} className="swatch-check" />}
            </button>
          ))}
        </div>
      </div>

      {/* Form Action Buttons */}
      <div className="form-actions-row">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel} icon={<X size={16} />}>
            Cancel
          </Button>
        )}

        <Button
          type="submit"
          variant="primary"
          icon={isEditing ? <Check size={16} /> : <Plus size={16} />}
        >
          {isEditing ? 'Save Changes' : 'Create Note'}
        </Button>
      </div>
    </form>
  );
};

export default NoteForm;
