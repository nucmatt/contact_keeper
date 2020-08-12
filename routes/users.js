const express = require('express');
const router = express.Router();
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
	(req, res) => {
		// res.send('Register a user...');
        // res.send(req.body);
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        res.send('passed');
	}
);

// The router MUST be exported for any routes to work.
module.exports = router;
