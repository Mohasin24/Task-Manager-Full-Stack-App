// Importing the Task model schema
const Task = require('../Schemas/Task');

// Controller methods for handling task-related operations

// Get all tasks
const getAllTask = async (req, res) => {
    try {
        const task = await Task.find();

        if (!task) {
            return res.status(400).json({ msg: "Something went wrong!" });
        }

        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ error });
    }
}

// Get a single task by ID
const getTask = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findById(id);

        if (!task) {
            return res.status(400).json({ msg: "Something went wrong!" });
        }

        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ error });
    }
}

// Create a new task
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);

        if (!task) {
            return res.status(400).json({ msg: "Something went wrong!" });
        }

        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ error });
    }
}

// Update a task by ID
const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
            new: true,
            runValidators: true
        });

        if (!task) {
            return res.status(400).json({ msg: "Something went wrong!" });
        }

        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ error });
    }
}

// Delete a task by ID
const deleteTask = async (req, res) => {
    try {
        const { id: taskId } = req.params;
        const task = await Task.findOneAndDelete({ _id: taskId });
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ error });
    }
}

// Delete all tasks
const deleteAllTask = async (req, res) => {
    try {
        const { deletedCount } = await Task.deleteMany({});
        res.status(200).json({ msg: `Delete count: ${deletedCount}` });
    } catch (error) {
        res.status(500).json({ error });
    }
}

// Exporting all controller methods
module.exports = {
    getAllTask,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    deleteAllTask,
};
