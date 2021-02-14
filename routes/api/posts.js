const express = require('express');
const { getPosts } = require('../../controllers/postControllers');

const router = express.Router();

// @route GET api/posts
// @description
// @access Public
router.get('/', getPosts);

module.exports = router;