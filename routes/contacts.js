const express = require('express');
const router = express.Router();

// @route       GET api/contacts
// @desc        Get all user's contacts
// @access      Private
router.get('/', (req, res) => {
    res.send('Get all user\'s contacts');
});

// @route       POST api/contacts
// @desc        Add new contacts
// @access      Private
router.post('/', (req, res) => {
    res.send('Add contact');
});

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
