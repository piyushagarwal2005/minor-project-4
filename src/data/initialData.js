// ============================================================================
// initialData.js - Initial starter data for To-Do and Notes applications
// Demonstrates: Object manipulation, ES6+ arrays, objects, and template literals
// ============================================================================

export const INITIAL_TODOS = [
  {
    id: 'todo-1',
    title: 'Complete Week 04 Minor Project in React',
    description: 'Implement To-Do App and Notes App with state, hooks, and clean responsive UI.',
    completed: false,
    dueDate: '2026-09-30',
    priority: 'high',
    category: 'Study',
    createdAt: '2026-09-28T10:00:00.000Z',
  },
  {
    id: 'todo-2',
    title: 'Review React Hooks: useState & useEffect',
    description: 'Understand dependency arrays, side effects, and state immutability.',
    completed: true,
    dueDate: '2026-09-27',
    priority: 'medium',
    category: 'Study',
    createdAt: '2026-09-26T14:30:00.000Z',
  },
  {
    id: 'todo-3',
    title: 'Prepare GitHub repository and comprehensive README',
    description: 'Document project overview, features, tech stack, and setup instructions.',
    completed: false,
    dueDate: '2026-10-01',
    priority: 'high',
    category: 'Work',
    createdAt: '2026-09-28T11:15:00.000Z',
  },
  {
    id: 'todo-4',
    title: 'Buy groceries & coffee beans for study sessions',
    description: 'Fresh milk, arabica coffee beans, apples, and whole grain bread.',
    completed: false,
    dueDate: '2026-09-29',
    priority: 'low',
    category: 'Personal',
    createdAt: '2026-09-28T09:00:00.000Z',
  },
  {
    id: 'todo-5',
    title: 'Read ES6+ destructuring & spread operator documentation',
    description: 'Deep dive into object and array rest/spread patterns and clean code practices.',
    completed: true,
    dueDate: '2026-09-25',
    priority: 'low',
    category: 'Study',
    createdAt: '2026-09-25T08:00:00.000Z',
  },
];

export const INITIAL_NOTES = [
  {
    id: 'note-1',
    title: 'React Fundamentals Key Takeaways',
    content: '1. Components are the building blocks of React UI.\n2. State represents data that changes over time; never mutate state directly.\n3. Props allow data passing from parent to child.\n4. useEffect manages side effects (localStorage sync, document titles, timers).\n5. Use unique keys for list rendering with .map().',
    category: 'Study',
    color: '#e0f2fe', // sky blue
    isPinned: true,
    createdAt: '2026-09-27T16:20:00.000Z',
    updatedAt: '2026-09-28T09:15:00.000Z',
  },
  {
    id: 'note-2',
    title: 'Project Architecture Ideas',
    content: 'Create a unified workspace where students can switch between To-Do App and Notes App.\nInclude quick stats, localStorage persistence, category filters, and polished modal dialogs for a professional developer portfolio.',
    category: 'Ideas',
    color: '#fef3c7', // amber/warm yellow
    isPinned: true,
    createdAt: '2026-09-28T12:00:00.000Z',
    updatedAt: '2026-09-28T14:40:00.000Z',
  },
  {
    id: 'note-3',
    title: 'Sprint Planning & Submission Checklist',
    content: '- [x] Functional components with JSX\n- [x] State management using useState\n- [x] Side effects using useEffect\n- [x] Responsive layout on mobile and desktop\n- [x] Full README documentation\n- [ ] Push clean commits to GitHub',
    category: 'Work',
    color: '#dcfce7', // emerald green
    isPinned: false,
    createdAt: '2026-09-28T13:00:00.000Z',
    updatedAt: '2026-09-28T13:00:00.000Z',
  },
  {
    id: 'note-4',
    title: 'Favorite Web Development Resources',
    content: '1. React Official Docs: react.dev\n2. MDN Web Docs for JavaScript ES6+ specifications\n3. CSS Tricks & Flexbox Froggy for layout mastery\n4. Lucide React for crisp SVG iconography.',
    category: 'Personal',
    color: '#f3e8ff', // soft purple
    isPinned: false,
    createdAt: '2026-09-26T18:00:00.000Z',
    updatedAt: '2026-09-27T11:00:00.000Z',
  },
];

export const NOTE_CATEGORIES = ['All', 'Work', 'Personal', 'Study', 'Ideas'];

export const NOTE_COLORS = [
  { name: 'Sky Blue', value: '#e0f2fe', border: '#7dd3fc' },
  { name: 'Warm Amber', value: '#fef3c7', border: '#fcd34d' },
  { name: 'Fresh Mint', value: '#dcfce7', border: '#86efac' },
  { name: 'Soft Purple', value: '#f3e8ff', border: '#d8b4fe' },
  { name: 'Rose Blush', value: '#ffe4e6', border: '#fda4af' },
];
