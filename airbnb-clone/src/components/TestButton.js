const React = require('react');

const TestButton = ({ onClick, text = 'Test Button', loading = false }) => {
  return (
    <button 
      onClick={onClick}
      disabled={loading}
      className={`px-4 py-2 rounded-md transition-colors ${
        loading 
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
      } text-white font-semibold`}
    >
      {loading ? 'Testing...' : text}
    </button>
  );
};

module.exports = TestButton;