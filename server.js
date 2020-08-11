// server.js is the entry point to the backend for the project.

// this brings in the Express server module
const express = require('express');

// here we initialize the Express server
const app = express();

// the '/' references the home page and the get method takes in a request and a response object. The response can be many things such as a string, json, html, etc.
// app.get('/', (req, res) => res.send('Hello World'));
app.get('/', (req, res) => res.json({ msg: 'Welcome to the ContactKeeper API...'}))

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// the PORT variable will be the port that the server listens on for requests. Here we set it to an environment variable OR port 5000. Remember that the environment variables are not seen by anything but the local environment the files are stored on.
const PORT = process.env.PORT || 5000;

// the listen method gives the server a port to listen on for communcations. Here the port is set to a variable(above) and brought in to the method.
// Template literals in the console log to use variables!
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
