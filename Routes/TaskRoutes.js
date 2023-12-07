// Importing the Express framework and creating a router instance
const express = require('express');
const router = express.Router();

// Importing controller methods for handling different task-related routes
const {
    getAllTask,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    deleteAllTask
} = require('../Controllers/TaskController');

// Defining routes for handling task-related operations
router.route('/')
    .get(getAllTask)    // Route for getting all tasks
    .post(createTask)   // Route for creating a new task
    .delete(deleteAllTask); // Route for deleting all tasks

router.route('/:id')
    .get(getTask)       // Route for getting a specific task by ID
    .patch(updateTask)  // Route for updating a specific task by ID
    .delete(deleteTask); // Route for deleting a specific task by ID

// Exporting the router to be used in other parts of the application
module.exports = router;
