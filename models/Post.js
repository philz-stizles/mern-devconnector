const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
    createAt: { type: Date, default: Date.now },
});

module.exports = Post = mongoose.model('Posts', PostSchema);