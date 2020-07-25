const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI ||"mongodb://localhost/workout", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
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