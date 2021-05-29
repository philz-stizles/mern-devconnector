const { validationResult } = require('express-validator');
const request = require('request');
const config = require('config');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Post = require('../models/Post');

exports.createOrUpdateProfile = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400)
            .json({
                status: false,
                data: errors.array()
            });
    }

    const { 
        company, 
        website, 
        location, 
        bio, 
        status, 
        githubusername, 
        skills, 
        youtube, 
        facebook, 
        twitter, 
        instagram, 
        linkedin 
    } = req.body;

    // Build Profile object
    const profile = {};
    profile.user = req.user.id;
    if(company) profile.company = company
    if(website) profile.website = website
    if(location) profile.location = location;
    if(bio) profile.bio = bio;
    if(status) profile.status = status;
    if(githubusername) profile.githubusername = githubusername ;

    if(skills) {
        profile.skills = skills.split(',').map(skill => skill.trim());
    }

    profile.social = {};
    if(youtube) profile.social.youtube = youtube;
    if(facebook) profile.social.facebook = facebook;
    if(twitter) profile.social.twitter = twitter;
    if(instagram) profile.social.instagram = instagram;
    if(linkedin) profile.social.linkedin = linkedin; 

    try {
        let existingProfile = await Profile.findOne({ user: req.user.id })
        
        if(existingProfile) {
            // Update
            existingProfile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profile },
                { new: true }
            )

            return res.status(200).json({
                status: true,
                data: existingProfile,
                message: 'Profile updated successfully'
            });
        }

        // Create
        existingProfile = new Profile(profile);
        await (await existingProfile).save();

        return res.status(201).json({
            status: true,
            data: existingProfile,
            message: 'Profile created successfully'
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

exports.getLoggedInUserProfile = async (req, res) => {
    try {
        const existingProfile = await Profile
            .findOne({ user: req.user.id })
            .populate('user', ['name', 'avatar']);

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

exports.getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.status(200).json({ status: true, data: profiles });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile
            .findOne({ user: req.params.user_id })
            .populate('user', ['name', 'avatar']);

        if(!profile) {
            return res.status(404).json({
                status: false,
                message: 'Profile not found'
            });
        }

        res.status(200).json({
            status: true,
            data: profile
        });
    } catch (error) {
        console.error(error);
        if(error.kind === 'ObjectId') {
            return res.status(404).json({
                status: false,
                message: 'Profile not found'
            });
        }
        res.status(500).send('Server error');
    }
}

exports.deleteProfile = async (req, res) => {
    try {

        // Remove users posts
        await Post.deleteMany({ user: req.user.id });

        // Remove users profile
        await Profile.findOneAndRemove({ user: req.user.id });

        // Remove user
        await User.findOneAndRemove({ _id: req.user.id });

        res.status(200).json({
            status: true,
            message: 'User removed successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

exports.updateProfileExperience = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400)
            .json({
                status: false,
                data: errors.array()
            });
    }

    const { title, company, location, from, to, current, description } = req.body;

    const newExperience = { title, company, location, from, to, current, description };

    try {

        // Remove users profile
        const existingProfile = await Profile.findOne({ user: req.user.id });
        if(!existingProfile) {
            return res.status(404).json({
                status: false,
                message: 'Profile not found'
            });
        }

        existingProfile.experience.unshift(newExperience);

        await existingProfile.save();

        res.status(200).json({
            status: true,
            data: existingProfile,
            message: 'User experience updated successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

exports.deleteProfileExperience = async (req, res) => {
    try {
        const existingProfile = await Profile.findOne({ user: req.user.id });
        if(!existingProfile) {
            return res.status(404).json({
                status: false,
                message: 'Profile not found'
            });
        }

        const targetIndex = existingProfile.experience
            .map(item => item.id)
            .indexOf(req.params.id);
        
        existingProfile.experience.splice(targetIndex, 1);
        // existingProfile.experience = existingProfile.experience.filter(exp => exp._id !== req.params.id);

        await existingProfile.save();

        res.status(200).json({
            status: true,
            data: existingProfile,
            message: 'User experience deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

exports.updateProfileEducation = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400)
            .json({
                status: false,
                data: errors.array()
            });
    }

    const { school, degree, fieldofstudy, from, to, current, description } = req.body;

    const newEducation = { school, degree, fieldofstudy, from, to, current, description };

    try {

        // Remove users profile
        const existingProfile = await Profile.findOne({ user: req.user.id });
        if(!existingProfile) {
            return res.status(404).json({
                status: false,
                message: 'Profile not found'
            });
        }

        existingProfile.education.unshift(newEducation);

        await existingProfile.save();

        res.status(200).json({
            status: true,
            data: existingProfile,
            message: 'User education updated successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

exports.deleteProfileEducation = async (req, res) => {
    try {
        const existingProfile = await Profile.findOne({ user: req.user.id });
        if(!existingProfile) {
            return res.status(404).json({
                status: false,
                message: 'Profile not found'
            });
        }

        existingProfile.education = existingProfile.education.filter(item => item.id !== req.params.id);
        // const targetIndex = existingProfile.education
        //     .map(item => item.id)
        //     .indexOf(req.params.id);
        
        // existingProfile.education.splice(targetIndex, 1);

        await existingProfile.save();

        res.status(200).json({
            status: true,
            data: existingProfile,
            message: 'User education deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

exports.getGithubProfile = async (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${
                req.params.username
            }/repos?per_page=5&sort=created:asc&client_id=${
                config.get('githubClientId')
            }&client_secret=${
                config.get('githubSecret')
            }`,
            method: 'GET',
            headers: {
                'user-agent': 'node.js'
            }
        };

        request(options, (error, response, body) => {
            if(error) console.log(error);

            if(response.statusCode !== 200 ) {
                return res.status(404).json({
                    status: false,
                    message: 'No github profile found'
                });
            }

            res.status(200).json({
                status: true,
                data: JSON.parse(body),
                message: 'Github profile retrieved successfully'
            });
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}