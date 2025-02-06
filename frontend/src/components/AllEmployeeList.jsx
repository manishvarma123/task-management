import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { backend_domain } from '../constant';
import { useNavigate } from 'react-router';
import { resetUser } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const AllEmployeeList = () => {

    const dispatch = useDispatch()
    const [allUser, setAllUser] = useState(null)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((state) => state.user);

    useEffect(() => {

        const fetchAllUser = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`${backend_domain}/api/v1/user/get-all-user`, {
                    headers : {
                        'userId' : user?._id
                    },
                    withCredentials: true
                })
                console.log(res);
                setAllUser(res?.data?.data)

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

        fetchAllUser()
    }, [])

    if (loading) {
        return (
            <div className="w-full h-full p-4">
                <h2 className="font-semibold text-xl border-b-2 border-slate-100 pb-2 mb-4">
                    All Employee List
                </h2>
                <h1 className='text-center text-base'>
                    Loading...
                </h1>
            </div>
        )
    }
    return (
        <div className="w-full h-full p-4">
            <h2 className="font-semibold text-xl border-b-2 border-slate-100 pb-2 mb-4">
                All Employee List
            </h2>

            <div className="w-full overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left">Sr.No</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Role</th>
                            <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUser?.map((user, index) => (
                                <tr key={user._id} className="border-b-2 border-slate-200">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{user.fullName}</td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    <td className="px-4 py-2">{user.role}</td>
                                    <td className="px-4 py-2">
                                        <button onClick={(e) => {
                                            navigate(`/id/${user._id}`)
                                        }} className="px-3 py-1 text-sm border-2 border-slate-400 bg-green-600 text-white">
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllEmployeeList;
