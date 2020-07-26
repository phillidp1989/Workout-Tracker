require('dotenv').config();

// Database uri stored in .env file and accessed using the dotenv npm package

module.exports = {
    db: {
        uri: process.env.DB_URI
    }
};