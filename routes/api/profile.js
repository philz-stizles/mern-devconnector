const express = require('express');
const { getProfiles } = require('../../controllers/profileControllers');

const router = express.Router();

// @route GET api/profile
// @description
// @access Public
router.get('/', getProfiles);

module.exports = router;