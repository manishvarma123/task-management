import React from 'react';
import { FaCheck } from "react-icons/fa";
import { TiArrowRight } from "react-icons/ti";
import { useDispatch, useSelector } from 'react-redux';
import api from '../api/subscription.js'
import { setUser } from '../redux/slices/userSlice.js';

const SubscriptionPage = () => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch()
    // console.log(user.planExpiry);

    const date = new Date(user?.planExpiry)
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
        day : '2-digit',
        month : 'long',
        year : 'numeric'
    }).format(date)
    // console.log(formattedDate);
    

    const handlePlanChoose = async (plan) => {

        const res = await api.createPlan(plan)
        console.log(res);


        const { id } = res?.data?.data
        // const options = {
        //     key : 'rzp_test_Y8NQPzesPX4iYi',
        //     amount : 
        // }

        const options = {
            key: 'rzp_test_Y8NQPzesPX4iYi', // Replace with your Razorpay Key ID
            amount: plan.amount, // Amount in paise
            currency: 'INR',
            name: 'Subscription Service',
            description: `Subscription for ${plan.plan}`,
            order_id: id, // Order ID from backend
            handler: async function (response) {
                // After successful payment, response contains payment details
                const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

                // Send payment details to the backend for verification
                await api.verifyPayment({
                    razorpay_payment_id,
                    razorpay_order_id,
                    razorpay_signature,
                    plan: plan.plan
                })
                    .then((res) => {
                        console.log(res.data);

                        dispatch(setUser({ ...user, plan: res?.data?.data.planType,planExpiry : res?.data?.data?.planExpiry }))
                        alert(res.data.message);
                    })
                    .catch((err) => {
                        alert('Payment verification failed.');
                    });
            },
            prefill: {
                name: 'Customer Name',
                email: 'customer@example.com',
                contact: '1234567890',
            },
            notes: {
                address: 'Customer Address',
            },
            theme: {
                color: '#F37254',
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

    }

    return (
        <div className='w-full h-full p-4 flex flex-col gap-2'>
            <h2 className='font-semibold text-xl border-b-2 border-slate-100 pb-2 mb-2'>Subscription</h2>

            <h3 className='text-center mt-2'>Your <span className='font-bold capitalize'>{`${user?.plan}`}</span> plan is Active {`${user.plan !== 'basic' ? 'and will expire on' : ''}`} <span className='font-bold'>{user.plan !== 'basic' ? formattedDate : ''}</span></h3>

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
                            // onClick={() => handlePlanChoose({ plan: 'basic', amount: 0 })}
                            disabled={true}
                            className="w-full flex justify-center items-center gap-1 px-4 py-2 font-semibold rounded-md bg-gray-400 text-gray-700 cursor-not-allowed"
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
                            onClick={() => handlePlanChoose({ plan: 'premium', amount: 199 })}
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
                            onClick={() => handlePlanChoose({ plan: 'premiumPlus', amount: 399 })}
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
