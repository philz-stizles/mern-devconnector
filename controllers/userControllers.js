const { validationResult } = require('express-validator');
const User = require('../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

exports.createUser = async (req, res) => {
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
                    loggedInUser: {
                        name: newUser.name,
                        email: newUser.email,
                        avatar: newUser.avatar
                    }
                },
                message: 'Sign up completed successfully'
            });
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).send({
            status: true,
            data: users
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        return res.status(200).send({
            status: true,
            data: user
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}