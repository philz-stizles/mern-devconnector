const { validationResult } = require('express-validator/check');
const gravatar = require('gravatar');

exports.createUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty){
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
        password = await bcrypt.hash(password, salt);

        // Save User
        const newUser = new User({ name, email, password, gravatar });
        await newUser.save();

        // Generate token

        
        return res.status(201).json({
            status: true,
            data: {
                loggedInUser: newUser
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}

exports.getUsers = (req, res) => {
    return res.status(200).send('User Route');
}