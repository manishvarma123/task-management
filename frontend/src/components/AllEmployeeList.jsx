import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { backend_domain } from '../constant';
import { useNavigate } from 'react-router';
import { resetUser } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api/user.js'

const AllEmployeeList = () => {

    const dispatch = useDispatch()
    const [allUser, setAllUser] = useState(null)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState("");
    const { user } = useSelector((state) => state.user);
    const [page, setPage] = useState(1); // Page starts at 1
    const [rows, setRows] = useState(6); // Rows per page
    const [totalPages, setTotalPages] = useState(1); // Total pages

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
    };

    const handlePrevious = () => {
        if (page > 1) {
            setPage(page - 1); // Decrease page number
        }
    };

    const handleNext = () => {
        if (page < totalPages) {
            setPage(page + 1); // Increase page number
        }
    };

    useEffect(() => {

        const fetchAllUser = async () => {
            try {
                setLoading(true)
                // const res = await axios.get(`${backend_domain}/api/v1/user/get-all-user`, {
                //     headers : {
                //         'userId' : user?._id
                //     },
                //     withCredentials: true
                // })

                const res = await api.getAllUser({
                    page: page,
                    limit: rows,
                    searchQuery: searchQuery,
                })
                setAllUser(res?.data?.data.allUser)

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
    }, [page, rows, searchQuery])

    if (loading) {
        return (
            <div className="w-full h-full p-4">
                <h2 className="font-semibold text-xl border-b-2 border-slate-100 pb-2 mb-4 ">
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
            <h2 className="font-semibold text-xl border-b-2 border-slate-100 pb-2 mb-4 flex justify-between items-center">
                All Employee List
                <input
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search by name/email"
                    className="text-sm border-2 border-slate-200 px-3 py-1"
                />
            </h2>

            <div className="w-full overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left">Sr.No</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Plan</th>
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
                                    <td className="px-4 py-2">{user.plan}</td>
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

            <div className="flex justify-center items-center gap-3 mt-4 text-center">
                <div className="flex items-center gap-3">
                    <button className="bg-slate-100" onClick={handlePrevious} disabled={page <= 1}>Previous</button>
                    <span>Page {page} of {totalPages}</span>
                    <button className="bg-slate-100" onClick={handleNext} disabled={page >= totalPages}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default AllEmployeeList;
