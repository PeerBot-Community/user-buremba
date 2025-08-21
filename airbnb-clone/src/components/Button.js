/**
 * Primary Button Component
 * A reusable button component with Airbnb-style design
 */

const Button = {
  // CSS styles for the button
  styles: `
    .btn-primary {
      background: linear-gradient(135deg, #FF385C 0%, #E31C5F 100%);
      color: white;
      border: none;
      border-radius: 8px;
      padding: 14px 24px;
      font-size: 16px;
      font-weight: 600;
      font-family: 'Circular', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 48px;
      min-width: 120px;
      outline: none;
      position: relative;
      overflow: hidden;
    }

    .btn-primary:hover {
      background: linear-gradient(135deg, #E31C5F 0%, #BC1A52 100%);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 8px 25px rgba(0, 0, 0, 0.15);
      transform: translateY(-1px);
    }

    .btn-primary:active {
      transform: translateY(0);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .btn-primary:disabled {
      background: #F7F7F7;
      color: #ABABAB;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    .btn-primary:focus {
      outline: none;
      box-shadow: 0 0 0 2px #FF385C33;
    }

    .btn-primary--large {
      padding: 16px 32px;
      font-size: 18px;
      min-height: 56px;
    }

    .btn-primary--small {
      padding: 8px 16px;
      font-size: 14px;
      min-height: 36px;
      min-width: 80px;
    }

    .btn-primary--full-width {
      width: 100%;
    }

    .btn-primary__icon {
      margin-right: 8px;
      display: inline-flex;
      align-items: center;
    }

    .btn-primary__loading {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `,

  // Create button element
  create: function(options = {}) {
    const {
      text = 'Button',
      size = 'default', // 'small', 'default', 'large'
      fullWidth = false,
      disabled = false,
      loading = false,
      icon = null,
      onClick = null,
      type = 'button',
      className = '',
      id = null
    } = options;

    const button = document.createElement('button');
    button.type = type;
    button.textContent = text;
    button.disabled = disabled || loading;
    
    if (id) button.id = id;

    // Build class list
    let classes = ['btn-primary'];
    if (size === 'large') classes.push('btn-primary--large');
    if (size === 'small') classes.push('btn-primary--small');
    if (fullWidth) classes.push('btn-primary--full-width');
    if (className) classes.push(className);
    
    button.className = classes.join(' ');

    // Add icon if provided
    if (icon && !loading) {
      const iconElement = document.createElement('span');
      iconElement.className = 'btn-primary__icon';
      iconElement.innerHTML = icon;
      button.insertBefore(iconElement, button.firstChild);
    }

    // Add loading spinner if loading
    if (loading) {
      const loadingElement = document.createElement('span');
      loadingElement.className = 'btn-primary__loading';
      button.insertBefore(loadingElement, button.firstChild);
      button.textContent = ' Loading...';
    }

    // Add click handler
    if (onClick) {
      button.addEventListener('click', onClick);
    }

    return button;
  },

  // Initialize styles in document
  init: function() {
    if (typeof document !== 'undefined') {
      const styleElement = document.createElement('style');
      styleElement.textContent = this.styles;
      document.head.appendChild(styleElement);
    }
  }
};

// For Node.js/CommonJS environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Button;
}

// For browser environments
if (typeof window !== 'undefined') {
  window.Button = Button;
}