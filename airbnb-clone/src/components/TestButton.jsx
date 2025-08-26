import React, { useState } from 'react';

const TestButton = () => {
  const [isLoading, setIsLoading] = useState('');
  const [response, setResponse] = useState(null);

  const handleAction = async (action) => {
    setIsLoading(action);
    try {
      const res = await fetch('/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action })
      });
      
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: `Failed to execute ${action} action` });
    } finally {
      setIsLoading('');
    }
  };

  return (
    <div className="test-button-container" style={{ display: 'flex', gap: '10px' }}>
      {['Action 1', 'Action 2', 'Action 3'].map(action => (
        <button 
          key={action}
          onClick={() => handleAction(action)}
          disabled={isLoading}
          className="test-button"
          style={{
            padding: '12px 24px',
            backgroundColor: '#FF5A5F',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading === action ? 0.6 : 1,
            transition: 'all 0.3s ease'
          }}
        >
          {isLoading === action ? 'Processing...' : action}
        </button>
      ))}
      
      {response && (
        <div 
          className="response-display"
          style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: response.error ? '#ffebee' : '#e8f5e8',
            border: `1px solid ${response.error ? '#f44336' : '#4caf50'}`,
            borderRadius: '4px',
            fontSize: '14px'
          }}
        >
          {response.error ? (
            <span style={{ color: '#d32f2f' }}>{response.error}</span>
          ) : (
            <span style={{ color: '#2e7d32' }}>
              {response.message || JSON.stringify(response)}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default TestButton;