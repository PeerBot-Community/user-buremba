// Sample JavaScript file demonstrating basic functionality
const sampleData = {
  name: "Sample App",
  version: "1.0.0",
  features: ["authentication", "data processing", "API integration"]
};

function greetUser(name = "User") {
  return `Hello, ${name}! Welcome to ${sampleData.name}`;
}

function processData(data) {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid data provided');
  }
  
  return {
    processed: true,
    timestamp: new Date().toISOString(),
    data: data
  };
}

class SampleService {
  constructor(config = {}) {
    this.config = {
      debug: false,
      timeout: 5000,
      ...config
    };
  }

  async fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (this.config.debug) {
        console.error('Fetch error:', error);
      }
      throw error;
    }
  }

  log(message) {
    if (this.config.debug) {
      console.log(`[${new Date().toISOString()}] ${message}`);
    }
  }
}

// Example usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    sampleData,
    greetUser,
    processData,
    SampleService
  };
} else {
  // Browser environment
  window.SampleUtils = {
    sampleData,
    greetUser,
    processData,
    SampleService
  };
}

// Demo execution
console.log(greetUser("Developer"));
console.log("Sample data:", sampleData);