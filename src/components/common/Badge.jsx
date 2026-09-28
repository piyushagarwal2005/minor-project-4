import React from 'react';

/**
 * Reusable Badge Component
 * Demonstrates: Component Reusability, Props, Conditional Classes, ES6+ Template Literals
 */
const Badge = ({ children, variant = 'neutral', size = 'md', className = '' }) => {
  return (
    <span className={`badge badge-${variant} badge-${size} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
