import React, { useState } from 'react';

const TestButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleTestAction = async (option) => {
    setSelectedOption(option);
    setIsLoading(true);
    try {
      const res = await fetch('/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'test', option })
      });
      
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: 'Failed to execute test action' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="test-button-container">
      {['Option 1', 'Option 2', 'Option 3'].map((option) => (
        <button 
          key={option}
          onClick={() => handleTestAction(option)}
          disabled={isLoading}
          className="test-button"
          style={{
            padding: '12px 24px',
            backgroundColor: selectedOption === option ? '#E61E4D' : '#FF5A5F',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.6 : 1,
            transition: 'all 0.3s ease',
            margin: '0 8px'
          }}
        >
          {isLoading && selectedOption === option ? 'Processing...' : option}
      </button>
      
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