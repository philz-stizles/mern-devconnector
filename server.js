// https://github.com/bradtraversy/devconnector_2.0
// npm install express express-validator bcryptjs config gravatar jsonwebtoken mongoose request 
// npm install --save-dev nodemon concurrently
const express = require('express');
const connectDB = require('./db');

const app = express();

// Connect to DB
connectDB();

app.use(express.json({ extended: false }));

// Routes
app.use('api/auth', require('./routes/api/auth'));
app.use('api/users', require('./routes/api/users'));
app.use('api/profile', require('./routes/api/profile'));
app.use('api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, err => {
    console.log(`Server started on port ${PORT}`)
})