import React, { useState } from 'react';

export default function SelectableButtons() {
  const [selected, setSelected] = useState(null);

  const buttons = [
    { id: 1, label: 'Option 1' },
    { id: 2, label: 'Option 2' },
    { id: 3, label: 'Option 3' },
  ];

  const buttonStyle = (isSelected) => ({
    padding: '12px 24px',
    backgroundColor: isSelected ? '#FF5A5F' : 'white',
    color: isSelected ? 'white' : '#FF5A5F',
    border: '2px solid #FF5A5F',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    margin: '0 8px',
    transition: 'all 0.3s ease'
  });

  return (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
      {buttons.map((button) => (
        <button
          key={button.id}
          style={buttonStyle(selected === button.id)}
          onClick={() => setSelected(button.id)}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
}