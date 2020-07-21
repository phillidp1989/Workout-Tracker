const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
  try {
    await mongoose.connect(config.db.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
    return true;
  } catch(err) {
    console.error('ERROR - connectDB: ', err);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;