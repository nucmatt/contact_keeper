const express = require('express');
const router = express.Router();
// Any time we are protecting a route we need to bring in our auth middlware
const auth = require('../middleware/auth');
// Bring in express validator for error checking of the post requests received
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route       GET api/contacts
// @desc        Get all user's contacts
// @access      Private
router.get('/', auth, async (req, res) => {
	// res.send('Get all user\'s contacts');
	try {
		// The auth middleware decodes the user object and we can then access that user object for it's unique id via the find method. The sort method just allows us to sort the data to be presented to the user. date: -1 sets it so that the list is sorted by newest contact first.
		const contacts = await Contact.find({ user: req.user.id }).sort({
			date: -1,
		});
		res.json(contacts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route       POST api/contacts
// @desc        Add new contacts
// @access      Private
router.post(
	'/',
	[auth, [check('name', 'Name is required').not().isEmpty()]],
	async (req, res) => {
		// res.send('Add contact');
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// Destructuring!
		const { name, email, phone, type } = req.body;

		try {
			// remember you have access to the user object via the auth middleware so you can assign the user's id to this contact to complete the Contact Schema.
			const newContact = new Contact({
				name,
				email,
				phone,
				type,
				user: req.user.id,
			});

			// save method puts the newly created contact into the database.
			const contact = await newContact.save();
			// Then we return the contact back to the user so it is displayed in their contacts.
			res.json(contact);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// PUT updates an existing entry. To update the entry correctly you need to provide an identifier. That is what the /:id will be, the identifier for the contact to be updated.
// @route       PUT api/contacts/:id
// @desc        Update contact
// @access      Private
router.put('/:id', (req, res) => {
	res.send('Update contact');
});

// @route       DELETE api/contacts/:id
// @desc        delete contact
// @access      Private
router.delete('/:id', (req, res) => {
	res.send('Delete contact');
});

// The router MUST be exported for any routes to work.
module.exports = router;
