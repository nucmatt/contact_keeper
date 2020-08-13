const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
// Bring in JSON web token for protecting routes
const jwt = require('jsonwebtoken');
// Bring in the secret for the JWT from the config file default.json
const config = require('config');
// Bring in express validator for error checking of the post requests received
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route       POST api/users
// @desc        Register a user
// @access      Public
// Here the '/' refers to the api/users route, not the home page. This is because we created a route in server.js to automatically forward anything that includes api/users to this file.
router.post(
	'/',
	// Everything in brackets here is for express validator. Don't forget to write the errors part of the validation below!
	[
		check('name', 'Please add a name').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check(
			'password',
			'Please enter a password with 6 or more characters'
		).isLength({ min: 6 }),
	],
	async (req, res) => {
		// res.send('Register a user...');
		// res.send(req.body);
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		//  res.send('passed');

		// Parse the body of the request
		// Destructuring!
		const { name, email, password } = req.body;

		try {
			// Here we check to see the entered email address already exists in the database. findOne is a Mongoose method. ES6 allows us to just enter email instead of email: email.
			let user = await User.findOne({ email });

			// If email already exists, return a bad request with a message
			if (user) {
				return res.status(400).json({ msg: 'User already exists' });
			}

			// Create new User object (brought in from User model) if email is unique
			user = new User({
				name,
				email,
				password,
			});

			// This is for hashing the user's password. BCrypt requires a salt variable to tell it how many passes to hash the password. More hashes (the number in parentheses) means more security. Note that genSalt returns a promise so you must use await since we are using async/await instead of promises.
			const salt = await bcrypt.genSalt(10);

			// Here we hash the user object's password before adding it to the database.
			user.password = await bcrypt.hash(password, salt);

			await user.save();

			// This was a place holder just to give feedback that a user was registered. Now that is verified so we move on to create the web token and protect the route.
			// res.send('User saved');

			// Here we a creating the payload for the JWT. We will use a user id to identify the user to the server database and retrieve that user's contacts.
			const payload = {
				user: {
					id: user.id,
				},
			};

			// Creating the JWT for protecting the route by creating a unique id for the user when they log in. The sign method takes in the payload of data, the secret for generating the protection, a options object, a callback
			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{
					expiresIn: 360000,
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

// The router MUST be exported for any routes to work.
module.exports = router;
