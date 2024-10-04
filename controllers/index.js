const express = require('express');
const router = express.Router();

// Import routes from the api.js file

const apiRoutes = require('./api/api');

// Set up API routes at /api

router.use('/api', apiRoutes);

// Add more routes here as needed (collab with Jessikah)

router.get('/', (req, res) => {
  res.render('homepage');  
});

router.use((req, res) => {
    res.status(404).render('404');  
  });

// Export the router

module.exports = router;
