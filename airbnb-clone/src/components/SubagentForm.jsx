import React, { useState } from 'react';

const SubagentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tools: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/subagents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: 'Failed to create subagent' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleToolsChange = (e) => {
    const tools = e.target.value.split(',').map(tool => tool.trim());
    setFormData({
      ...formData,
      tools
    });
  };

  return (
    <div className="subagent-form">
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '400px'
      }}>
        <div>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '8px' }}>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          />
        </div>

        <div>
          <label htmlFor="description" style={{ display: 'block', marginBottom: '8px' }}>Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              minHeight: '100px'
            }}
          />
        </div>

        <div>
          <label htmlFor="tools" style={{ display: 'block', marginBottom: '8px' }}>Tools (comma-separated):</label>
          <input
            type="text"
            id="tools"
            name="tools"
            value={formData.tools.join(', ')}
            onChange={handleToolsChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          />
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          style={{
            padding: '12px 24px',
            backgroundColor: '#FF5A5F',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.6 : 1,
            transition: 'all 0.3s ease'
          }}
        >
          {isLoading ? 'Creating...' : 'Create Subagent'}
        </button>
      </form>

      {response && (
        <div style={{
          marginTop: '16px',
          padding: '12px',
          backgroundColor: response.error ? '#ffebee' : '#e8f5e8',
          border: `1px solid ${response.error ? '#f44336' : '#4caf50'}`,
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          {response.error ? (
            <span style={{ color: '#d32f2f' }}>{response.error}</span>
          ) : (
            <span style={{ color: '#2e7d32' }}>
              Subagent created successfully
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SubagentForm;