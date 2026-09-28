import React, { useState, useEffect } from 'react';
import Navbar from './components/common/Navbar';
import TodoApp from './components/todo/TodoApp';
import NotesApp from './components/notes/NotesApp';
import Dashboard from './components/dashboard/Dashboard';
import { INITIAL_TODOS, INITIAL_NOTES } from './data/initialData';

// Import Modular CSS Files
import './styles/index.css';
import './styles/App.css';
import './styles/Todo.css';
import './styles/Notes.css';

const TODO_STORAGE_KEY = 'taskflow_todos_v1';
const NOTES_STORAGE_KEY = 'taskflow_notes_v1';

/**
 * App Component - Root Application
 * Demonstrates:
 * - Component-based architecture
 * - State management using useState
 * - Side effects with useEffect (LocalStorage persistence & dynamic document title)
 * - Conditional rendering of active views
 * - ES6+ destructuring, arrow functions, and spread operator
 * - Unidirectional data flow and props passing
 */
function App() {
  // Navigation view tab state: 'todo' | 'notes' | 'dashboard'
  const [activeTab, setActiveTab] = useState('todo');

  // 1. Persistent To-Do state
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem(TODO_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_TODOS;
    } catch {
      return INITIAL_TODOS;
    }
  });

  // 2. Persistent Notes state
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem(NOTES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_NOTES;
    } catch {
      return INITIAL_NOTES;
    }
  });

  // Side Effect: Synchronize todos to localStorage whenever changed
  useEffect(() => {
    try {
      localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
    } catch (e) {
      console.error('Error saving todos to localStorage:', e);
    }
  }, [todos]);

  // Side Effect: Synchronize notes to localStorage whenever changed
  useEffect(() => {
    try {
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
    } catch (e) {
      console.error('Error saving notes to localStorage:', e);
    }
  }, [notes]);

  // Derived counts
  const pendingTasksCount = todos.filter((t) => !t.completed).length;
  const notesCount = notes.length;

  // Side Effect: Dynamically update document title based on pending tasks count
  useEffect(() => {
    const tabName =
      activeTab === 'todo'
        ? 'To-Do App'
        : activeTab === 'notes'
        ? 'Notes App'
        : 'Dashboard';

    document.title =
      pendingTasksCount > 0
        ? `(${pendingTasksCount}) ${tabName} - TaskFlow & Notes`
        : `${tabName} - TaskFlow & Notes`;
  }, [pendingTasksCount, activeTab]);

  // ================= Todo Handlers =================
  const handleAddTodo = (taskData) => {
    const newTask = {
      ...taskData,
      id: `todo-${Date.now()}`,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [newTask, ...prev]);
  };

  const handleEditTodo = (updatedData) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === updatedData.id ? { ...t, ...updatedData } : t))
    );
  };

  const handleToggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  // ================= Notes Handlers =================
  const handleAddNote = (noteData) => {
    const newNote = {
      ...noteData,
      id: `note-${Date.now()}`,
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const handleEditNote = (updatedData) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === updatedData.id ? { ...n, ...updatedData } : n))
    );
  };

  const handleDeleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const handleTogglePin = (id) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isPinned: !n.isPinned } : n))
    );
  };

  // Reset demo datasets
  const handleResetData = () => {
    if (window.confirm('Reset all tasks and notes to default sample data?')) {
      localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(INITIAL_TODOS));
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(INITIAL_NOTES));
      setTodos(INITIAL_TODOS);
      setNotes(INITIAL_NOTES);
    }
  };

  return (
    <div className="app-wrapper">
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        pendingTasksCount={pendingTasksCount}
        notesCount={notesCount}
        onResetData={handleResetData}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'todo' && (
          <TodoApp
            todos={todos}
            onAddTodo={handleAddTodo}
            onEditTodo={handleEditTodo}
            onToggleComplete={handleToggleComplete}
            onDeleteTodo={handleDeleteTodo}
            onClearCompleted={handleClearCompleted}
          />
        )}

        {activeTab === 'notes' && (
          <NotesApp
            notes={notes}
            onAddNote={handleAddNote}
            onEditNote={handleEditNote}
            onDeleteNote={handleDeleteNote}
            onTogglePin={handleTogglePin}
          />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard
            todos={todos}
            notes={notes}
            onNavigateTab={setActiveTab}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-container">
          <div>
            <strong>Web Development Week 04 Minor Project</strong> • To-Do App + Notes App in React.js
          </div>
          <div className="footer-badges">
            <span>Built with React 19 & Vite</span>
            <span>•</span>
            <span>LocalStorage Integrated</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
