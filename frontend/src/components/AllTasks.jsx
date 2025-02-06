import React, { useEffect } from 'react'
import axios from 'axios'
import { backend_domain } from '../constant'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { setAllTasks } from '../redux/slices/taskSlice.js'
import TaskCard from './taskCard.jsx'
import { resetUser } from '../redux/slices/userSlice.js'
import { Navigate } from 'react-router'


const AllTasks = () => {
    const dispatch = useDispatch()
    const { allTasks } = useSelector(state => state.task)
    // const { user } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchAllTasks = async () => {

            try {
                const res = await axios.get(`${backend_domain}/api/v1/task/all-tasks`, { withCredentials: true })
  
                dispatch(setAllTasks(res.data?.data))
                // toast.success(res.data?.message)
            } catch (error) {
                toast.error(error.response?.data?.message)
                // console.log(error);
                if (error?.response?.status === 401) {
                    dispatch(resetUser());
                    dispatch({ type: 'LOGOUT_USER' });
                }

            }
        }
        fetchAllTasks()
    }, [])

    // if (!user) {
    //     return <Navigate to="/login" replace />;
    // }

    return (
        <div className='w-full h-full p-4'>
            <h2 className='font-semibold text-xl border-b-2 border-slate-100 pb-2 mb-4'>All Tasks</h2>
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

export default AllTasks