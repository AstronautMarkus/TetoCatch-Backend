// Import dependencies
const express = require('express');
const { igdl } = require('btch-downloader');

const app = express();
const PORT = 3001;

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
  
      // Filtra los datos relevantes
      const response = {
        title: data.title || 'No Title',
        thumbnail: data.thumbnail || '',
        downloadLink: data.url || '',
      };
  
      res.json(response);
    } catch (error) {
      console.error('Error downloading reel:', error);
      res.status(500).json({ error: 'Failed to fetch reel data' });
    }
  });
  
  

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
