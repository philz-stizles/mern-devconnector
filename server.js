// npm install express express-validator bcryptjs config gravatar jsonwebtoken mongoose request 
// npm install --save-dev nodemon concurrently
const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, err => {
    console.log(`Server started on port ${PORT}`)
})