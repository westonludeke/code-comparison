// Load environment variables
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const basicRoutes = require("./routes/index");
const authRoutes = require("./routes/authRoutes");
const snippetRoutes = require("./routes/snippetRoutes");
const compareRoutes = require("./routes/compareRoutes");
const { connectDB } = require("./config/database");
const cors = require("cors");

// Check if database connection variables are present
const connectionString = process.env.NODE_ENV === 'production'
  ? process.env.MONGODB_ATLAS_URI
  : process.env.MONGODB_LOCAL_URI;

if (!connectionString) {
  console.error("Error: Database connection string is missing in .env file.");
  process.exit(-1);
}

const app = express();
const port = process.env.PORT || 3000;
// Pretty-print JSON responses
app.enable('json spaces');
// We want to be consistent with URL paths, so we enable strict routing
app.enable('strict routing');

app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB();

app.on("error", (error) => {
  console.error(`Server error: ${error.message}`);
  console.error(error.stack);
});

// Basic Routes
app.use(basicRoutes);
// Authentication Routes
app.use('/api/auth', authRoutes);
// Snippet Routes
app.use('/api/snippets', snippetRoutes);
// Compare Routes
app.use('/api/compare', compareRoutes);

// If no routes handled the request, it's a 404
app.use((req, res, next) => {
  res.status(404).send("Page not found.");
});

// Error handling
app.use((err, req, res, next) => {
  console.error(`Unhandled application error: ${err.message}`);
  console.error(err.stack);
  res.status(500).send("There was an error serving your request.");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port} in ${process.env.NODE_ENV || 'development'} mode`);
});