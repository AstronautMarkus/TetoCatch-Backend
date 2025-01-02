// Import dependencies
const express = require('express');
const cors = require('cors');
const { igdl } = require('btch-downloader');

const app = express();
const PORT = 3001;

// Middleware to enable CORS
app.use(cors());

// Middleware to process JSON
app.use(express.json());

// Route to handle downloads
app.post('/reel', async (req, res) => {
    const { url } = req.body;
  
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }
  
    try {
        const data = await igdl(url);
        console.log('Raw Data:', data); // Log raw data for debugging
        res.json(data); // Return raw response
    } catch (error) {
        console.error('Error downloading reel:', error);
        res.status(500).json({ error: 'Failed to fetch reel data' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
