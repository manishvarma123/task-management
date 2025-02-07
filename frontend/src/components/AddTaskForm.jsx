import axios from 'axios';
import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { backend_domain } from '../constant';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { RiUpload2Fill } from "react-icons/ri";
import { resetUser } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api/task.js'

const AddTaskForm = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([{ id: 1, value: '', taskImg: '' }]);
    const [title, setTitle] = useState("")
    const { user } = useSelector((state) => state.user);

    const addTask = () => {
        setTasks([...tasks, { id: Date.now(), value: '', taskImg: '' }]);
    };

    const handleTaskChange = (id, value) => {
        setTasks(tasks.map(task => (task.id === id ? { ...task, value } : task)));
    };

    const handleFileChange = (e, id) => {
        const file = e.target.files[0];
        if (file) {

            const fileType = file.type.split('/')[0];
            if (fileType !== 'image') {
                toast.error('Please select an image file.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setTasks(tasks.map(task => (task.id === id ? { ...task, taskImg: reader.result } : task)));
            };
            reader.readAsDataURL(file);

            const formData = new FormData();
            formData.append('taskImg', file);

            uploadImage(formData, id);
        }
        console.log(file)

    }

    const uploadImage = async (formData, id) => {
        try {
            const res = await axios.post(`${backend_domain}/api/v1/task/upload-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'userId': user?._id,
                },
                withCredentials: true
            });

            // const res = await api.uploadImage(formData)
            console.log('Image uploaded successfully: ', res.data?.data)
            if (res.data.data) {
                setTasks(tasks.map(task => (task.id === id ? { ...task, taskImg: res.data.data } : task)))
            }
            console.log(tasks)
        } catch (error) {
            toast.error('Error uploading image', error)
            if (error?.response?.status === 401) {
                dispatch(resetUser());
                dispatch({ type: 'LOGOUT_USER' });
            }
        }
    }

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const addTaskHandler = async (e) => {
        e.preventDefault();
        try {
            const hasEmptyTask = tasks.some((task) => task?.value?.trim() === "")
            if (hasEmptyTask) {
                toast.error('Task field cannot be empty');
                return
            }

            const data = { title: title, tasks: tasks }
            // const res = await axios.post(`${backend_domain}/api/v1/task/create-task`, { title: title, tasks: tasks }, {
            //     headers : {
            //         'userId' : user?._id
            //     },
            //     withCredentials: true 
            // });

            const res = await api.createTask(data)

            toast.success(res.data.message)
            navigate('/')

        } catch (error) {
            toast.error(error.response?.data?.message)
            if (error?.response?.status === 401) {
                dispatch(resetUser());
                dispatch({ type: 'LOGOUT_USER' });
            }
        }
    }



    return (
        <div className='w-full h-full p-4'>
            <h2 className='font-semibold text-xl border-b-2 border-slate-100 pb-2 mb-4'>Create New Task</h2>

            <div className="md:w-1/2">
                <form onSubmit={addTaskHandler} className='w-full'>
                    <div className="w-full flex flex-col gap-1 mb-6">
                        <label htmlFor="title" className='text-vase font-semibold'>Task Group Title</label>
                        <input id='title' value={title} onChange={(e) => setTitle(e.target.value)} type="text" className='border-2 border-slate-200 px-3 py-1 outline-blue-500 rounded-md ' placeholder='Enter your Task title' />
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
                                <div className='w-12 h-10 bg-slate-100 border-2 border-slate-500 rounded-md flex justify-center items-center'>
                                    <label htmlFor={`file-upload-${task.id}`} className="cursor-pointer w-full h-full flex justify-center items-center">
                                        {task.taskImg ? (
                                            <img src={task.taskImg} alt="Preview" className='w-full h-full' />
                                        ) : (
                                            <RiUpload2Fill className='w-4 h-4' />
                                        )}

                                        <input id={`file-upload-${task.id}`} onChange={(e) => handleFileChange(e, task.id)} type='file' className='hidden' />
                                    </label>
                                </div>
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