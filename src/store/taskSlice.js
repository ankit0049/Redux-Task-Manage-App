import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

// Async thunk action to fetch todos
export const getTodosAsync = createAsyncThunk(
    'todos/getTodosAsync',
    async () => {
        const resp = await fetch('http://localhost:7000/todos');
        if (resp.ok) {
            const todos = await resp.json();
            return { todos };
        }
    }
);

// Async thunk action to add a new todo
export const addTodoAsync = createAsyncThunk(
    'todos/addTodoAsync',
    async (payload) => {
        const resp = await fetch('http://localhost:7000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: payload.title }),
        });

        if (resp.ok) {
            const todo = await resp.json();
            return { todo };
        }
    }
);

// Async thunk action to toggle todo completion
export const toggleCompleteAsync = createAsyncThunk(
    'todos/completeTodoAsync',
    async (payload) => {
        const resp = await fetch(`http://localhost:7000/todos/${payload.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: payload.completed }),
        });

        if (resp.ok) {
            const todo = await resp.json();
            return { todo };
        }
    }
);

// Async thunk action to delete a todo
export const deleteTodoAsync = createAsyncThunk(
    'todos/deleteTodoAsync',
    async (payload) => {
        const resp = await fetch(`http://localhost:7000/todos/${payload.id}`, {
            method: 'DELETE',
        });

        if (resp.ok) {
            return { id: payload.id };
        }
    }
);

// Async thunk action to update a todo
// Async thunk action to update a todo
export const updateTodoAsync = createAsyncThunk(
    'todos/updateTodoAsync',
    async (payload) => {
        const { id, title, completed } = payload;
        try {
            const resp = await fetch(`http://localhost:7000/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, completed }), // Include title and completed in the request body
            });

            if (!resp.ok) {
                throw new Error('Failed to update todo');
            }

            const todo = await resp.json();
            return { todo };
        } catch (error) {
            // Handle the error
            console.error('Error updating todo:', error.message);
            throw error; // Rethrow the error to be caught by the component
        }
    }
);


// Async thunk action to clear all todos
export const clearTodosAsync = createAsyncThunk(
    'todos/clearTodosAsync',
    async () => {
        const resp = await fetch(`http://localhost:7000/todos/clear`, {
            method: 'DELETE',
        });

        if (resp.ok) {
            return { todos: [] };
        }
    }
);

// Function to save todos to localStorage
const saveTodosToLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

// Todo slice
export const todoSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                title: action.payload.title,
                completed: false,
            };
            state.push(todo);
            saveTodosToLocalStorage(state);
        },
        toggleComplete: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id);
            state[index].completed = action.payload.completed;
            saveTodosToLocalStorage(state);
        },
        deleteTodo: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id);
            state.splice(index, 1);
            saveTodosToLocalStorage(state);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTodosAsync.fulfilled, (state, action) => {
                return action.payload.todos;
            })
            .addCase(addTodoAsync.fulfilled, (state, action) => {
                state.push(action.payload.todo);
                saveTodosToLocalStorage(state);
            })
            .addCase(toggleCompleteAsync.fulfilled, (state, action) => {
                const updatedTodo = action.payload.todo;
                if (updatedTodo) {
                    const index = state.findIndex((todo) => todo.id === updatedTodo.id);
                    if (index !== -1) {
                        state[index].completed = updatedTodo.completed;
                        saveTodosToLocalStorage(state);
                    }
                }
            })
            .addCase(deleteTodoAsync.fulfilled, (state, action) => {
                const index = state.findIndex((todo) => todo.id === action.payload.id);
                state.splice(index, 1);
                saveTodosToLocalStorage(state);
            })
            .addCase(updateTodoAsync.fulfilled, (state, action) => {
                const updatedTodo = action.payload.todo;
                if (updatedTodo) {
                    const index = state.findIndex((todo) => todo.id === updatedTodo.id);
                    if (index !== -1) {
                        state[index].title = updatedTodo.title;
                        state[index].completed = updatedTodo.completed;
                        saveTodosToLocalStorage(state);
                    }
                }
            })
            .addCase(clearTodosAsync.fulfilled, (state, action) => {
                return action.payload.todos;
            });
    },
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
