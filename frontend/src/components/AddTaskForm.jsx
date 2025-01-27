import axios from 'axios';
import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { backend_domain } from '../constant';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const AddTaskForm = () => {

    const navigate = useNavigate();
    const [tasks, setTasks] = useState([{ id: 1, value: '' }]);
    const [title,setTitle] = useState("")

    const addTask = () => {
        setTasks([...tasks, { id: Date.now(), value: '' }]);
    };

    const handleTaskChange = (id, value) => {
        setTasks(tasks.map(task => (task.id === id ? { ...task, value } : task)));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const addTaskHandler = async (e) =>{
        e.preventDefault();
        try {
            const hasEmptyTask = tasks.some((task) => task?.value?.trim() === "")
            if(hasEmptyTask){
                toast.error('Task field cannot be empty');
                return
            }
            const res = await axios.post(`${backend_domain}/api/v1/task/create-task`,{title:title,tasks:tasks},{withCredentials:true});

            toast.success(res.data.message)
            navigate('/')

        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    }

    return (
        <div className='w-full h-full p-4'>
            <h2 className='font-semibold text-xl border-b-2 border-slate-100 pb-2 mb-4'>Create New Task</h2>

            <div className="md:w-1/2">
                <form onSubmit={addTaskHandler} className='w-full'>
                    <div className="w-full flex flex-col gap-1 mb-6">
                        <label htmlFor="title" className='text-vase font-semibold'>Task Group Title</label>
                        <input id='title' value={title} onChange={(e)=>setTitle(e.target.value)} type="text" className='border-2 border-slate-200 px-3 py-1 outline-blue-500 rounded-md ' placeholder='Enter your Task title' />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <label className='text-vase font-semibold'>Add Tasks</label>
                        {tasks.map((task, index) => (
                            <div key={task.id} className="w-full flex gap-3 items-center mb-3">
                                <input
                                    type="text"
                                    className='w-full border-2 border-slate-200 px-3 py-1 outline-blue-500 rounded-md '
                                    placeholder={`Task ${index + 1}`}
                                    value={task.value}
                                    onChange={(e) => handleTaskChange(task.id, e.target.value)}
                                />
                                <div className="flex items-center gap-2">
                                    <span
                                        title='Delete task'
                                        className='cursor-pointer text-red-500'
                                        onClick={() => deleteTask(task.id)}
                                    >
                                        <MdDelete className='text-xl' />
                                    </span>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addTask}
                            className="mt-2 px-4 py-1 w-fit bg-blue-500 text-white rounded-full hover:bg-blue-600"
                        >
                            +
                        </button>
                    </div>

                    <button type='submit' className='w-full text-white py-2 bg-blue-400 mt-12'>Create Task</button>
                </form>
            </div>
        </div>
    );
};

export default AddTaskForm;