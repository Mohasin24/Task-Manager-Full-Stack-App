// Importing the Express framework
const express = require('express');

// Creating an instance of the Express application
const app = express();

// Importing the connectDB function for establishing a connection to MongoDB
const connectDB = require('./DB/connectDB');

// Importing the taskRoutes for handling task-related routes
const taskRoutes = require('./Routes/TaskRoutes');

// Configuring environment variables using dotenv
require('dotenv').config();

// Setting the port for the Express application
const port = 4500;

// Retrieving the MongoDB URI from the environment variables
const uri = process.env.MONGO_URI;

// Serving static files from the "public" directory
app.use(express.static("./public"));

// Parsing JSON request bodies
app.use(express.json());

// Handling task-related routes using the taskRoutes
app.use('/api/v1/tasks', taskRoutes);

/**
 * Function to start the Express application after connecting to the MongoDB database.
 */
const start = async () => {
    try {
        // Establishing a connection to the MongoDB database
        await connectDB(uri);

        // Starting the Express application and listening on the specified port
        app.listen(port, () => {
            console.log(`Listening on the port ${port}`);
        });
    } catch (err) {
        console.log(err);
    }
};

// Calling the start function to initiate the application
start();
