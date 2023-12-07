/* The code is performing the following tasks: */

// Extracting task ID from the URL parameters
const params = window.location.search;
const taskId = new URLSearchParams(params).get('id');

// DOM elements
const editId = document.getElementById("task-id");
const editName = document.getElementById("input-task");
const editComplete = document.getElementById("completed");
const submitDOM = document.getElementById("submit-btn");
const formDOM = document.querySelector(".form-container");
const updateMsg = document.querySelector(".msg");

// API URL
const URL = "/api/v1/tasks";

// Function to display error message
const displayError = (message) => {
    updateMsg.textContent = message;
    updateMsg.style.color = "red";
    setTimeout(() => {
        updateMsg.textContent = "";
    }, 2000);
};

// Function to display success message
const displaySuccess = (message) => {
    updateMsg.textContent = message;
    updateMsg.style.color = "green";
    setTimeout(() => {
        updateMsg.textContent = "";
    }, 2000);
};

// Function to fetch and display the task details
const showTask = async () => {
    try {
        // Fetch task details from the API
        const { data: { task } } = await axios.get(`${URL}/${taskId}`);
        
        // Extract task properties
        const { _id: id, name, complete } = task;

        // Display task details in the form
        editId.textContent = id;
        editName.value = name;

        // Check the checkbox based on task completion status
        editComplete.checked = complete;
    } catch (error) {
        // Display error message if fetching task details fails
        displayError("Something went wrong!");
    }
};

// Initial display of task details
showTask();

// Event listener for form submission
formDOM.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Extract values from the form
    const newName = editName.value.trim();
    const checkbox = editComplete.checked;

    // Create an object with updated values
    const updatedObj = {
        name: newName,
        complete: checkbox
    };

    try {
        // Update the task using the PATCH request
        await axios.patch(`${URL}/${taskId}`, updatedObj);
        
        // Display success message
        displaySuccess("Updated successfully!");
    } catch (error) {
        // Display error message if updating the task fails
        displayError("Something went wrong!");
    }
});
