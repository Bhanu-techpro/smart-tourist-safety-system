const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

// Initialize Express app
const app = express();

// Middlewares
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(helmet()); // Set various HTTP headers for security
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Serve static files (e.g., for uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tourist', require('./routes/tourist'));
app.use('/api/emergency', require('./routes/emergency'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/incidents', require('./routes/incident'));
app.use('/api/geofence', require('./routes/geofence'));

// Simple health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

// Global error handler
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
