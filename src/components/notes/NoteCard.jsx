import React, { useState } from 'react';
import { Calendar, Check, Copy, Edit2, Pin, PinOff, Tag, Trash2 } from 'lucide-react';
import Badge from '../common/Badge';
import { formatDate } from '../../utils/dateUtils';

/**
 * NoteCard Component
 * Displays individual note card with actions, color styling, and timestamps.
 * Demonstrates: Props destructuring, Conditional rendering, Event Handling, ES6+ Template Literals
 */
const NoteCard = ({ note, onEdit, onDelete, onTogglePin }) => {
  const { id, title, content, category, color, isPinned, createdAt, updatedAt } = note;
  const [copied, setCopied] = useState(false);

  // Copy note content to clipboard helper
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${title}\n\n${content}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy note:', err);
    }
  };

  // Helper for category badge color
  const getCategoryVariant = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'work':
        return 'primary';
      case 'personal':
        return 'purple';
      case 'study':
        return 'info';
      case 'ideas':
        return 'warning';
      default:
        return 'neutral';
    }
  };

  return (
    <div
      className={`note-card ${isPinned ? 'is-pinned' : ''}`}
      style={{
        backgroundColor: color || '#ffffff',
      }}
    >
      {/* Note Header */}
      <div className="note-card-header">
        <div className="note-tags-wrapper">
          <Badge variant={getCategoryVariant(category)} size="sm">
            <Tag size={11} style={{ marginRight: '3px' }} />
            {category}
          </Badge>
          {isPinned && (
            <span className="pinned-indicator" title="Pinned to top">
              <Pin size={12} fill="currentColor" /> Pinned
            </span>
          )}
        </div>

        <div className="note-header-actions">
          <button
            type="button"
            className={`icon-action-btn pin-btn ${isPinned ? 'active' : ''}`}
            onClick={() => onTogglePin(id)}
            title={isPinned ? 'Unpin note' : 'Pin note to top'}
            aria-label={isPinned ? 'Unpin note' : 'Pin note to top'}
          >
            {isPinned ? <PinOff size={15} /> : <Pin size={15} />}
          </button>
        </div>
      </div>

      {/* Note Body */}
      <div className="note-card-body">
        <h3 className="note-card-title">{title}</h3>
        <p className="note-card-content">{content}</p>
      </div>

      {/* Note Footer: Timestamps & Action Buttons */}
      <div className="note-card-footer">
        <div className="note-timestamp" title={`Created: ${formatDate(createdAt, true)}`}>
          <Calendar size={12} />
          <span>
            {updatedAt && updatedAt !== createdAt
              ? `Updated ${formatDate(updatedAt, true)}`
              : `Created ${formatDate(createdAt)}`}
          </span>
        </div>

        <div className="note-card-buttons">
          <button
            type="button"
            className="icon-action-btn copy-btn"
            onClick={handleCopy}
            title={copied ? 'Copied to clipboard!' : 'Copy note content'}
            aria-label="Copy note content"
          >
            {copied ? <Check size={14} className="copied-check" /> : <Copy size={14} />}
          </button>

          <button
            type="button"
            className="icon-action-btn edit-btn"
            onClick={() => onEdit(note)}
            title="Edit note"
            aria-label="Edit note"
          >
            <Edit2 size={14} />
          </button>

          <button
            type="button"
            className="icon-action-btn delete-btn"
            onClick={() => onDelete(id)}
            title="Delete note"
            aria-label="Delete note"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
