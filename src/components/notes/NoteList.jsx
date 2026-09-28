import React from 'react';
import { FileQuestion, FileText, Pin, Plus } from 'lucide-react';
import NoteCard from './NoteCard';
import Button from '../common/Button';

/**
 * NoteList Component
 * Displays organized grid layout of notes, separating pinned notes.
 * Demonstrates: List Rendering using .map(), Array filtering, Conditional Rendering
 */
const NoteList = ({
  notes,
  onEdit,
  onDelete,
  onTogglePin,
  onOpenCreateModal,
  hasActiveFilters,
  onResetFilters,
}) => {
  if (notes.length === 0) {
    return (
      <div className="empty-state-card">
        <div className="empty-icon-wrapper">
          {hasActiveFilters ? <FileQuestion size={40} /> : <FileText size={40} />}
        </div>
        <h4 className="empty-title">
          {hasActiveFilters ? 'No notes matched your search' : 'No notes created yet'}
        </h4>
        <p className="empty-description">
          {hasActiveFilters
            ? 'Try searching with different keywords or choosing another category.'
            : 'Capture your thoughts, ideas, lecture notes, and reminders in one place.'}
        </p>

        {hasActiveFilters ? (
          <Button variant="outline" size="sm" onClick={onResetFilters}>
            Reset Search & Filters
          </Button>
        ) : (
          <Button
            variant="primary"
            size="md"
            icon={<Plus size={16} />}
            onClick={onOpenCreateModal}
          >
            Create Your First Note
          </Button>
        )}
      </div>
    );
  }

  // Separate pinned and regular notes using ES6+ array filter method
  const pinnedNotes = notes.filter((n) => n.isPinned);
  const unpinnedNotes = notes.filter((n) => !n.isPinned);

  return (
    <div className="note-list-container">
      {/* Pinned Notes Section */}
      {pinnedNotes.length > 0 && (
        <section className="notes-group pinned-section">
          <div className="notes-group-header">
            <Pin size={16} className="pinned-header-icon" />
            <span className="notes-group-title">Pinned Notes ({pinnedNotes.length})</span>
          </div>
          <div className="notes-grid">
            {pinnedNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={onEdit}
                onDelete={onDelete}
                onTogglePin={onTogglePin}
              />
            ))}
          </div>
        </section>
      )}

      {/* Other / Regular Notes Section */}
      <section className="notes-group">
        {pinnedNotes.length > 0 && (
          <div className="notes-group-header">
            <span className="notes-group-title">Other Notes ({unpinnedNotes.length})</span>
          </div>
        )}
        <div className="notes-grid">
          {(pinnedNotes.length > 0 ? unpinnedNotes : notes).map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={onEdit}
              onDelete={onDelete}
              onTogglePin={onTogglePin}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default NoteList;
