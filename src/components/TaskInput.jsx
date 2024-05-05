import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoAsync } from '../store/taskSlice';

const AddTodoForm = () => {
    const [value, setValue] = useState('');
    const dispatch = useDispatch();

    const onSubmit = (event) => {
        event.preventDefault();
        if (value) {
            // Dispatch the action to add the todo
            dispatch(addTodoAsync({ title: value }));
            
            // Clear the input field
            setValue('');
        }
    };

    return (
        <form onSubmit={onSubmit} className='flex justify-center mt-6'>
            <input
                type='text'
                className='border rounded-l-md py-2 px-4 outline-none focus:border-blue-500'
                placeholder='Add todo...'
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />

            <button type='submit' className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-md'>
                Add
            </button>
        </form>
    );
};

export default AddTodoForm;
