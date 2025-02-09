import React, { useEffect } from 'react'
import TaskCard from './taskCard'
import axios from 'axios'
import { backend_domain } from '../constant'
import { useDispatch, useSelector } from 'react-redux'
import { setPendingTasks } from '../redux/slices/taskSlice.js'
import { toast } from 'react-toastify'
import { resetUser } from '../redux/slices/userSlice.js'
import api from '../api/task.js'

const PendingTask = () => {

  const dispatch = useDispatch();
  const { pendingTasks } = useSelector(state => state.task)
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    fetchPendingTasks()
  }, [])

  const fetchPendingTasks = async () => {
    try {
      // const res = await axios.get(`${backend_domain}/api/v1/task/pending-tasks`, {
      //   headers: {
      //     'userId': user?._id
      //   },
      //   withCredentials: true
      // });

      const res = await api.getPendingTasks()

      dispatch(setPendingTasks(res?.data?.data))
    } catch (error) {
      toast.error(error?.response?.data?.message)
      if (error?.response?.status === 401) {
        dispatch(resetUser());
        dispatch({ type: 'LOGOUT_USER' });
      }
    }
  }


  return (
    <div className='w-full h-full p-4'>
      <h2 className='font-semibold text-xl border-b-2 border-slate-100 pb-2 mb-4'>Pending Tasks</h2>
      <div className="w-full flex flex-wrap gap-6">

        {
          pendingTasks?.length < 1 ?
            <p>No Pending Tasks Found</p> :
            pendingTasks?.map((task) => {
              return (
                <TaskCard key={task?._id} task={task} />
              )
            })
        }


      </div>
    </div>
  )
}

export default PendingTask