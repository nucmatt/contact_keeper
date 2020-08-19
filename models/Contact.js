// MongoDB requires a model for each set of data to be used in the database.

// here we bring in mongoose as a manager for MongoDB
const mongoose = require('mongoose');

// Create a schema using mongoose. This is the model used for the User database entries
const ContactSchema = mongoose.Schema({
    // Each user has their own set of contacts so we need to identify the user as part of the Contact data scheme
    user: {
        // Each user object carries its own unique id and mongoose gives a way to set the data type as that ObjectId
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    type: {
        type: String,
        default: 'personal'
    },
    date: {
        type: Date,
        default: Date.now
    },
});

// Remember to export for MongoDB! This is then brought in to the contacts.js route.
module.exports = mongoose.model('Contact', ContactSchema);
