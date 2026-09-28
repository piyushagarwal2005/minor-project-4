import React from 'react';

/**
 * Reusable Button Component
 * Demonstrates: Component Reusability, Props Destructuring, Default Parameters, Event Handling
 */
const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // primary | secondary | danger | ghost | outline | success
  size = 'md',         // sm | md | lg
  disabled = false,
  icon = null,
  className = '',
  title = '',
  ...rest
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`btn btn-${variant} btn-${size} ${className}`}
      {...rest}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children && <span>{children}</span>}
    </button>
  );
};

export default Button;
