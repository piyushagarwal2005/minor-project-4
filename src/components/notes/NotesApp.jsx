import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import NoteSearch from './NoteSearch';
import NoteList from './NoteList';
import NoteForm from './NoteForm';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { NOTE_CATEGORIES } from '../../data/initialData';

/**
 * NotesApp Component - Main container for Project 2: Notes App
 * Demonstrates:
 * - Functional Components & JSX
 * - State Management with useState
 * - Array Methods: .map(), .filter(), .find()
 * - Responsive organized layout for notes
 * - Search, Categorization, Timestamps, Pinning
 */
const NotesApp = ({
  notes,
  onAddNote,
  onEditNote,
  onDeleteNote,
  onTogglePin,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingNote, setEditingNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Add Note
  const handleCreateNote = (newNoteData) => {
    onAddNote(newNoteData);
    setIsModalOpen(false);
  };

  // 2. Save Edit Note
  const handleSaveEdit = (updatedData) => {
    onEditNote(updatedData);
    setEditingNote(null);
    setIsModalOpen(false);
  };

  // 3. Start Edit: Uses Array.prototype.find to locate target note
  const handleStartEdit = (note) => {
    // Demonstrating .find() method
    const target = notes.find((n) => n.id === note.id);
    if (target) {
      setEditingNote(target);
      setIsModalOpen(true);
    }
  };

  // Filter notes based on category and search query
  const filteredNotes = notes.filter((note) => {
    // Category check
    if (selectedCategory !== 'All' && note.category !== selectedCategory) {
      return false;
    }

    // Search query check (Matches title or content case-insensitively)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const titleMatch = note.title?.toLowerCase().includes(q);
      const contentMatch = note.content?.toLowerCase().includes(q);
      return titleMatch || contentMatch;
    }

    return true;
  });

  // Calculate counts per category
  const categoryCounts = NOTE_CATEGORIES.reduce((acc, cat) => {
    if (cat === 'All') {
      acc[cat] = notes.length;
    } else {
      acc[cat] = notes.filter((n) => n.category === cat).length;
    }
    return acc;
  }, {});

  const hasActiveFilters = searchQuery.trim() !== '' || selectedCategory !== 'All';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  return (
    <div className="notes-app-container">
      <div className="section-header">
        <div>
          <h2 className="section-title">Notes Application</h2>
          <p className="section-subtitle">
            Capture thoughts, organize by category, search instantly, and pin important notes.
          </p>
        </div>

        <Button
          variant="primary"
          icon={<Plus size={18} />}
          onClick={() => {
            setEditingNote(null);
            setIsModalOpen(true);
          }}
        >
          New Note
        </Button>
      </div>

      {/* Search and Category Filter Panel */}
      <NoteSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categoryCounts={categoryCounts}
      />

      {/* Grid of Notes */}
      <NoteList
        notes={filteredNotes}
        onEdit={handleStartEdit}
        onDelete={onDeleteNote}
        onTogglePin={onTogglePin}
        onOpenCreateModal={() => {
          setEditingNote(null);
          setIsModalOpen(true);
        }}
        hasActiveFilters={hasActiveFilters}
        onResetFilters={handleResetFilters}
      />

      {/* Add / Edit Note Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingNote(null);
        }}
        title={editingNote ? 'Edit Note' : 'Create New Note'}
        maxWidth="600px"
      >
        <NoteForm
          key={editingNote ? editingNote.id : 'new-note-modal'}
          initialData={editingNote}
          isEditing={Boolean(editingNote)}
          onSubmit={editingNote ? handleSaveEdit : handleCreateNote}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingNote(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default NotesApp;
