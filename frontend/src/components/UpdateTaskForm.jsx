import React, { useEffect, useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { setOpenUpdateTask } from '../redux/slices/taskSlice.js';
import axios from 'axios';
import { backend_domain } from '../constant.js';
import { toast } from 'react-toastify';
import { MdFileUpload } from "react-icons/md";
import { FaImage } from "react-icons/fa";
import { resetUser } from '../redux/slices/userSlice.js';
import api from '../api/task.js'

const UpdateTaskForm = () => {
    const { selectedTask, openUpdateTask } = useSelector((state) => state.task);
    const dispatch = useDispatch();
    const [task, setTask] = useState('');
    const [taskImg, setTaskImg] = useState('')
    const { user } = useSelector((state) => state.user);

    // Sync task state with selectedTask when selectedTask changes
    useEffect(() => {
        setTask(selectedTask?.taskTitle || '');
        setTaskImg(selectedTask?.taskImg || '')
    }, [selectedTask]);

    const updateTaskHandler = async () => {
        try {
            let data = { updatedTask: task, updatedTaskImg: taskImg }
            // await axios.put(
            //     `${backend_domain}/api/v1/task/updated-task/${selectedTask?._id}`,
            //     { updatedTask: task, updatedTaskImg: taskImg },
            //     {
            //         headers: {
            //             'userId': user?._id
            //         },
            //         withCredentials: true
            //     }
            // );

            await api.updateTask(selectedTask._id, data)

            dispatch(setOpenUpdateTask(false));
            toast.success("Task updated successfully!");
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to update task.');
            if (error?.response?.status === 401) {
                dispatch(resetUser());
                dispatch({ type: 'LOGOUT_USER' });
            }
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const fileType = file.type.split('/')[0];
            if (fileType !== 'image') {
                toast.error('Please select an image file.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setTaskImg(reader.result);
            };
            reader.readAsDataURL(file)

            const formData = new FormData();
            formData.append('taskImg', file)

            uploadImage(formData)
        }
    }

    const uploadImage = async (formData) => {
        try {
            const res = await axios.post(`${backend_domain}/api/v1/task/upload-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'userId': user?._id
                },
                withCredentials: true
            });
            if (res.data.data) {
                console.log(res.data.data);

                setTaskImg(res.data.data)
            }
        } catch (error) {
            toast.error('Error uploading image', error)
            if (error?.response?.status === 401) {
                dispatch(resetUser());
                dispatch({ type: 'LOGOUT_USER' });
            }
        }
    }

    return (
        <div className={`${openUpdateTask ? "fixed" : "hidden"} top-0 bottom-0 right-0 left-0 p-4 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center`}>
            <div className="w-full max-w-[500px] bg-white rounded-lg p-4 pb-7">
                <div className="flex justify-between items-center border-b-2 border-slate-200 pb-2 mb-6">
                    <h1 className="text-base font-semibold">Edit Task</h1>
                    <span
                        onClick={() => dispatch(setOpenUpdateTask(false))}
                        className="flex justify-center items-center bg-slate-300 rounded-full p-2 cursor-pointer"
                    >
                        <RxCross2 className="text-xl" />
                    </span>
                </div>

                <div className="flex flex-col gap-1 mb-6">
                    <label htmlFor="add" className="font-semibold">Task</label>
                    <input
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        type="text"
                        id="add"
                        className="border-2 border-slate-300 rounded-md px-3 py-2"
                        placeholder="Enter your task"
                    />
                </div>
                <div className="flex flex-col gap-1 mb-6">
                    <h3 className="font-semibold">Task Image</h3>
                    <div className="flex items-end gap-3">
                        <span className='w-16 h-16 bg-slate-50 border-2 border-slate-400 rounded-sm'>
                            {
                                taskImg ? (
                                    <img src={taskImg} alt="task_img" className='w-full h-full' />
                                ) : (
                                    <FaImage className='w-full h-full' />
                                )
                            }

                        </span>
                        <label htmlFor="img" className='w-6 h-6 rounded-full bg-slate-300'>
                            <span className='w-full h-full flex justify-center items-center cursor-pointer'>
                                <MdFileUpload />
                            </span>
                        </label>
                        <input id='img' onChange={(e) => handleFileChange(e, selectedTask?._id)} type='file' className='hidden' />
                    </div>

                </div>

                <div className="w-full">
                    <button
                        onClick={updateTaskHandler}
                        className="bg-blue-500 text-white py-1.5 w-full m-auto"
                    >
                        Update task
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateTaskForm;
