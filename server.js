// https://github.com/bradtraversy/devconnector_2.0
// npm install express express-validator bcryptjs config gravatar jsonwebtoken mongoose request uuid
// npm install --save-dev nodemon concurrently
const express = require('express');
const connectDB = require('./db');
const { verifyJWTToken } = require('./middlewares/authMiddleware');
const path = require('path')

const app = express();

// Connect to DB
connectDB();

app.use(express.json({ extended: false }));

// Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', verifyJWTToken, require('./routes/api/profile'));
app.use('/api/posts', verifyJWTToken, require('./routes/api/posts'));

// Serve static assets in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, err => {
    console.log(`Server started on port ${PORT}`)
})