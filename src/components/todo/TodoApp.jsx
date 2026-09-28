import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import TodoStats from './TodoStats';
import TodoFilter from './TodoFilter';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import Modal from '../common/Modal';

/**
 * TodoApp Component - Main container for Project 1: To-Do App
 * Demonstrates:
 * - Functional Components & JSX
 * - State Management with useState
 * - Array Methods: .map(), .filter(), .find()
 * - ES6+ Features: Destructuring, Spread Operator, Arrow Functions, Template Literals
 * - Component Reusability & Props Passing
 */
const TodoApp = ({
  todos,
  onAddTodo,
  onEditTodo,
  onToggleComplete,
  onDeleteTodo,
  onClearCompleted,
}) => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 1. Start Edit: Uses Array.prototype.find to locate target item
  const handleStartEdit = (todo) => {
    // Demonstrating .find() as required by technical specifications
    const found = todos.find((t) => t.id === todo.id);
    if (found) {
      setEditingTodo(found);
      setIsEditModalOpen(true);
    }
  };

  // 2. Save Edit
  const handleSaveEdit = (updatedData) => {
    onEditTodo(updatedData);
    setEditingTodo(null);
    setIsEditModalOpen(false);
  };

  // 3. Reset all filters
  const handleResetFilters = () => {
    setStatusFilter('all');
    setPriorityFilter('all');
    setSearchQuery('');
  };

  // Filter and search logic using Array.prototype.filter()
  const filteredTodos = todos.filter((todo) => {
    // 1. Status Filter
    if (statusFilter === 'pending' && todo.completed) return false;
    if (statusFilter === 'completed' && !todo.completed) return false;

    // 2. Priority Filter
    if (priorityFilter !== 'all' && todo.priority !== priorityFilter) return false;

    // 3. Search Query (Matches title, description, or category case-insensitively)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const titleMatches = todo.title?.toLowerCase().includes(q);
      const descMatches = todo.description?.toLowerCase().includes(q);
      const catMatches = todo.category?.toLowerCase().includes(q);
      return titleMatches || descMatches || catMatches;
    }

    return true;
  });

  // Calculate live counts for filters
  const counts = {
    all: todos.length,
    pending: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  const hasActiveFilters =
    statusFilter !== 'all' || priorityFilter !== 'all' || searchQuery.trim() !== '';

  return (
    <div className="todo-app-container">
      <div className="section-header">
        <div>
          <h2 className="section-title">To-Do Application</h2>
          <p className="section-subtitle">
            Manage your daily activities, set deadlines, and track your completion progress.
          </p>
        </div>
      </div>

      <div className="todo-layout-grid">
        {/* Left Column: Form & Statistics */}
        <div className="todo-sidebar-col">
          {/* Add New Task Form Card */}
          <div className="app-card form-card">
            <h3 className="card-heading">
              <PlusCircle size={18} />
              <span>Create New Task</span>
            </h3>
            <TodoForm onSubmit={onAddTodo} />
          </div>

          {/* Statistics Card */}
          <TodoStats todos={todos} onClearCompleted={onClearCompleted} />
        </div>

        {/* Right Column: Filters and Task List */}
        <div className="todo-main-col">
          <div className="app-card">
            <TodoFilter
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              priorityFilter={priorityFilter}
              onPriorityChange={setPriorityFilter}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              counts={counts}
            />

            <div className="todo-list-wrapper">
              <TodoList
                todos={filteredTodos}
                onToggleComplete={onToggleComplete}
                onEdit={handleStartEdit}
                onDelete={onDeleteTodo}
                hasActiveFilters={hasActiveFilters}
                onResetFilters={handleResetFilters}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Task Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingTodo(null);
        }}
        title="Edit Task Details"
      >
        <TodoForm
          key={editingTodo ? editingTodo.id : 'new-todo-edit'}
          initialData={editingTodo}
          isEditing={true}
          onSubmit={handleSaveEdit}
          onCancel={() => {
            setIsEditModalOpen(false);
            setEditingTodo(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default TodoApp;
