const express = require('express');
const router = express.Router();
const diff = require('diff');

// Compare two code snippets and return the differences
router.post('/', async (req, res) => {
  try {
    console.log('Received compare request');
    const { originalCode, changedCode } = req.body;

    // Validate input
    if (!originalCode || !changedCode) {
      console.log('Missing required fields for comparison');
      return res.status(400).json({
        success: false,
        message: 'Both originalCode and changedCode are required'
      });
    }

    console.log('Calculating differences between code snippets');
    // Calculate differences using the diff library
    const differences = diff.diffLines(originalCode, changedCode);

    console.log('Comparison completed successfully');
    return res.json({
      success: true,
      differences
    });
  } catch (error) {
    console.error('Error comparing code:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error comparing code snippets'
    });
  }
});

module.exports = router;