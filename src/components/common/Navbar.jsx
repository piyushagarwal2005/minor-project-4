import React from 'react';
import { CheckSquare, FileText, LayoutDashboard, RotateCcw, Sparkles } from 'lucide-react';
import Badge from './Badge';

/**
 * Top Navigation Bar Component
 * Demonstrates: Props, Conditional Rendering, Event Handling, Component Reusability
 */
const Navbar = ({ activeTab, onSelectTab, pendingTasksCount, notesCount, onResetData }) => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="brand-logo">
            <Sparkles size={22} className="brand-icon" />
          </div>
          <div className="brand-info">
            <span className="brand-title">TaskFlow & Notes</span>
            <span className="brand-subtitle">React Minor Project 04</span>
          </div>
        </div>

        <nav className="navbar-nav">
          <button
            type="button"
            className={`nav-tab ${activeTab === 'todo' ? 'active' : ''}`}
            onClick={() => onSelectTab('todo')}
          >
            <CheckSquare size={18} />
            <span>To-Do App</span>
            {pendingTasksCount > 0 && (
              <Badge variant="warning" size="sm">
                {pendingTasksCount}
              </Badge>
            )}
          </button>

          <button
            type="button"
            className={`nav-tab ${activeTab === 'notes' ? 'active' : ''}`}
            onClick={() => onSelectTab('notes')}
          >
            <FileText size={18} />
            <span>Notes App</span>
            <Badge variant="info" size="sm">
              {notesCount}
            </Badge>
          </button>

          <button
            type="button"
            className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => onSelectTab('dashboard')}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>
        </nav>

        <div className="navbar-actions">
          <button
            type="button"
            className="btn btn-ghost btn-sm reset-demo-btn"
            onClick={onResetData}
            title="Reset to default demo data"
          >
            <RotateCcw size={16} />
            <span className="btn-label-desktop">Reset Demo Data</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
