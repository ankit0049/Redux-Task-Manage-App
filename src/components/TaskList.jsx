import React, { useEffect } from 'react';
import TodoItem from './TaskItem';
import { useSelector, useDispatch } from 'react-redux';
import { getTodosAsync } from '../store/taskSlice';

const TodoList = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos);

    useEffect(() => {
        dispatch(getTodosAsync());
    }, [dispatch]);

    return (
        <ul className='bg-gray-100 p-4 rounded-lg'>
            {todos.map((todo) => (
                <TodoItem key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} />
            ))}
        </ul>
    );
};

export default TodoList;
