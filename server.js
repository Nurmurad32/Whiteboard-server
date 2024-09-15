const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config()
const cors = require('cors');
const bodyParser = require('body-parser');

const drawingRoutes = require('./routes/drawings');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(`${process.env.MONGODB_URI}`)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Routes
app.use('/drawings', drawingRoutes);

app.use('/', (req, res) => {
res.send("Welcome to White Board app Server ---")
});


// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
