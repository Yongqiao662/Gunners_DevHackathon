const nftRoutes = require('./routes/nftRoutes');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Placeholder route
app.use('/api/nft', nftRoutes);
app.get('/', (req, res) => {
  res.send('FreshChain Backend Running');
});

const PORT = process.env.PORT || 5000;
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
