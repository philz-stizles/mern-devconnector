const express = require('express');
const { verifyJWTToken } = require('../../middlewares/authMiddleware');
const { createProfile, getAllProfiles, getProfile, updateProfile } = require('../../controllers/profileControllers');

const router = express.Router();

// @routes  [POST, GET, PUT] api/profile
// @desc
// @access  Private
router.route('/', verifyJWTToken)
    .post(createProfile)
    .get(getAllProfiles)
    .put(updateProfile);

// @routes  [GET] api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', verifyJWTToken, getProfile)

module.exports = router;