import React, { useState } from 'react';

const SubagentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'assistant',
    isActive: true,
    capabilities: [],
    settings: {
      responseStyle: 'balanced',
      maxTokens: 2000,
      temperature: 0.7
    },
    instructions: ''
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

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [name]: value
      }
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
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to create subagent');
      }

      setSuccess(true);
      setFormData({
        name: '',
        description: '',
        type: 'assistant',
        isActive: true,
        capabilities: [],
        settings: {
          responseStyle: 'balanced',
          maxTokens: 2000,
          temperature: 0.7
        },
        instructions: ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formStyles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    field: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
    },
    label: {
      fontWeight: 500,
    },
    input: {
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    textarea: {
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      minHeight: '100px',
    },
    select: {
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      opacity: loading ? 0.7 : 1,
    },
    error: {
      color: 'red',
      marginTop: '10px',
    },
    success: {
      color: 'green',
      marginTop: '10px',
    }
  };

  return (
    <div style={formStyles.container}>
      <form onSubmit={handleSubmit} style={formStyles.form}>
        <div style={formStyles.field}>
          <label style={formStyles.label}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={formStyles.input}
          />
        </div>

        <div style={formStyles.field}>
          <label style={formStyles.label}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={formStyles.textarea}
          />
        </div>

        <div style={formStyles.field}>
          <label style={formStyles.label}>Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            style={formStyles.select}
          >
            <option value="assistant">Assistant</option>
            <option value="task_bot">Task Bot</option>
            <option value="support">Support</option>
          </select>
        </div>

        <div style={formStyles.field}>
          <label style={formStyles.label}>Response Style</label>
          <select
            name="responseStyle"
            value={formData.settings.responseStyle}
            onChange={handleSettingsChange}
            style={formStyles.select}
          >
            <option value="balanced">Balanced</option>
            <option value="concise">Concise</option>
            <option value="detailed">Detailed</option>
          </select>
        </div>

        <div style={formStyles.field}>
          <label style={formStyles.label}>Max Tokens</label>
          <input
            type="number"
            name="maxTokens"
            value={formData.settings.maxTokens}
            onChange={handleSettingsChange}
            style={formStyles.input}
          />
        </div>

        <div style={formStyles.field}>
          <label style={formStyles.label}>Temperature</label>
          <input
            type="number"
            name="temperature"
            value={formData.settings.temperature}
            onChange={handleSettingsChange}
            min="0"
            max="1"
            step="0.1"
            style={formStyles.input}
          />
        </div>

        <div style={formStyles.field}>
          <label style={formStyles.label}>Instructions</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            style={formStyles.textarea}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={formStyles.button}
        >
          {loading ? 'Creating...' : 'Create Subagent'}
        </button>

        {error && <div style={formStyles.error}>{error}</div>}
        {success && <div style={formStyles.success}>Subagent created successfully!</div>}
      </form>
    </div>
  );
};

export default SubagentForm;