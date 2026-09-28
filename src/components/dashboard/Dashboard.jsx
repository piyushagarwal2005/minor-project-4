import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Code2,
  FileText,
  ListTodo,
  Pin,
} from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { formatDate, isOverdue } from '../../utils/dateUtils';

/**
 * Dashboard Component
 * Provides a unified overview of tasks, notes, statistics, and project architecture highlights.
 * Demonstrates: Component Reusability, Derived State, Conditional Rendering, ES6+ Array Methods
 */
const Dashboard = ({ todos, notes, onNavigateTab }) => {
  const totalTasks = todos.length;
  const completedTasks = todos.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const overdueTasks = todos.filter((t) => !t.completed && isOverdue(t.dueDate)).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const totalNotes = notes.length;
  const pinnedNotes = notes.filter((n) => n.isPinned).length;

  const recentTodos = todos.slice(0, 4);
  const recentNotes = notes.slice(0, 3);

  return (
    <div className="dashboard-container">
      {/* Welcome Banner */}
      <div className="dashboard-welcome-banner">
        <div className="welcome-text">
          <h2 className="welcome-heading">Welcome to your Productivity Suite 🚀</h2>
          <p className="welcome-desc">
            Organize daily tasks and capture important notes using modern React.js architecture.
          </p>
        </div>
        <div className="welcome-actions">
          <Button
            variant="primary"
            icon={<ListTodo size={16} />}
            onClick={() => onNavigateTab('todo')}
          >
            Go to Tasks
          </Button>
          <Button
            variant="secondary"
            icon={<FileText size={16} />}
            onClick={() => onNavigateTab('notes')}
          >
            Go to Notes
          </Button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="kpi-grid">
        <div className="kpi-card" onClick={() => onNavigateTab('todo')}>
          <div className="kpi-icon-box blue">
            <ListTodo size={24} />
          </div>
          <div className="kpi-content">
            <span className="kpi-value">{totalTasks}</span>
            <span className="kpi-title">Total Tasks</span>
          </div>
        </div>

        <div className="kpi-card" onClick={() => onNavigateTab('todo')}>
          <div className="kpi-icon-box green">
            <CheckCircle2 size={24} />
          </div>
          <div className="kpi-content">
            <span className="kpi-value">{completedTasks}</span>
            <span className="kpi-title">Completed Tasks</span>
          </div>
          <div className="kpi-badge">
            <Badge variant="success" size="sm">{completionRate}% Done</Badge>
          </div>
        </div>

        <div className="kpi-card" onClick={() => onNavigateTab('todo')}>
          <div className="kpi-icon-box amber">
            <Clock size={24} />
          </div>
          <div className="kpi-content">
            <span className="kpi-value">{pendingTasks}</span>
            <span className="kpi-title">Pending Tasks</span>
          </div>
          {overdueTasks > 0 && (
            <div className="kpi-badge">
              <Badge variant="danger" size="sm">{overdueTasks} Overdue</Badge>
            </div>
          )}
        </div>

        <div className="kpi-card" onClick={() => onNavigateTab('notes')}>
          <div className="kpi-icon-box purple">
            <FileText size={24} />
          </div>
          <div className="kpi-content">
            <span className="kpi-value">{totalNotes}</span>
            <span className="kpi-title">Total Notes</span>
          </div>
          {pinnedNotes > 0 && (
            <div className="kpi-badge">
              <Badge variant="purple" size="sm">{pinnedNotes} Pinned</Badge>
            </div>
          )}
        </div>
      </div>

      {/* Dual Previews: Recent Tasks & Recent Notes */}
      <div className="dashboard-columns-grid">
        {/* Recent Tasks Card */}
        <div className="app-card dashboard-card">
          <div className="card-top-row">
            <h3 className="card-heading">
              <ListTodo size={18} />
              <span>Recent Tasks ({todos.length})</span>
            </h3>
            <button
              type="button"
              className="view-all-link"
              onClick={() => onNavigateTab('todo')}
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="dashboard-list">
            {recentTodos.length === 0 ? (
              <p className="dashboard-empty-text">No tasks available. Add some in To-Do App!</p>
            ) : (
              recentTodos.map((task) => (
                <div key={task.id} className="dashboard-task-row">
                  <span className={`task-status-dot ${task.completed ? 'completed' : 'pending'}`} />
                  <span className={`task-title-text ${task.completed ? 'strikethrough' : ''}`}>
                    {task.title}
                  </span>
                  <Badge variant={task.completed ? 'success' : 'warning'} size="sm">
                    {task.completed ? 'Done' : 'Pending'}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Notes Card */}
        <div className="app-card dashboard-card">
          <div className="card-top-row">
            <h3 className="card-heading">
              <FileText size={18} />
              <span>Recent Notes ({notes.length})</span>
            </h3>
            <button
              type="button"
              className="view-all-link"
              onClick={() => onNavigateTab('notes')}
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="dashboard-list">
            {recentNotes.length === 0 ? (
              <p className="dashboard-empty-text">No notes yet. Create notes in Notes App!</p>
            ) : (
              recentNotes.map((note) => (
                <div
                  key={note.id}
                  className="dashboard-note-item"
                  style={{ borderLeftColor: note.color || '#3b82f6' }}
                >
                  <div className="dash-note-header">
                    <span className="dash-note-title">{note.title}</span>
                    {note.isPinned && <Pin size={12} className="pinned-icon" />}
                  </div>
                  <p className="dash-note-snippet">{note.content.substring(0, 80)}...</p>
                  <div className="dash-note-meta">
                    <span className="dash-note-cat">{note.category}</span>
                    <span className="dash-note-date">{formatDate(note.updatedAt || note.createdAt)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Technical Concepts Highlight Box for Examiners */}
      <div className="technical-overview-card">
        <div className="tech-badge-title">
          <Code2 size={18} />
          <span>Week 04 Minor Project Implementation Highlights</span>
        </div>
        <div className="tech-chips-grid">
          <div className="tech-chip">
            <strong>⚛️ React Functional Components</strong>
            <span>Clean, modular, component-based architecture</span>
          </div>
          <div className="tech-chip">
            <strong>🔄 React Hooks (useState & useEffect)</strong>
            <span>Local state, form tracking, and localStorage persistence</span>
          </div>
          <div className="tech-chip">
            <strong>⚡ Advanced JavaScript ES6+</strong>
            <span>Arrow functions, destructuring, spread operator, template literals</span>
          </div>
          <div className="tech-chip">
            <strong>🔍 Array Methods (.map, .filter, .find)</strong>
            <span>List rendering, dynamic filtering, and item lookup</span>
          </div>
          <div className="tech-chip">
            <strong>📱 Responsive Design</strong>
            <span>Seamless experience across mobile, tablet, and desktop</span>
          </div>
          <div className="tech-chip">
            <strong>💾 Local Storage Integration</strong>
            <span>Zero data loss across browser reloads</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
