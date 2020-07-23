// npm packages
const express = require('express');
const logger = require('morgan');

// Setting up port
const PORT = process.env.PORT || 8080;

// DB configuration
const connectDB = require('./config/db');

// Creating express app and configuring middleware
const app = express();
app.use(logger('dev')); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Requiring api and html routes
require("./routes/html-routes.js")(app);
// require("./routes/api-routes")(app); 

// Connect to MongoDB
connectDB();

// Start server and listen on specified port
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
  