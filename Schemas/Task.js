

// Importing the Mongoose library for MongoDB interaction
const mongoose = require('mongoose');

// Defining the schema for the Task model
const TaskSchema = new mongoose.Schema({
    // Defining the 'name' field in the Task schema
    name: {
        type: String,
        // Ensuring that 'name' is required and providing a custom error message if not provided
        required: [true, 'Name must be provided'],
        // Trimming leading and trailing whitespaces from the 'name'
        trim: true,
        // Setting the maximum length for the 'name' field
        maxlength: [20, 'Must contain 5 characters']
    },
    // Defining the 'complete' field in the Task schema
    complete: {
        type: Boolean,
        // Setting a default value of 'false' for the 'complete' field
        default: false
    }
});

// Creating a model 'Task' based on the 'TaskSchema'
const Task = new mongoose.model('Task', TaskSchema);

// Exporting the 'Task' model for use in other files
module.exports = Task;


// another way of declaring the schema
// const Task = new mongoose.Schema({
//     name : String,
//     complete : Boolean
// })