import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleCompleteAsync, deleteTodoAsync, updateTodoAsync } from '../store/taskSlice';

const TodoItem = ({ id, title, completed }) => {
    const dispatch = useDispatch();
    const [isChecked, setIsChecked] = useState(completed);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(title);

    useEffect(() => {
        setIsChecked(completed);
        setUpdatedTitle(title);
    }, [completed, title]);

    const handleCheckboxClick = () => {
        setIsChecked(!isChecked);
        dispatch(toggleCompleteAsync({ id, completed: !isChecked }));
    };

    const handleDeleteClick = () => {
        dispatch(deleteTodoAsync({ id }));
    };

    const handleUpdateClick = () => {
        setIsEditing(true);
    };

    const handleTitleChange = (event) => {
        setUpdatedTitle(event.target.value);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        dispatch(updateTodoAsync({  id , title: updatedTitle, completed: isChecked }));
    };

    return (
        <li className={`border rounded-lg p-4 mb-4 flex items-center justify-between ${isChecked ? 'bg-green-100' : 'bg-white'}`}>
            <div className='flex items-center'>
                <input
                    type='checkbox'
                    className='mr-3'
                    checked={isChecked}
                    onChange={handleCheckboxClick}
                />
                {isEditing ? (
                    <input
                        type='text'
                        value={updatedTitle}
                        onChange={handleTitleChange}
                        className='border border-gray-300 p-1 rounded-md outline-none'
                    />
                ) : (
                    <span className={isChecked ? 'line-through' : ''}>{title}</span>
                )}
            </div>
            <div className='flex'>
                {isEditing ? (
                    <button onClick={handleSaveClick} className='px-4 py-2 bg-blue-500 text-white rounded-md mr-2'>
                        Save
                    </button>
                ) : (
                    <button onClick={handleUpdateClick} className='px-4 py-2 bg-gray-500 text-white rounded-md mr-2'>
                        Update
                    </button>
                )}
                <button onClick={handleDeleteClick} className='px-4 py-2 bg-red-500 text-white rounded-md'>
                    Delete
                </button>
            </div>
        </li>
    );
};

export default TodoItem;
