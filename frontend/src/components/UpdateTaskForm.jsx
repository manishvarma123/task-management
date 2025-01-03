import React, { useEffect, useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { setOpenUpdateTask } from '../redux/slices/taskSlice.js';
import axios from 'axios';
import { backend_domain } from '../constant.js';
import { toast } from 'react-toastify';

const UpdateTaskForm = () => {
    const { selectedTask, openUpdateTask } = useSelector((state) => state.task);
    const dispatch = useDispatch();
    const [task, setTask] = useState('');

    // Sync task state with selectedTask when selectedTask changes
    useEffect(() => {
        setTask(selectedTask?.taskTitle || '');
    }, [selectedTask]);

    const updateTaskHandler = async () => {
        try {
            await axios.put(
                `${backend_domain}/api/v1/task/updated-task/${selectedTask?._id}`,
                { updatedTask: task },
                { withCredentials: true }
            );

            dispatch(setOpenUpdateTask(false));
            toast.success("Task updated successfully!");
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to update task.');
        }
    };

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
