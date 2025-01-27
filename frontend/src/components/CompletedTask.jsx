import React, { useEffect } from 'react'
import TaskCard from './taskCard'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { backend_domain } from '../constant';
import { setCompletedTasks } from '../redux/slices/taskSlice.js';

const CompletedTask = () => {

  const dispatch = useDispatch();
  const { completedTasks } = useSelector(state => state.task)

  useEffect(()=>{
    fetchCompletedTasks()
  },[])

  const fetchCompletedTasks = async() => {
    try {
      const res = await axios.get(`${backend_domain}/api/v1/task/completed-tasks`,{withCredentials:true})
      dispatch(setCompletedTasks(res?.data?.data))
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <div className='w-full h-full p-4'>
      <h2 className='font-semibold text-xl border-b-2 border-slate-100 pb-2 mb-4'>Completed Tasks</h2>
      <div className="w-full flex flex-wrap gap-6">

        {
          completedTasks?.length < 1 ?
            <p>No completed Tasks group found</p> :
            completedTasks?.map((task) => {
              return (
                <TaskCard key={task._id} task={task}/>
              )
            })
        }

      </div>
    </div>
  )
}

export default CompletedTask