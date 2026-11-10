const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

//add this after connecting the mongoDB
const connectDB = require('./config/db');

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('Student Management System Backend is running!');
});

// Start server
const PORT = process.env.PORT || 5000;

/*app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
*/ //replace this with the below
const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();