const express = require('express');
const { register } = require('../../controllers/authControllers');

const router = express.Router();

// @route GET api/auth
// @description
// @access Public
router.get('/register', register);

module.exports = router;