const User = require('../models/User');
const Profile = require('../models/Profile');

exports.createProfile = (req, res) => {
    return res.status(200).send('Profile Route');
}

exports.getProfile = async (req, res) => {
    try {
        const existingProfile = await Profile
            .findOne({ user: req.user.id })
            .populate('Users', ['name', 'avatar']);

        if(!existingProfile) {
            return res.status(400)
                .json({
                    status: false,
                    message: 'There is no profile for this user'
                });
        }

        return res.status(200).json({
            status: true,
            data: existingProfile
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

exports.updateProfile = (req, res) => {
    return res.status(200).send('Profile Route');
}

exports.getAllProfiles = (req, res) => {
    return res.status(200).send('Profile Route');
}