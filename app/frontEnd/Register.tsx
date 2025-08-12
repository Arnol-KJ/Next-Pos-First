'use client'
import React from 'react'
import { useState } from 'react'
import { Users } from '@/type/data'
import { useRouter } from 'next/navigation'


interface storesId {
    storesId : string
}


export default function Register({storesId}:storesId) {
    const [form, setForm] = useState<Users>({ user_email: '', user_password: '' })
    
    const storeId = parseInt(storesId)
    
    const router = useRouter()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const body = {
            email: form.user_email,
            password: form.user_password,
            store_id : storeId
        }
        try {
            const response = await fetch('/api/First_time_register', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
            // if (!response.ok) {
            //     console.log("someting wrong", await response.text, response.status)
            // }
            if (response.status === 401){
                router.push('/login')
            }
            else if (response.status === 200){
                router.push('/landingpage')
            }
            
        } catch (error: any) {
            console.error("error", error.message)
        }

    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <div>
            {/* <LandingPage/> */}
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className='space-y-6' onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm/6 font-medium text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input type="text"
                                name='user_email'
                                className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6' 
                                value={form.user_email}
                                onChange={handleChange}
                                required/>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label className="block text-sm/6 font-medium text-gray-900">Password</label>
                                <div className="mt-2">
                                    <input type="password"
                                    name = 'user_password'
                                    className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                                    value={form.user_password}
                                    onChange={handleChange}
                                    required />
                                </div>
                            </div>
                        </div>
                        <div>
                            <button type='submit' className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
