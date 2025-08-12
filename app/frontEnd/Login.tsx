'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Users } from '@/type/data';
import { IoClose } from "react-icons/io5";


export default function Login() {
  const [form, setForm] = useState<Users>({ user_email: '', user_password: '' });
  
  const [error, setError] = useState<string>('');
  const [closepopup, setClosepop] = useState(false)
  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      email : form.user_email,
      password : form.user_password
    }
    try {
      const response = await fetch('/api/loginWeb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Login failed');
      }
      const data = await response.json()
      const storeId = data.user?.store
      router.push(`/stores/${storeId}`)
      
      
    } catch (error: any) {
      setError(error.message);
    }
  };
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
  <div className="fixed inset-0 flex bg-black/50 items-center justify-center mx-auto ">
    <div className="w-full bg-white rounded-lg shadow border border-red-500 sm:max-w-md xl:p-0 light:bg-white-800">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className='flex items-center justify-between'>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-red-600 md:text-2xl dark:text-red-400">
                Login to MYPOS
            </h1>
            {/* <button type='button' onClick={()=> setClosepop(true)}><IoClose /></button> */}
            </div>
            <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                <div>
                    <label className="block mb-2 text-sm font-medium text-black-700 dark:text-black-300">Email</label>
                    <input 
                        type="email" 
                        name="user_email" 
                        id="user_email" 
                        value={form.user_email}
                        onChange={handleChange}
                        className="bg-gray-200 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                        placeholder="Enter your Email" 
                        required
                        autoFocus/>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-black-700 dark:text-black-300">Password</label>
                    <input 
                        type="password" 
                        name="user_password" 
                        id="user_password" 
                        value={form.user_password}
                        onChange={handleChange}
                        placeholder="Enter your Password" 
                        className="bg-gray-200 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                        required
                        autoFocus
                        />
                </div>
                <button type="submit" className="w-full text-white bg-red-600 hover:bg-red-700 rounded-lg text-sm px-5 py-2.5 text-center">
                    Login
                </button>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                   <a href="#" className="text-red-600 hover:underline">Forgot your Password?</a>
                </p>
                <p className="text-sm text-black-500 dark:text-black-400 text-center">
                    Don’t have an account? <a href="/chooseStore" className="text-red-600 hover:underline">Register here</a>
                </p>
            </form>
        </div>
    </div>
</div>
  );
}