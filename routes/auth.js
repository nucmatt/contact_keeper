const express = require('express');
const router = express.Router();

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
router.post('/', (req, res) => {
    res.send('Log in user');
});

// The router MUST be exported for any routes to work.
module.exports = router;
