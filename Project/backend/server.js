// Project/backend/server.js
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
dotenv.config();

// Connect to MongoDB using environment variable
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Configure CORS to allow credentials from frontend
app.use(cors({ 
  origin: 'http://localhost:5173', // Vite default port
  credentials: true
}));

app.use(express.json());

// Improve session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    sameSite: 'lax',
    // In production, set secure: true
    secure: process.env.NODE_ENV === 'production'
  }
}));

// Authentication middleware to protect routes
const authMiddleware = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

// Apply auth middleware to protected routes
app.use('/api/users', authMiddleware, require('./routes/users'));
app.use('/api/products', authMiddleware, require('./routes/products'));
app.use('/api/stock', authMiddleware, require('./routes/stock'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));