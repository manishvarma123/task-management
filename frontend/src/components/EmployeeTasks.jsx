import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { IoMdArrowRoundBack } from "react-icons/io";
import TaskCard from './taskCard';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { backend_domain } from '../constant';
import { setAllTasks } from '../redux/slices/taskSlice';
import { resetUser } from '../redux/slices/userSlice';
import api from '../api/task.js'
import { toast } from 'react-toastify';

const EmployeeTasks = () => {

    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { allTasks } = useSelector(state => state.task)
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchAllTasks = async () => {
            try {
                setLoading(true)
                // const res = await axios.get(`${backend_domain}/api/v1/task/employee-tasks/${id}`, {
                //     headers: {
                //         'userId': user?._id
                //     },
                //     withCredentials: true
                // })

                const res = await api.getEmployeeTasks(id)

                dispatch(setAllTasks(res?.data?.data))

            } catch (error) {
                toast.error(error.response?.data?.message)
                if (error?.response?.status === 401) {
                    dispatch(resetUser());
                    dispatch({ type: 'LOGOUT_USER' });
                }
            } finally {
                setLoading(false)
            }
        }

        fetchAllTasks()
    }, [])

    if (loading) {
        return (
            <h1 className='text-base text-center'>Loading...</h1>
        )
    }

    return (
        <div className='w-full h-full p-4 pb-10'>
            <div className="border-b-2 border-slate-100 pb-2 mb-4">
                <button onClick={() => navigate(-1)} className='bg-slate-200 py-1.5 flex items-center gap-2'>
                    <IoMdArrowRoundBack />
                    <span>Back</span>
                </button>
            </div>

            <div className="w-full flex flex-wrap gap-6">
                {
                    allTasks?.length < 1 ?
                        <p>No Tasks created yet</p> :
                        allTasks?.map((task) => {
                            return (
                                <TaskCard key={task?._id} task={task} />
                            )
                        })
                }


            </div>
        </div>
    )
}

export default EmployeeTasks