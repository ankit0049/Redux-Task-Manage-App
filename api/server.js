import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import bodyParser from 'body-parser';
import { nanoid } from 'nanoid';

dotenv.config({ path: '.env' });

const app = express();

app.use(cors());
app.use(bodyParser.json());

let todos = [
    {
        id: nanoid(),
        title: 'todo 1',
        completed: true,
    },
];

// GET all todos
app.get('/todos', (req, res) => res.send(todos));

// POST a new todo
app.post('/todos', (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).send({ error: 'Title is required' });
    }
    const todo = { title, id: nanoid(), completed: false };
    todos.push(todo);
    return res.send(todo);
});

// PATCH/update a todo by ID
app.patch('/todos/:id', (req, res) => {
    const id = req.params.id;
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
        return res.status(404).send({ error: 'Todo not found' });
    }

    // Update only the provided fields in the request body
    todos[index] = { ...todos[index], ...req.body };

    // Send back the updated todo
    return res.send(todos[index]);
});


// DELETE a todo by ID
app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    const index = todos.findIndex((todo) => todo.id === id);
    if (index > -1) {
        todos.splice(index, 1);
    }

    res.send(todos);
});

const PORT = 7000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.green.bold));
