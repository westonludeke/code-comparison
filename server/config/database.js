const mongoose = require('mongoose');

const connectDB = async () => {
  // Determine which connection string to use based on environment
  const connectionString = process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_ATLAS_URI
    : process.env.MONGODB_LOCAL_URI;

  if (!connectionString) {
    console.error('Error: Database connection string is not defined in environment variables');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(connectionString);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${process.env.NODE_ENV === 'production' ? 'MongoDB Atlas' : 'Local MongoDB'}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { connectDB };