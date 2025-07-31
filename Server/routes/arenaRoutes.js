const express = require('express');
const router = express.Router();
const arenaController = require('../controllers/arenaController');

// POST route for form submission
router.post('/join-arena', arenaController.submitForm);

module.exports = router;