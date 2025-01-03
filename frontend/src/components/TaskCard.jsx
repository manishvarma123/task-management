import React from 'react'
import { FaCheck } from "react-icons/fa";
import { MdDelete, MdDone } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import { useNavigate } from 'react-router';
import axios from 'axios';
import { backend_domain } from '../constant';
import { useDispatch, useSelector } from 'react-redux';
import { setAllTasks } from '../redux/slices/taskSlice';

const TaskCard = ({ task }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { allTasks } = useSelector(state => state.task)
    const totalTask = task.tasks?.length;
    const completedTask = task?.tasks?.filter((task) => task.status === "completed").length
    const percent = ((completedTask / totalTask) * 100).toFixed(2)

    const deleteTaskHandler = async () => {
        try {
            const res = await axios.get(`${backend_domain}/api/v1/task/delete-taskGroup/${task?._id}`, { withCredentials: true })

            dispatch(setAllTasks(allTasks?.filter(tsk => tsk._id !== task?._id)))
            toast.success(res.data?.message)
        } catch (error) {
            console.log(error?.response?.data?.message)
        }
    }
    return (
        <div className="w-full max-w-[300px] h-[200px] overflow-y-hidden shadow-lg border-2 border-slate-200 bg-slate-50 rounded-lg relative">
            <div onClick={() => {
                navigate(`/task/${task?._id}`)
            }} className="w-full">
                <div className="flex justify-between items-center gap-2 px-2 py-1.5 border-b-2 border-slate-200">
                    <h1 className='font-semibold text-base truncate'>{task?.taskGroupTitle} ({task?.tasks.length})</h1>
                    <span className='flex items-center gap-1'>
                        <span className='text-xs font-semibold text-slate-400'>{percent}%</span>
                        <span className='w-5 h-5 rounded-full bg-green-500 flex justify-center items-center p-1'><FaCheck /></span>
                    </span>
                </div>
                <div className="">

                    {
                        task.tasks?.length < 1 ?
                            <p>No task is added yet</p> :
                            task.tasks.map((task) => {
                                return (
                                    <div key={task?._id} className="flex items-center gap-2 px-2 py-1.5 border-b-2 border-slate-200">
                                        <span className={`w-5 h-5 rounded-full flex justify-center items-center ${task?.status === "completed" ? "bg-yellow-400" : "bg-slate-200"}`}>{task?.status === "completed" ? <MdDone /> : null}</span>
                                        <span className={`${task?.status === "completed" ? "line-through" : ""} text-xs truncate`}>{task?.taskTitle}</span>
                                    </div>
                                )
                            })
                    }


                </div>
            </div>
            <div className="w-full absolute bottom-0 right-0 left-0 h-8 bg-white border-t-2 border-dashed flex items-center justify-end">
                <div className="flex justify-end items-center gap-4 px-4">
                    <span title='View all tasks' onClick={() => {
                        navigate(`/task/${task?._id}`)
                    }} className='cursor-pointer text-green-500'><FaEdit /></span>
                    {/* <span title='Edit tasks' className='cursor-pointer text-green-500'><FaEdit /></span> */}
                    <span title='Delete task' onClick={deleteTaskHandler} className='cursor-pointer text-red-500'><MdDelete /></span>


                </div>
            </div>
        </div>
    )
}

export default TaskCard