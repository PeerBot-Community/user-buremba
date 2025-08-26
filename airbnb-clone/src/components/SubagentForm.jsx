import React, { useState } from 'react';

const SubagentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    capabilities: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/subagents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create subagent');
      }
      
      setSuccess(true);
      setFormData({
        name: '',
        description: '',
        type: '',
        capabilities: []
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ color: '#484848', marginBottom: '20px' }}>Create Subagent</h2>
      
      {error && (
        <div style={{ color: '#FF5A5F', marginBottom: '20px' }}>
          {error}
        </div>
      )}
      
      {success && (
        <div style={{ color: '#008489', marginBottom: '20px' }}>
          Subagent created successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label 
            htmlFor="name"
            style={{ display: 'block', marginBottom: '5px', color: '#484848' }}
          >
            Name
          </label>
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
              border: '1px solid #EBEBEB',
              borderRadius: '4px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label 
            htmlFor="description"
            style={{ display: 'block', marginBottom: '5px', color: '#484848' }}
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #EBEBEB',
              borderRadius: '4px',
              minHeight: '100px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label 
            htmlFor="type"
            style={{ display: 'block', marginBottom: '5px', color: '#484848' }}
          >
            Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #EBEBEB',
              borderRadius: '4px'
            }}
          >
            <option value="">Select a type</option>
            <option value="general-purpose">General Purpose</option>
            <option value="statusline-setup">Statusline Setup</option>
            <option value="output-style-setup">Output Style Setup</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: '#FF5A5F',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Creating...' : 'Create Subagent'}
        </button>
      </form>
    </div>
  );
};

export default SubagentForm;