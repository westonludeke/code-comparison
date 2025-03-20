const express = require('express');
const router = express.Router();
const CodeSnippet = require('../models/CodeSnippet');
const { verifyAccessToken } = require('../utils/auth');

// Middleware to verify token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Auth header received:', authHeader);
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log('No token provided in request');
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    console.log('Attempting to verify token');
    const userId = verifyAccessToken(token);
    console.log('Token verified successfully, userId:', userId);
    req.userId = userId;
    next();
  } catch (error) {
    console.error('Authentication error details:', error.message);
    return res.status(403).json({ message: 'Invalid access token' });
  }
};

// Save code snippet
router.post('/', authenticateToken, async (req, res) => {
  try {
    console.log('Saving new code snippet');
    const { name, code } = req.body;

    if (!name || !code) {
      console.log('Missing required fields for snippet');
      return res.status(400).json({
        success: false,
        message: 'Name and code are required fields'
      });
    }

    const snippet = new CodeSnippet({
      name,
      code,
      userId: req.userId
    });

    await snippet.save();
    console.log(`Snippet "${name}" saved successfully for user ${req.userId}`);

    res.status(201).json({
      success: true,
      message: 'Snippet saved successfully',
      snippet
    });
  } catch (error) {
    console.error('Error saving snippet:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving snippet'
    });
  }
});

// Get user's snippets
router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log(`Fetching snippets for user ${req.userId}`);
    const snippets = await CodeSnippet.find({ userId: req.userId });
    console.log(`Retrieved ${snippets.length} snippets`);
    res.json({ snippets });
  } catch (error) {
    console.error('Error fetching snippets:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching snippets'
    });
  }
});

module.exports = router;