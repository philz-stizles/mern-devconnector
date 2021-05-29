const express = require('express');
const { check } = require('express-validator');
const { 
    createOrUpdateProfile, 
    getAllProfiles, 
    getProfile, 
    getLoggedInUserProfile, 
    deleteProfile, 
    updateProfileExperience, 
    updateProfileEducation,
    deleteProfileExperience, 
    deleteProfileEducation,
    getGithubProfile
} = require('../../controllers/profileControllers');
const { verifyJWTToken } = require('./../../middlewares/authMiddleware');

const router = express.Router();

// @routes  [POST, GET] api/profile
// @desc
// @access  Private
router.route('/')
    .post([
        check('status', 'Status is required').not().isEmpty(),
        check('skills', 'Atleast a skill is required').not().isEmpty()
    ], verifyJWTToken, createOrUpdateProfile)
    .get(getAllProfiles)

// @routes  [GET] api/profile/:id
// @desc
// @access  Private
router.route('/user/:user_id')
    .get(getProfile)

    router.get('/github/:username', getGithubProfile);

// Authnticate all me routes
router.use(verifyJWTToken)

// @routes  [GET, DELETE] api/profile/me
// @desc    Get current users profile
// @access  Private
router.route('/me')
    .get(getLoggedInUserProfile)
    .delete(deleteProfile);

router.route('/me/experience')
    .put([
        check('title', 'Title is required').not().isEmpty(),
        check('company', 'Company name is required').not().isEmpty(),
        check('from', 'From date is required').not().isEmpty()
    ], updateProfileExperience)
    
router.delete('/me/experience/:id', deleteProfileExperience);

router.put('/me/education', [
        check('school', 'School is required').not().isEmpty(),
        check('degree', 'Degree is required').not().isEmpty(),
        check('fieldofstudy', 'Field is required').not().isEmpty(),
        check('from', 'From date is required').not().isEmpty()
    ], updateProfileEducation);

router.delete('/me/education/:id', deleteProfileEducation);

module.exports = router;