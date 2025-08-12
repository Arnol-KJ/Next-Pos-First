'use client'
import React, { Children, useEffect,useState  } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import Login from './Login'
import "@/app/globals.css"
import Image from 'next/image'
import Propup from './components/Propup'



export default function Navbar() {
  const [modal , setModal] = useState<boolean>(false)

  const openModal = () => setModal(true)
  const closeModal = () =>setModal(false)

  return (
    <div>
      <div className="fixed top+0 w-full bg-gray-50 p-2.5 flex justify-between items-center shadow-md z-50">
        <div className="text-2xl font-bold text-red-600">
          <Image src="/logo.png" 
          width={100}
          height={5}
          alt="" />
        </div>
        <div className="space-x-6">
          <a href="#features" className="text-gray-700 hover:text-red-600 font-medium">Features</a>
          <a href="#pricing" className="text-gray-700 hover:text-red-600 font-medium">Pricing</a>
          <a href="#contacts" className="text-gray-700 hover:text-red-600 font-medium">Contacts</a>
        </div>
        <button className = "bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"
        onClick={openModal}
        >
          Login
        </button>
        <Propup isOpen = {modal} onClose={closeModal}>
          <Login/>
        </Propup>
      </div>
    </div>
  )
}
