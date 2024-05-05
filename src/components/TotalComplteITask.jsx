import React from 'react';
import { useSelector } from 'react-redux';

const TotalCompleteItems = () => {
    const todos = useSelector((state) =>
        state.todos.filter((todo) => todo.completed === true)
    );

    return (
        <h4 className='mt-3 text-gray-800 font-bold'>
            Total complete items: <span className='text-green-500'>{todos.length}</span>
        </h4>
    );
};

export default TotalCompleteItems;
