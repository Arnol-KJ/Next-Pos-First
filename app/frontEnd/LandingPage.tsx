'use client'
import Navbar from './Navbar'
import Image from 'next/image'
import Register from './Register'
import 'reactjs-popup/dist/index.css'
import React ,{useState} from 'react'
import Propup from './components/Propup'


export default function LandingPage() {
  return (
    <div>
      <Navbar/>
      <div className='flex items-center justify-center min-h-screen bg-white'>
        <div className="text-center">
          <Image src="/logo.png" alt="" className='mx-auto' width={300} height={5} />
          <h1 className='text-4xl font-bold text-gray-600 mt-4'>MYPOS เว็บไซต์จำหน่ายระบบขายของหน้าร้าน</h1>
          <h2 className='text-red-600 text-xl mt-2'>สำหรับร้านกาแฟ คาเฟ่ และ ร้านอาหารขนาดเล็ก </h2>
          <h2 className='text-gray-600 mt-4'>ปรับปรุงการดำเนินงานร้านอาหารของคุณด้วยจุดขายแบบครบวงจรของเราเพิ่มประสิทธิภาพ, เพิ่มยอดขาย, และสร้างความพึงพอใจให้กับลูกค้าด้วย MYPOS</h2>
          <div className="mt-6 space-x-4">
            <a href="/chooseStore" className='bg-red-500 text-white px-6 py-2 rounded-full text-2xl'>register</a>
          </div>
          {/* <h1 className='text-4xl font-bold text-black-500 mt-5' id = 'features'>Features</h1> */}
          <div className="mt-6 space-x-4">
            
          </div>
        </div>
      </div>
    </div>
  )
}
