import React from 'react';
import { SiGoogletasks } from "react-icons/si";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { MdPendingActions } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { backend_domain } from '../constant';
import { toast } from 'react-toastify';
import { persistor } from '../redux/store';
import { setTask } from '../redux/slices/taskSlice';
import { useNavigate } from 'react-router';
import { FcParallelTasks } from "react-icons/fc";
import api from '../api/user.js'

const SideBar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { task } = useSelector(state => state.task)
    const { user } = useSelector(state => state.user)

    const logoutHandler = async () => {
        try {
            // const res = await axios.get(`${backend_domain}/api/v1/user/logout`, {
            //     withCredentials: true
            // })

            const res = await api.logoutUser()

            if (res?.data?.success) {
                localStorage.removeItem('user')
                toast.success(res?.data?.message)
                persistor.purge();
                dispatch({ type: 'LOGOUT_USER' });
            }

        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div className='w-full h-full p-2 md:p-4 flex flex-col gap-2'>
            <div className="px-4 py-2 border-b-2 border-slate-100 mb-6 ">
                <h1 className='text-lg font-semibold hidden md:block'>To-do Task</h1>
            </div>
            <div className="flex-1 flex flex-col gap-3">
                <div onClick={() => {
                    dispatch(setTask("all"))
                    navigate('/')
                }} className={`${task === "all" ? "bg-slate-100" : ""} w-fit md:w-full md:flex md:items-center md:gap-4 px-4 py-2 hover:bg-slate-100 rounded-md cursor-pointer`}>
                    <SiGoogletasks />
                    <span className='hidden md:block'>All tasks</span>
                </div>
                <div onClick={() => {
                    dispatch(setTask("pending"))
                    navigate('/pending-task')
                }} className={`${task === "pending" ? "bg-slate-100" : ""} w-fit md:w-full md:flex md:items-center md:gap-4 px-4 py-2 hover:bg-slate-100 rounded-md cursor-pointer`}>
                    <MdPendingActions />
                    <span className='hidden md:block'>Pending tasks</span>
                </div>
                <div onClick={() => {
                    dispatch(setTask("completed"))
                    navigate('/completed-task')
                }} className={`${task === "completed" ? "bg-slate-100" : ""} w-fit md:w-full md:flex md:items-center md:gap-4 px-4 py-2 hover:bg-slate-100 rounded-md cursor-pointer`}>
                    <IoCheckmarkDoneSharp />
                    <span className='hidden md:block'>Completed tasks</span>
                </div>
                <div onClick={()=>{
                    dispatch(setTask("signature"))
                    navigate('/signature')
                }} className={`${task === "signature" ? "bg-slate-100" : ""} w-fit md:w-full md:flex md:items-center md:gap-4 px-4 py-2 hover:bg-slate-100 rounded-md cursor-pointer`}>
                    <IoCheckmarkDoneSharp />
                    <span className='hidden md:block'>Signature</span>
                </div>
                {
                    user?.role === "manager" &&
                    <div onClick={() => {
                        dispatch(setTask("all-employee"))
                        navigate('/all-task-list')
                    }} className={`${task === "all-employee" ? "bg-slate-100" : ""} w-fit md:w-full md:flex md:items-center md:gap-4 px-4 py-2 hover:bg-slate-100 rounded-md cursor-pointer`}>
                        <FcParallelTasks />
                        <span className='hidden md:block'>All Employee tasks</span>
                    </div>
                }

            </div>

            <div onClick={logoutHandler} className="w-fit md:w-full md:flex md:items-center md:gap-4 px-4 py-2 bg-slate-100 rounded-md cursor-pointer">
                <TbLogout />
                <span className='hidden md:block'>Log out</span>
            </div>

        </div>
    )
}

export default SideBar