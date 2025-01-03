import React from 'react';
import { IoMdAdd } from "react-icons/io";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const TopBar = () => {
    const navigate = useNavigate();
    const {user} = useSelector(state => state.user)
    return (
        <div className="w-full bg-white px-4 py-3 flex justify-between items-center rounded-lg">
            <span className='text-base'>Hii {user?.fullName}</span>
            <span onClick={()=>navigate('/add-task')} className='flex items-center gap-1 bg-yellow-300 border-2 border-black rounded-full px-3 py-1 font-semibold text-sm cursor-pointer'>
                <IoMdAdd />
                <span>Add task</span>
            </span>
        </div>
    )
}

export default TopBar