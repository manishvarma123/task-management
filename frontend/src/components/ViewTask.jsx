import React, { useEffect } from 'react';
import { FaCheck, FaEdit } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { backend_domain } from '../constant';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenUpdateTask, setSelectedTask, setTaskDetails } from '../redux/slices/taskSlice.js';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { MdDelete, MdDone } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaImage } from "react-icons/fa";

const ViewTask = () => {
    const dispatch = useDispatch();
    const {openUpdateTask} = useSelector(state=> state.task)
    const navigate = useNavigate();
    const { id } = useParams();
    const { taskDetails } = useSelector(state => state.task)
    const totalTask = taskDetails?.tasks?.length;
    const completedTask = taskDetails?.tasks?.filter((task) => task.status === "completed").length
    const percent = ((completedTask / totalTask) * 100).toFixed(2)

    useEffect(() => {

        fetchTaskDetails();
    }, [openUpdateTask])

    const fetchTaskDetails = async () => {

        try {
            const res = await axios.get(`${backend_domain}/api/v1/task/task-details/${id}`, {
                withCredentials: true
            })
            dispatch(setTaskDetails(res.data?.data))
            // toast.success(res.data?.message)
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    }

    const statusHandler = async (taskId, newStatus) => {
        try {
            const data = {
                id: taskId,
                status: newStatus
            }
            const res = await axios.post(`${backend_domain}/api/v1/task/change-status`, data, { withCredentials: true })
            fetchTaskDetails()
            // toast.success(res.data?.message)
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    }

    const deleteTask = async (taskId) =>{
        try {
            const res = await axios.delete(`${backend_domain}/api/v1/task/delete-task/${taskId}`,{withCredentials : true})
            
            fetchTaskDetails()
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div className='w-full h-full p-4 mb-20'>
            <div className='border-b-2 border-slate-100 pb-2 mb-4'><button onClick={() => navigate(-1)} className='bg-slate-200 py-1.5 flex items-center gap-2'><IoMdArrowRoundBack /><span>Back</span></button></div>
            <div className="w-full max-w-[600px] m-auto overflow-y-hidden shadow-lg border-2 border-slate-200 bg-slate-50 rounded-lg relative">
                <div className="w-full">
                    <div className="flex justify-between items-center gap-2 px-2 py-1.5 border-b-2 border-slate-200">
                        <h1 className='font-semibold text-2xl text-wrap px-4 py-2 truncate'>{taskDetails?.taskGroupTitle} ({taskDetails?.tasks?.length})</h1>
                        <span className='flex items-center gap-2'>
                            <span className='text-base font-semibold text-slate-400'>{percent}%</span>
                            <span className='w-6 h-6 rounded-full bg-green-500 flex justify-center items-center p-1'><FaCheck /></span>
                        </span>
                    </div>
                    <div className="px-4 py-8 flex flex-col gap-10">

                        {
                            taskDetails?.tasks?.length < 1 ?
                                <p>No Task is added yet</p> :
                                taskDetails?.tasks?.map((task,index) => {
                                    return (
                                        <div key={task._id} className="flex items-center gap-2">
                                            <div onClick={() => statusHandler(task?._id, task?.status === "pending" ? "completed" : "pending")} className='w-12 h-12 rounded-full bg-slate-200 cursor-pointer'>
                                                {task?.status === 'pending' ? (
                                                    <span className='w-12 h-12 rounded-full bg-slate-200 '></span>
                                                ) : (
                                                    <span className='w-12 h-12 rounded-full bg-yellow-400 flex justify-center items-center'><MdDone className='text-2xl' /></span>
                                                )}


                                            </div>
                                            <span className={`${task?.status === 'completed' ? 'line-through' : ''} text-base text-wrap flex-1`}>{task?.taskTitle}</span>
                                            <span>
                                                {
                                                    task?.taskImg ? (
                                                        <img src={task?.taskImg} alt="task_img" className='w-8 h-8 lg:w-12 lg:h-12 rounded-md' />
                                                    ) : (
                                                        <FaImage className='w-8 h-8 lg:w-12 lg:h-12 rounded-md'/>
                                                    )
                                                }
                                                
                                                
                                            </span>
                                            <span className='flex items-center gap-2 text-xl pl-2 lg:pl-4'>
                                                <span title='Edit tasks' onClick={()=>{
                                                    dispatch(setSelectedTask(task))
                                                    dispatch(setOpenUpdateTask(true))
                                                }} className='cursor-pointer text-green-500'><FaEdit /></span>
                                                <span onClick={()=>deleteTask(task?._id)} title='Delete task' className='cursor-pointer text-red-500'><MdDelete /></span>
                                            </span>
                                        </div>

                                    )
                                })
                        }


                    </div>
                </div>

            </div>
            {/* <div className="w-full max-w-[600px] m-auto mt-6 flex justify-end">
                <span className='w-10 h-10 rounded-full bg-blue-400 flex justify-center items-center text-2xl'><IoMdAdd/></span>
            </div> */}
        </div>

    )
}

export default ViewTask