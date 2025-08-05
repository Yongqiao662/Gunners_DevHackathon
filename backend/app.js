// backend/app.js
const express = require('express');
const cors = require('cors'); // Import cors for cross-origin requests
const app = express();
const port = 5000; // The port your frontend is trying to connect to

// Middleware to enable CORS (Cross-Origin Resource Sharing)
// This is essential for your frontend (running on a different port/origin)
// to be able to make requests to your backend.
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Import your routes (we'll create this next)
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
