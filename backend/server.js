const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');
const connectDB = require('./utils/db');
const { startMonitoring } = require('./services/geofenceMonitor');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // In production, restrict this to your dashboard's URL
    methods: ["GET", "POST"]
  }
});

// Global state for socket connections
global.io = io;

io.on('connection', (socket) => {
  console.log('A user connected to WebSocket:', socket.id);

  // Join a room based on user role if provided (e.g., dashboard staff)
  socket.on('join-dashboard', () => {
    console.log(`Socket ${socket.id} joining dashboard room.`);
    socket.join('dashboard-room');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Start the geofence monitoring service
  startMonitoring();
});
