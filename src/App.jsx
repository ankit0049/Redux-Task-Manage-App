import React from 'react';
import AddTodoForm from './components/TaskInput.jsx';
import TodoList from './components/TaskList.jsx';
import TotalCompleteItems from './components/TotalComplteITask.jsx';

const App = () => {
	return (
		<div className='container mx-auto bg-white p-4 mt-5 rounded shadow-lg'>
			<h1 className="text-3xl font-bold mb-4 text-center">My Todo List</h1>
			<AddTodoForm />
			<TodoList />
			<TotalCompleteItems />
		</div>
	);
};

export default App;
