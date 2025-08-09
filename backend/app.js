// backend/app.js
const express = require('express');
const cors = require('cors'); 
const app = express();
const port = 5000; 

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Import your routes 
const nftRoutes = require('./routes/nftRoutes');

// Use your product routes
app.use('/api', nftRoutes); // All routes defined in productRoutes will be prefixed with /api

// Simple root route for testing if the server is running
app.get('/', (req, res) => {
  res.send('FreshChain Backend is running!');
});

// Start the server
app.listen(port, () => {
  console.log(`FreshChain backend listening at http://localhost:${port}`);
});
