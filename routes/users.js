const express = require('express');
const router = express.Router();

// @route       POST api/users
// @desc        Register a user
// @access      Public
// Here the '/' refers to the api/users route, not the home page. This is because we created a route in server.js to automatically forward anything that includes api/users to this file.
router.post('/', (req, res) => {
    res.send('Register a user');
});

// The router MUST be exported for any routes to work.
module.exports = router;
