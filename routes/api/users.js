const express = require('express');
const { check } = require('express-validator');
const {
  createUser,
  getAllUsers,
  getUser,
} = require('../../controllers/userControllers');

const router = express.Router();

// @route   GET api/users
// @desc    Test Route
// @access  Public
router
  .route('/')
  .post(
    [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check(
        'password',
        'Please enter a password with 6 or more characters'
      ).isLength({ min: 6 }),
    ],
    createUser
  )
  .get(getAllUsers);

router.route('/:id').get(getUser);

module.exports = router;
