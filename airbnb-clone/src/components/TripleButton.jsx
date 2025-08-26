import React, { useState } from 'react';

const TripleButton = () => {
  const [selected, setSelected] = useState(null);

  const buttons = [
    { id: 1, label: 'Button 1' },
    { id: 2, label: 'Button 2' },
    { id: 3, label: 'Button 3' }
  ];

  return (
    <div className="triple-button-container" style={{ display: 'flex', gap: '12px' }}>
      {buttons.map(button => (
        <button 
          key={button.id}
          onClick={() => setSelected(button.id)}
          className="choice-button"
          style={{
            padding: '12px 24px',
            backgroundColor: selected === button.id ? '#FF5A5F' : '#fff',
            color: selected === button.id ? 'white' : '#FF5A5F',
            border: '1px solid #FF5A5F',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default TripleButton;