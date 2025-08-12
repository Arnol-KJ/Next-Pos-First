'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
interface StoreName{
    store_name : string
}
export default function chooseStore() {
    const [storeName , setStoreName] = useState<StoreName>({store_name : ''})
    const router = useRouter()
    const fetchData = async () =>{
      const bodyData = {store_name : storeName.store_name}
      const response = await fetch('/api/First_time_register/KEY-Store' , {
        method : `POST`,
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(bodyData)
      })
      const res = await response.json()
      const data = res.id
      if(response.status === 200 ){
        router.push(`/register/${data}`)
      }
      console.error("error : " ,res.status)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault()
      try{
        fetchData()
      }catch(error:any){
        console.error("error : " , error.message)
      }
    }
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      setStoreName({...storeName , [e.target.name] : e.target.value})
    }
  return (
    <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
      <form className='max-w-md mx-auto' onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="storeName" className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'>Store name please</label>
          <input type="text" 
          name='store_name' 
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='ลี้กิมฮวง'
          value={storeName.store_name}
          onChange={handleChange}
          required />
        </div>
        <button type='submit' 
        className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' 
        
        >Enter</button>
      </form>
    </div>
  )
}
