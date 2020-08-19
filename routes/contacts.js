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
router.put('/:id', auth, async (req, res) => {
	// res.send('Update contact');
	const { name, email, phone, type } = req.body;

	// Build contact object from fields submitted
	const contactFields = {};
	if (name) contactFields.name = name;
	if (email) contactFields.email = email;
	if (phone) contactFields.phone = phone;
	if (type) contactFields.type = type;

	try {
		// The findById method takes in an id. Here we access the request parameter id from the put update path.
		let contact = await Contact.findById(req.params.id);

		// Remember status 404 is not found.
		if (!contact) return res.status(404).json({ msg: 'Contact not found' });

		// Make sure user owns the contact to be updated by comparing their logged in id to the contact's user data type.
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Not authorized' });
		}

		// Now you can update the contact after verification of above. Not sure which technology uses the $set. Not explained in video.
		contact = await Contact.findByIdAndUpdate(
			req.params.id,
			{ $set: contactFields },
			{ new: true }
		);

		// Response includes the updated contact to update the user's contacts in the UI.
		res.json(contact);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route       DELETE api/contacts/:id
// @desc        delete contact
// @access      Private
router.delete('/:id', auth, async (req, res) => {
    // res.send('Delete contact');
    try {
		// The findById method takes in an id. Here we access the request parameter id from the put update path.
		let contact = await Contact.findById(req.params.id);

		// Remember status 404 is not found.
		if (!contact) return res.status(404).json({ msg: 'Contact not found' });

		// Make sure user owns the contact to be deleted by comparing their logged in id to the contact's user data type.
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Not authorized' });
		}

		// Now you can delete the contact after verification of above.
		await Contact.findByIdAndRemove(req.params.id);

		// Response includes the deleted contact to update the user's contacts in the UI.
		res.json({ msg: 'Contact removed' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// The router MUST be exported for any routes to work.
module.exports = router;
