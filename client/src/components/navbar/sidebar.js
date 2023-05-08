import React, { useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineDashboard, AiOutlineAppstore, AiOutlineArrowRight } from "react-icons/ai";
import {useSelector} from 'react-redux'
import { logout } from '../../app/features/authSlice';
import {useDispatch} from 'react-redux'

const Sidebar = () => {
    const [popup, setPopup] = useState()
    const dispacth = useDispatch()
    
    const currentuser = useSelector(state => state.auth?.user[0]?.email);
  return (
    <nav>
        <div className="z-10 flex flex-col">
            <div className="flex absolute left-0 top-[15px] ">
            <button
                onClick={() => setPopup(!popup)}
                className="relative text-slate-500 text-2xl ml-1"
            >
                <AiOutlineArrowRight />
            </button>
            <h2 className='text-xl text-slate-500 font-bold pl-5'>Ama-Gion</h2>
            </div>
            <ul
            className={`flex flex-col z-10 text-xl text-gray-200 w-64 h-[100vh] bg-gray-800 pt-4 transition-all duration-300 ease-in ${
                popup ? "left-0" : "left-[-290px]"
            } absolute`}
            >
            <div className='flex w-full h-18 mb-5 shadow-lg shadow-slate-700'>
                <h2 className='text-lg font-bold pl-10'>Ama-Gion</h2>
              <button
              onClick={() => setPopup(!popup)}
              className="relative text-slate-500 text-2xl mb-5 ml-[100px]  "
              >
                  <AiOutlineArrowLeft /> 
              </button>
            </div>
            <a
                href="/product"
                className="py-1 px-2 flex transition-all duration-200 ease-in hover:bg-slate-500"
            >
                <AiOutlineDashboard className='mr-5'/>
                Dashboard
            </a>
            <a
                href="/product"
                className="py-1 px-2 flex transition-all duration-200 ease-in hover:bg-slate-500"
            >
                <AiOutlineAppstore className='mr-5'/>
                Product store
            </a>
            {/* <a
                href="/product"
                className="py-1 px-2 flex transition-all duration-200 ease-in hover:bg-slate-500"
            >
              <AiOutlineAppstore className='mr-5'/>
                Billing (None)
            </a>
            <a
                href="/product"
                className="py-1 px-2 flex transition-all duration-200 ease-in hover:bg-slate-500"
            >
              <AiOutlineAppstore className='mr-5'/>
                Chart (None)
            </a> */}
            <li className="w-full border my-4 border-gray-400"> </li>
            {currentuser && <button 
            className="hover:text-red-500 w-0 py-1 px-2"
            onClick={() => dispacth(logout())}>Logout
            </button>}
            </ul>
            <div className=" absolute right-0 lg:grid md:hidden grid-cols-3 text-slate-800 w-[420px] sm:hidden">
          
            { currentuser ? 
            <button onClick={() => setPopup(!popup)} className="col-span-2">Welcome, {currentuser}</button>:
            <button onClick={() => window.location.href='/login'} className=" col-span-2">
              Let's login
            </button>
            }
          <button onClick={() => window.location.href='/'} className="w-16  py-3 hover:border-inherit border-solid">
            Store
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Sidebar