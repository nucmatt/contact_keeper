// Brings in mongoose for mongoDB
const mongoose = require('mongoose');

// Brings in config, which was installed as a dependency in the Dependencies video. This allows you to create a default.json file that contains all your variables to be used globally in the application. All you have to do is bring in config to each file that you want to have access to the global variables located in default.json.
const config = require('config');

// Here we bring in the global variable mongoURI in default.json
const db = config.get('mongoURI');

// Here we connect to out mongoDB database with a promise. This will be refactored into async/await.
// const connectDB = () => {
// 	mongoose
// 		.connect(db, {
// 			useNewUrlParser: true,
// 			useCreateIndex: true,
//             useFindAndModify: false,
//             useUnifiedTopology: true
// 		})
//         .then(() => console.log('MongoDB Connected'))
//         .catch(err => {
//             console.error(err.message);
//             process.exit(1);
//         });
// };

const connectDB = async () => {
	try {
		mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		});

		console.log('MongoDB Connected');
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
