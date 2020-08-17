// Middleware is really just a function that has access to the request and response cycle, i.e. object.

// Bring in web token to be able to deal with the jwtoken being passed
const jwt = require('jsonwebtoken');
// Bring in config for access to the default.json file globally in the app.
const config = require('config');

// With middlware, after you have done what you want to do with the req/res object, you need to call a next function. The next function is simply what is called next, like more middleware.
module.exports = function (req, res, next) {
	// Get token from header
	const token = req.header('x-auth-token');

	// Check if not token
	if (!token) {
		// status 401 is the http error code for unauthorized access
		return res.status(401).json({ msg: 'No token, authorization denied' });
	}

	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));

		// We just want the user id out of the decoded token here
		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(401).json({ msg: 'Token in not valid' });
	}
};

// This is all for accessing protected routes. This middlware will be used in routes/auth.js for the GET request that retrieves the logged in user and their individual data.
