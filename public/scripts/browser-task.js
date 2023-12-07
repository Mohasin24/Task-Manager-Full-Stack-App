/* The code is written in JavaScript and it is responsible for handling tasks in a task management
application. */

// DOM elements
const tasksDom = document.querySelector(".tasks");
const taskInput = document.querySelector(".task-input");
const formControl = document.querySelector(".form-control");
const formMsg = document.querySelector(".msg");
const taskMsg = document.querySelector(".task-msg");

// API URL
const URL = "/api/v1/tasks";

// Function to display form error message
const displayFormError = (message) => {
    formMsg.textContent = message;
    formMsg.style.color = "red";
    formMsg.style.fontSize = "18px";
    setTimeout(() => {
        formMsg.textContent = "";
    }, 2000);
};

// Function to display form success message
const displayFormSuccess = (message) => {
    formMsg.textContent = message;
    formMsg.style.color = "green";
    formMsg.style.fontSize = "18px";
    setTimeout(() => {
        formMsg.textContent = "";
    }, 2000);
};

// Function to show all tasks
const showTask = async () => {
    try {
        // Fetch tasks from the API
        const response = await axios.get(`${URL}/`);
        // Array of task objects
        const taskList = response.data.task;

        // Display a message when there are no tasks
        if (taskList.length === 0) {
            tasksDom.innerHTML = "<p class='show-msg'>There are no pending tasks</p>";
            return;
        }

        // Create HTML for all tasks
        const allTask = taskList.map((task) => {
            const { complete, name, _id: taskId } = task;
            return (
                `<div class="taskItem">
                    <p><span>Name :</span> ${name} </p>
                    <p><span>Complete :</span> ${complete} </p>
                    <div class="btn-container">
                        <a href="../edit.html?id=${taskId}" class="edit-link"><button class="edit-btn btn">Edit</button></a>
                        <button class="delete-btn btn" id="delete" data-id=${taskId}>Delete</button>
                    </div>    
                </div>`
            );
        }).join('');

        // Update the DOM with the tasks
        tasksDom.innerHTML = allTask;
    } catch (error) {
        // Display an error message if fetching tasks fails
        taskMsg.textContent = `Something went wrong! `;
    }
};

// Initial display of tasks
showTask();

// Event listener for form submission
formControl.addEventListener('submit', async (event) => {
    event.preventDefault();
    let taskNote = taskInput.value.trim();

    // Validate task input
    if (!taskNote) {
        displayFormError("Please enter a valid task!");
        return;
    }

    try {
        // Post new task to the API
        await axios.post(`${URL}/`, { name: taskNote });
        // Refresh the task list
        showTask();
        // Display success message
        displayFormSuccess("Task added successfully!");
    } catch (error) {
        // Display error message if posting fails
        const { message } = error;
        displayFormError(message);
    }

    // Clear input field
    taskInput.value = "";
});

// Event listener for deleting tasks
tasksDom.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-btn')) {
        try {
            // Get the task ID from the button's data attribute
            const taskId = event.target.dataset.id;
            // Delete the task using the API
            await axios.delete(`${URL}/${taskId}`);
            // Refresh the task list
            showTask();
            // Display success message
            taskMsg.textContent = "Deleted Successfully!";
            setTimeout(() => {
                taskMsg.textContent = "";
            }, 2000);
        } catch (error) {
            // Display error message if deletion fails
            const { message } = error;
            taskMsg.textContent = message;
            setTimeout(() => {
                taskMsg.textContent = "";
            }, 2000);
        }
    }
});
