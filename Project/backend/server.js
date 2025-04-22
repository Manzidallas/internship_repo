const express = require('express');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const app = express();
dotenv.config();

mongoose.connect('mongodb://127.0.0.1/stock', { useNewUrlParser: true, useUnifiedTopology: true, })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false, }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/api/stock', require('./routes/stock'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
