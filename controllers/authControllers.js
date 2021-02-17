const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');

exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400)
                .json({
                    status: false,
                    data: errors.array()
                });
        }

        const { name, email, password } = req.body;

        // See if user exists
        let existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400)
                .json({
                    status: false,
                    data: [{ msg: 'User already exists' }],
                    message: 'User already exists'
                });
        }

        // Get users gravatar
        const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save User
        const newUser = new User({ name, email, password: hashedPassword, avatar });
        await newUser.save();

        // Generate token
        const payload = {
            user: {
                id: newUser.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
            if(err) throw err;

            return res.status(201).json({
                status: true,
                data: {
                    token,
                    loggedInUser: newUser
                }
            });
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400)
                .json({
                    status: false,
                    data: errors.array()
                });
        }

        const { email, password } = req.body;

        // See if user exists
        let existingUser = await User.findOne({ email });
        if(!existingUser) {
            return res.status(400)
                .json({
                    status: false,
                    data: [{ msg: 'Invalid credentials' }],
                    message: 'Invalid credentials'
                });
        }

        // Encrypt password
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if(!isMatch) {
            return res.status(400)
                .json({
                    status: false,
                    data: [{ msg: 'Invalid credentials' }],
                    message: 'Invalid credentials'
                });
        }

        // Generate token
        const payload = {
            user: {
                id: existingUser.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
            if(err) throw err;

            delete existingUser.password; 

            return res.status(200).json({
                status: true,
                data: {
                    token,
                    loggedInUser: existingUser,
                },
                message: 'You are now logged in'
            });
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

exports.getLoggedInUser = async (req, res) => {
    try {
        console.log(req.user.id)
        const user = await User.findById(req.user.id).select('-password');
        return res.status(200).json({
            status: true,
            data: user
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}