// MongoDB requires a model for each set of data to be used in the database.

// here we bring in mongoose as a manager for MongoDB
const mongoose = require('mongoose');

// Create a schema using mongoose. This is the model used for the User database entries
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

// Remember to export for MongoDB! Here we are exporting this js file AND the database model created for User, UserSchema. This is then brought in to the users.js route.
module.exports = mongoose.model('User', UserSchema);
