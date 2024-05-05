import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';

// Load todos from localStorage
const loadTodosFromLocalStorage = () => {
  try {
    const serializedTodos = localStorage.getItem('todos');
    if (serializedTodos === null) {
      return undefined;
    }
    return JSON.parse(serializedTodos);
  } catch (err) {
    console.error('Error loading todos from localStorage:', err);
    return undefined;
  }
};

// Save todos to localStorage
const saveTodosToLocalStorage = (todos) => {
  try {
    const serializedTodos = JSON.stringify(todos);
    localStorage.setItem('todos', serializedTodos);
  } catch (err) {
    console.error('Error saving todos to localStorage:', err);
  }
};

// Create Redux store with localStorage integration
const preloadedState = loadTodosFromLocalStorage(); // Load todos from localStorage
const store = configureStore({
  reducer: {
    todos: taskReducer,
  },
  preloadedState: {
    todos: preloadedState, // Set preloaded state with loaded todos
  },
});

// Subscribe to store changes to update localStorage
store.subscribe(() => {
  const todos = store.getState().todos;
  saveTodosToLocalStorage(todos);
});

export default store;
