const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    type: { type: String, default: 'personal' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }
}, { timestamps: true });

module.exports = Contact = mongoose.model('Contacts', ContactSchema);