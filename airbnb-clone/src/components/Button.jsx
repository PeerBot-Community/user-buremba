import React from 'react';
import './Button.css';

/**
 * Primary Button Component - React Version
 * A reusable button component with Airbnb-style design
 */
const Button = ({
  children,
  size = 'default',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon = null,
  onClick = null,
  type = 'button',
  className = '',
  ...props
}) => {
  // Build class list
  const classes = [
    'btn-primary',
    size === 'large' && 'btn-primary--large',
    size === 'small' && 'btn-primary--small',
    fullWidth && 'btn-primary--full-width',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <>
          <span className="btn-primary__loading" />
          Loading...
        </>
      ) : (
        <>
          {icon && <span className="btn-primary__icon">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;