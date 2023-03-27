// Imports
const express = require('express');

// Initialization
const router = express.Router();

router.use((req, res) => {
  if (req.accepts('html')) {
    res.status(200).send('Welcome to the Ecommerce RESTful API!');
  } else if (req.accepts('json')) {
    res.json({ message: 'Welcome to the Ecommerce RESTful API!' });
  } else {
    res.type('txt').send('Welcome to the Ecommerce RESTful API!');
  }
});

module.exports = router;
