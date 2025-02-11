import React from 'react';
import { FaCheck } from "react-icons/fa";
import { TiArrowRight } from "react-icons/ti";
import { useSelector } from 'react-redux';

const SubscriptionPage = () => {
    const { user } = useSelector(state => state.user);

    return (
        <div className='w-full h-full p-4 flex flex-col gap-2'>
            <h2 className='font-semibold text-xl border-b-2 border-slate-100 pb-2 mb-2'>Subscription</h2>

            <div className="flex-1 p-4 flex justify-center items-center">
                <div className="flex justify-center items-center gap-5">
                    <div className="min-w-[250px] shadow-md bg-white rounded-lg border-2 border-slate-200 hover:scale-110 duration-300 hover:bg-black/80 hover:text-white px-4 py-5">
                        <div className="border-b-2 border-slate-400">
                            <h2 className='text-center font-bold'>Basic</h2>
                            <h3 className='text-center mb-2 text-base font-semibold'>Free / <span className='text-sm text-slate-500'>user</span></h3>
                        </div>
                        <div className="py-3 flex flex-col gap-3 mb-4">
                            <div className="flex justify-center items-center gap-2">
                                <FaCheck />
                                <h6 className='text-sm'>Get started with adding task</h6>
                            </div>
                            <div className="flex justify-center items-center gap-2">
                                <FaCheck />
                                <h6 className='text-sm'>Get started with adding task</h6>
                            </div>
                            <div className="flex justify-center items-center gap-2">
                                <FaCheck />
                                <h6 className='text-sm'>Get started with adding task</h6>
                            </div>
                        </div>
                        <button
                            disabled={user.plan === "basic"}
                            className={`w-full flex justify-center items-center gap-1 px-4 py-2 font-semibold rounded-md 
                                ${user.plan === "basic" 
                                    ? 'bg-gray-400 text-gray-700 cursor-not-allowed' // Disabled state
                                    : 'bg-blue-600 hover:bg-blue-500 text-white' // Enabled state
                                }`}
                        >
                            <span>Choose Plan</span>
                            <TiArrowRight className='text-3xl' />
                        </button>
                    </div>
                    <div className="min-w-[250px] shadow-md bg-white rounded-lg border-2 border-slate-200 hover:scale-110 duration-300 hover:bg-black/80 hover:text-white px-4 py-5">
                        <div className="border-b-2 border-slate-400">
                            <h2 className='text-center font-bold'>Premium</h2>
                            <h3 className='text-center mb-2 text-base font-semibold'>₹ 199 / <span className='text-sm text-slate-500'>user</span></h3>
                        </div>
                        <div className="py-3 flex flex-col gap-3 mb-4">
                            <div className="flex justify-center items-center gap-2">
                                <FaCheck />
                                <h6 className='text-sm'>Get started with adding task</h6>
                            </div>
                            <div className="flex justify-center items-center gap-2">
                                <FaCheck />
                                <h6 className='text-sm'>Get started with adding task</h6>
                            </div>
                            <div className="flex justify-center items-center gap-2">
                                <FaCheck />
                                <h6 className='text-sm'>Get started with adding task</h6>
                            </div>
                        </div>
                        <button
                            disabled={user.plan === "premium"}
                            className={`w-full flex justify-center items-center gap-1 px-4 py-2 font-semibold rounded-md 
                                ${user.plan === "premium" 
                                    ? 'bg-gray-400 text-gray-700 cursor-not-allowed' // Disabled state
                                    : 'bg-blue-600 hover:bg-blue-500 text-white' // Enabled state
                                }`}
                        >
                            <span>Choose Plan</span>
                            <TiArrowRight className='text-3xl' />
                        </button>
                    </div>
                    <div className="min-w-[250px] shadow-md bg-white rounded-lg border-2 border-slate-200 hover:scale-110 duration-300 hover:bg-black/80 hover:text-white px-4 py-5">
                        <div className="border-b-2 border-slate-400">
                            <h2 className='text-center font-bold'>PremiumPlus</h2>
                            <h3 className='text-center mb-2 text-base font-semibold'>₹ 499 / <span className='text-sm text-slate-500'>user</span></h3>
                        </div>
                        <div className="py-3 flex flex-col gap-3 mb-4">
                            <div className="flex justify-center items-center gap-2">
                                <FaCheck />
                                <h6 className='text-sm'>Get started with adding task</h6>
                            </div>
                            <div className="flex justify-center items-center gap-2">
                                <FaCheck />
                                <h6 className='text-sm'>Get started with adding task</h6>
                            </div>
                            <div className="flex justify-center items-center gap-2">
                                <FaCheck />
                                <h6 className='text-sm'>Get started with adding task</h6>
                            </div>
                        </div>
                        <button
                            disabled={user.plan === "premiumPlus"}
                            className={`w-full flex justify-center items-center gap-1 px-4 py-2 font-semibold rounded-md 
                                ${user.plan === "premiumPlus" 
                                    ? 'bg-gray-400 text-gray-700 cursor-not-allowed' // Disabled state
                                    : 'bg-blue-600 hover:bg-blue-500 text-white' // Enabled state
                                }`}
                        >
                            <span>Choose Plan</span>
                            <TiArrowRight className='text-3xl' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionPage;
