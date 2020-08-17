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

// @route       GET api/auth
// @desc        Get logged in user
// @access      Private
router.get('/', (req, res) => {
	res.send('Get logged in user');
});

// note that you can send both of these routes to the same endpoint since they are using different HTTP methods.
// @route       POST api/auth
// @desc        Auth user and get token
// @access      Public
// Everything in brackets here is for Express Validator again.
router.post(
	'/',
	[
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Password is required').exists(),
	],
	async (req, res) => {
        // res.send('Log in user');
        const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
        }
        
        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if(!user) {
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch) {
                return res.status(400).json({ msg: 'Invalid Credentials' })
            }

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
            res.status(500).send('Server Error');
        }
	}
);

// The router MUST be exported for any routes to work.
module.exports = router;
