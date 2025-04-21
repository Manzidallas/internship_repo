const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost/stock', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schemas
const userSchema = new mongoose.Schema({
  user_id: { type: String, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }, // 'admin' or 'user'
});

const productSchema = new mongoose.Schema({
  product_id: { type: String, unique: true },
  product_name: { type: String, required: true },
});

const stockSchema = new mongoose.Schema({
  product_id: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Stock = mongoose.model('Stock', stockSchema);

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access token required' });

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// Helper to generate user_id and product_id
const generateId = (prefix, length) => {
  return prefix + Math.random().toString(36).substr(2, length);
};

// Routes
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

  const token = jwt.sign({ user_id: user.user_id, role: user.role }, 'your_jwt_secret', { expiresIn: '6h' });
  res.json({ token, role: user.role });
});

// Get all users (Admin only)
app.get('/api/users', authenticateToken, isAdmin, async (req, res) => {
  const users = await User.find({}, 'user_id username');
  res.json(users);
});

// Add a new user (Admin only)
app.post('/api/users', authenticateToken, isAdmin, async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    user_id: generateId('USR', 8),
    username,
    password: hashedPassword,
  });

  await user.save();
  res.status(201).json({ message: 'User created' });
});

// Get all products and their stock quantities
app.get('/api/products', authenticateToken, async (req, res) => {
  const products = await Product.find();
  const stocks = await Stock.find();

  const result = products.map(product => {
    const stock = stocks.find(s => s.product_id === product.product_id);
    return {
      product_id: product.product_id,
      product_name: product.product_name,
      quantity: stock ? stock.quantity : 0,
    };
  });

  res.json(result);
});

// Stock in a product (Admin only)
app.post('/api/stock/in', authenticateToken, isAdmin, async (req, res) => {
  const { product_name, quantity } = req.body;

  let product = await Product.findOne({ product_name });
  if (!product) {
    product = new Product({
      product_id: generateId('PRD', 8),
      product_name,
    });
    await product.save();
  }

  let stock = await Stock.findOne({ product_id: product.product_id });
  if (stock) {
    stock.quantity += quantity;
    await stock.save();
  } else {
    stock = new Stock({
      product_id: product.product_id,
      quantity,
    });
    await stock.save();
  }

  res.status(201).json({ message: 'Stock updated' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));