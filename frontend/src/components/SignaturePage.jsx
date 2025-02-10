import React, { useState } from 'react'
import Signature from './Signature'
import api from '../api/user.js'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/slices/userSlice.js'

const SignaturePage = () => {

    const [signature, setSignature] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)

    const saveSignature = async (signatureDataUrl) => {
        // console.log(user);

        setSignature(signatureDataUrl);
        try {
            setLoading(true); 
            const data = {
                signature: signatureDataUrl
            }
            const res = await api.setSignature(data)
            dispatch(setUser({ ...user, signature: res?.data?.data }))


        } catch (error) {
            toast.error(error.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-full h-full p-4'>
            <h2 className='font-semibold text-xl border-b-2 border-slate-100 pb-2 mb-8'>Signature Below</h2>

            <div className="flex justify-start items-start gap-3 mb-12">
                <Signature onSave={saveSignature} setSignature={setSignature} loading={loading} />

                {
                    signature && 
                    <div className="flex flex-col gap-2">
                        <h2>Preview</h2>
                        <img src={signature} alt='Signature' className='w-[200px] h-[100px] border-2 border-slate-200 rounded-sm'/>
                    </div>
                }
            </div>

            <div className="">
                <h2 className='font-bold '>Signature stored in DB</h2>
                {
                    !user.signature ? 
                    <h2 className='text-slate-400 text-lg'>No Signature in DB</h2> : 
                    <img src={user?.signature} alt='Signature' className='w-[200px] h-[100px] border-2 border-slate-200 rounded-sm'/>

                }
            </div>

        </div>


    )
}

export default SignaturePage