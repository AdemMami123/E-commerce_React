const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const category= require('./routes/category');
const productRoute = require('./routes/productRoute');
const dashboard = require('./routes/dashboard');
const path = require('path');
const affiche = require('./routes/affiche');
const cart = require('./routes/cart');
const cookieParser = require("cookie-parser");




dotenv.config();

const app = express();
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true, // Allow cookies to be sent
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Use the MONGO_URI from .env file for the database connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/WebCommerce'; // Default to local if MONGO_URI is not set in .env

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to the WebCommerce database!');
}).catch((err) => {
    console.error('Error connecting to the database', err);
});

app.get("/", (req, res) => res.send("Backend is working!"));

// Use authentication routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', category);
app.use('/api/products', productRoute);
app.use('/api/dashboard',dashboard);
app.use('/api/affiche',affiche);
app.use('/api/cart',cart);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
