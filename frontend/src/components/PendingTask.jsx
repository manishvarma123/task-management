import React, { useEffect } from 'react'
import TaskCard from './taskCard'
import axios from 'axios'
import { backend_domain } from '../constant'
import { useDispatch, useSelector } from 'react-redux'
import { setPendingTasks } from '../redux/slices/taskSlice.js'
import { toast } from 'react-toastify'

const PendingTask = () => {

  const dispatch = useDispatch();
  const {pendingTasks} = useSelector(state => state.task)

  useEffect(() => {
    fetchPendingTasks()
  }, [])

  const fetchPendingTasks = async () => {
    try {
      const res = await axios.get(`${backend_domain}/api/v1/task/pending-tasks`, { withCredentials: true });

      dispatch(setPendingTasks(res?.data?.data))
    } catch (error) {
      toast.error(error?.response?.data?.message)
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