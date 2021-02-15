const express = require('express');
const { check } = require('express-validator');
const { register, login, getLoggedInUser } = require('../../controllers/authControllers');
const { verifyJWTToken } = require('../../middlewares/authMiddleware');

const router = express.Router();

// @route GET api/auth/register
// @description
// @access Public
router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], register);

// @route GET api/auth/login
// @description
// @access Public
router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please is required').exists()
], login);

// @route GET api/auth/login
// @description
// @access Public
router.get('/getLoggedInUser', verifyJWTToken, getLoggedInUser);

module.exports = router;