const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const API_KEY = process.env.API_KEY;

// Available OTC assets
const assets = [
  'Litecoin (OTC)', 'EU50 (OTC)', 'Ronin (OTC)',
  'IOTA (OTC)', 'Nike Inc (OTC)', 'Snap Inc (OTC)',
  'US 100 (OTC)', 'Jupiter (OTC)', 'Sandbox (OTC)'
];

// Serve static files from 'public' folder
app.use(express.static('public'));

// API: Realistic signal generator
app.get('/api/signal', async (req, res) => {
  try {
    const randomAsset = assets[Math.floor(Math.random() * assets.length)];
    const signal = {
      asset: randomAsset,
      signal: Math.random() > 0.5 ? 'CALL' : 'PUT',
      score: Math.floor(Math.random() * 41) + 60, // Score 60–100
      liveRate: (Math.random() * 0.5 + 1.1).toFixed(4),
      keyUsed: API_KEY
    };
    res.json(signal);
  } catch (err) {
    res.status(500).json({ error: 'API request failed' });
  }
});

// Fallback for index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
