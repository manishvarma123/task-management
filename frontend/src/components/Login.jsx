import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { toast } from 'react-toastify';
import axios from 'axios';
import { backend_domain } from '../constant';
import { setUser } from '../redux/slices/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api/user.js'

const Login = () => {

    const navigate = useNavigate();
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false)
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            // const res = await axios.post(`${backend_domain}/api/v1/user/login`, data, {
            //     withCredentials: true,
            // });

            const res = await api.loginUser(data)

            console.log(res?.data?.data);
            localStorage.setItem('user',JSON.stringify(res?.data?.data))
            

            dispatch(setUser(res?.data?.data));
            // console.log('User dispatched:', res?.data?.data);
            toast.success(res?.data?.message);
        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            // console.log("present", user)
            navigate('/')
        }
        else {
            console.log("user not present", user);
        }
    }, [user])

    return (
        <div className='w-screen h-screen bg-[#f7f7f7]'>
            <div className="w-full h-full overflow-y-auto p-3 flex justify-center ">
                <div className="w-full">
                    <h1 className='font-serif text-2xl text-center md:mt-8 md:mb-6'>Task Management</h1>
                    <div className="w-full max-w-[500px] min-h-36 m-auto p-8 bg-white rounded-lg shadow-lg mb-8">
                        <h1 className='border-b-2 border-slate-200 text-2xl font-semibold pb-2 mb-8'>Login</h1>

                        <form onSubmit={submitHandler} className=''>

                            <div className="flex flex-col gap-4">

                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="email" className='font-semibold'>Email Address</label>
                                    <input value={data.email} name='email' onChange={changeHandler} id='email' type="text" className='border-slate-200 border-2 p-2 rounded-md text-sm outline-blue-800 ' placeholder='Enter your email address' />
                                </div>
                                <div className="flex flex-col gap-1.5 relative">
                                    <label htmlFor="password" className='font-semibold'>Password</label>
                                    <input value={data?.password} name='password' onChange={changeHandler} id='password' type={show ? "text" : "password"} className='border-slate-200 border-2 p-2 pr-[28px] rounded-md text-sm outline-blue-800 relative' placeholder='Enter your password' />

                                    {
                                        !show && <div onClick={() => setShow(!show)} className="absolute w-fit right-2 bottom-2.5">
                                            <IoMdEyeOff className='text-[18px]' />
                                        </div>
                                    }
                                    {
                                        show && <div onClick={() => setShow(!show)} className="absolute w-fit right-2 bottom-2.5">
                                            <IoEye className='text-[18px] text-orange-500' />
                                        </div>
                                    }
                                </div>

                                <button type='submit' disabled={loading} className={` block ${loading ? 'bg-blue-400' : 'bg-blue-500'}  text-white mt-6`}>{loading ? 'Please wait' : 'Login'}</button>
                            </div>

                        </form>

                    </div>

                    <h2 className='font-serif text-base text-center mb-2'>Don't have an account?</h2>
                    <Link to={'/signup'} className='text-center block'>Sign Up</Link>
                </div>

            </div>
        </div>
    )
}

export default Login