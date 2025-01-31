const express = require('express');
const router = express.Router();

// Route for the home page
router.route('/')
  .get((req, res) => {
    res.render('index', { message: 'Welcome to our Backend App!' });
  });

module.exports = router;