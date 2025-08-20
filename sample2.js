// Sample2.js - Another example file
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Sample routes
app.get('/', (req, res) => {
    res.json({ 
        message: 'Hello from Sample2!', 
        timestamp: new Date().toISOString() 
    });
});

app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        uptime: process.uptime(),
        version: '2.0.0'
    });
});

app.post('/api/echo', (req, res) => {
    res.json({ 
        received: req.body,
        echo: `You sent: ${JSON.stringify(req.body)}`
    });
});

// Start server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Sample2 server running on port ${PORT}`);
    });
}

module.exports = app;