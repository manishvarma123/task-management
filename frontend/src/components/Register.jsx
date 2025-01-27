import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import axios from 'axios';
import { backend_domain } from '../constant.js';
import { toast } from 'react-toastify';
import {useDispatch} from 'react-redux'
import { setUser } from '../redux/slices/userSlice.js';

const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        fullName: '',
        email: '',
        password: ''
    })

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)

            const res = await axios.post(`${backend_domain}/api/v1/user/register`, data, {
                withCredentials: true
            })

            dispatch(setUser(res?.data?.data))
            toast.success(res?.data?.message)
            navigate('/login')

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            setLoading(false)
        }

    }
    return (
        <div className='w-screen h-screen bg-[#f7f7f7]'>
            <div className="w-full h-full overflow-y-auto p-3 flex justify-center ">
                <div className="w-full">
                    <h1 className='font-serif text-2xl text-center md:mt-8 md:mb-6'>Task Management</h1>
                    <div className="w-full max-w-[500px] min-h-36 m-auto p-8 bg-white rounded-lg shadow-lg mb-8">
                        <h1 className='border-b-2 border-slate-200 text-2xl font-semibold pb-2 mb-8'>Sign Up</h1>

                        <form onSubmit={submitHandler} className=''>

                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="fullname" className='font-semibold'>Full Name</label>
                                    <input value={data.fullName} name='fullName' onChange={changeHandler} id='fullname' type="text" className='border-slate-200 border-2 p-2 rounded-md text-sm outline-blue-800 ' placeholder='Enter Full Name' />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="email" className='font-semibold'>Email Address</label>
                                    <input value={data.email} name='email' onChange={changeHandler} id='email' type="text" className='border-slate-200 border-2 p-2 rounded-md text-sm outline-blue-800 ' placeholder='Enter your email address' />
                                </div>
                                <div className="flex flex-col gap-1.5 relative">
                                    <label htmlFor="password" className='font-semibold'>Password</label>
                                    <input value={data.password} name='password' onChange={changeHandler} id='password' type={show ? "text" : "password"} className='border-slate-200 border-2 p-2 pr-[28px] rounded-md text-sm outline-blue-800 relative' placeholder='Enter your password' />

                                    {
                                        !show && <div onClick={() => setShow(!show)} className="absolute w-fit right-2 bottom-2.5">
                                            <IoMdEyeOff className='text-[18px]' />
                                        </div>
                                    }
                                    {
                                        show && <div onClick={() => setShow(!show)} className="absolute w-fit right-2 bottom-2.5">
                                            <IoEye className='text-[18px]' />
                                        </div>
                                    }
                                </div>

                            </div>
                                <button type='submit' className='block bg-blue-500 text-white mt-6'>{loading ? 'Please wait' : 'Create an Account'}</button>

                        </form>

                    </div>

                    <h2 className='font-serif text-base text-center mb-2'>Already have an account?</h2>
                    <Link to={'/login'} className='text-center block'>Login</Link>
                </div>

            </div>
        </div>
    )
}

export default Register