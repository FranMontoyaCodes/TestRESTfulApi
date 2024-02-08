const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

// In-memory array to store tasks
let tasks = [
 
];

// Generate a unique ID for tasks
let taskIdCounter = 1;

// Function to find a task by ID
function findTaskById(id) {
    return tasks.find(task => task.id === id);
}

// Route to get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Route to get a task by ID
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);

    const task = findTaskById(taskId);
    if (!task) {
        return res.status(404).json({ error: 'Task  GOT' });
    }

    res.json(task);
});

// Route to create a new task
app.post('/tasks', (req, res) => {
    const { title, status } = req.body;
    if (!title || !status) {
        return res.status(400).json({ error: 'Task POSTED' });
    }

    const newTask = {
        id: taskIdCounter++,
        title,
        status
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Route to update a task by ID
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, status } = req.body;

    let taskToUpdate = findTaskById(taskId);
    if (!taskToUpdate) {
        return res.status(404).json({ error: 'Task PUT' });
    }

    if (title) {
        taskToUpdate.title = title;
    }

    if (status) {
        taskToUpdate.status = status;
    }

    res.json(taskToUpdate);
});

// Route to delete a task by ID
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);

    const index = tasks.findIndex(task => task.id === taskId);
    if (index === -1) {
        return res.status(404).json({ error: 'ID Deleted' });
    }

    tasks.splice(index, 1);
    res.sendStatus(204);
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

// in order for postman to recieve or to be abe to interact we must first crate theese routes and have  port listening  to