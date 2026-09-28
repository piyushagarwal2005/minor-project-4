// ============================================================================
// dateUtils.js - Date formatting and calculation helpers
// Demonstrates: ES6+ Arrow Functions, Template Literals, Destructuring
// ============================================================================

/**
 * Format an ISO date or timestamp into a clean, human-readable string.
 * @param {string|number|Date} dateInput 
 * @param {boolean} includeTime 
 * @returns {string}
 */
export const formatDate = (dateInput, includeTime = false) => {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '';

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...(includeTime && { hour: '2-digit', minute: '2-digit' }),
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
};

/**
 * Check if a given due date string is in the past (overdue).
 * @param {string} dueDateString - YYYY-MM-DD format
 * @returns {boolean}
 */
export const isOverdue = (dueDateString) => {
  if (!dueDateString) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(dueDateString);
  due.setHours(0, 0, 0, 0);

  return due < today;
};

/**
 * Check if a given due date is today.
 * @param {string} dueDateString - YYYY-MM-DD format
 * @returns {boolean}
 */
export const isDueToday = (dueDateString) => {
  if (!dueDateString) return false;
  const today = new Date();
  const due = new Date(dueDateString);

  return (
    today.getFullYear() === due.getFullYear() &&
    today.getMonth() === due.getMonth() &&
    today.getDate() === due.getDate()
  );
};

/**
 * Returns today's date formatted as YYYY-MM-DD for HTML date inputs.
 * @returns {string}
 */
export const getTodayDateInputFormat = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
