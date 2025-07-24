const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

const API_KEY = process.env.API_KEY;

app.use(express.static('public'));

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

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
