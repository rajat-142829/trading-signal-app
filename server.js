const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// API key from environment
const API_KEY = process.env.API_KEY;

// Serve static files from 'public' folder
app.use(express.static('public'));

// API route for signal
app.get('/api/signal', async (req, res) => {
  try {
    const signal = {
      asset: 'EUR/USD',
      signal: Math.random() > 0.5 ? 'CALL' : 'PUT',
      score: Math.floor(Math.random() * 100),
      liveRate: (Math.random() * 2 + 1.1).toFixed(4),
      keyUsed: API_KEY
    };
    res.json(signal);
  } catch (err) {
    res.status(500).json({ error: 'API request failed' });
  }
});

// Fallback route: if no route matches, send index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
