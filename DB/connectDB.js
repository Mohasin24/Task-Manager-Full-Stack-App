// Importing the Mongoose library
const mongoose = require('mongoose');

/**
 * Function to connect to the MongoDB database using the provided URI.
 * @param {string} uri - MongoDB URI for connection.
 * @returns {Promise} - Returns a promise that resolves when the connection is established.
 */
const connectDB = (uri) => {
    // Using Mongoose to connect to the MongoDB database
    return mongoose.connect(uri);
};

// Exporting the connectDB function for external use
module.exports = connectDB;
