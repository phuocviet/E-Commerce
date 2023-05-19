import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {GrNext} from 'react-icons/gr'
import { useSelector } from 'react-redux'
import { API_BASE } from '../../../APIs/Api'

const COConfirm = () => {
    const [cart, setCart] = useState([])
    const userId = useSelector((state)=>state.persistedReducer?.auth?.user[0].id)
    useEffect(()=>{
        const getCart = async() =>{
            await axios.get(`${API_BASE}/users/${userId}?cart`)
            .then((res)=>setCart(res.data.cart))
            .catch((err) => console.error(err.message))
        };
        getCart()
    },[userId])
  return (
    <div>
        <div className='flex'>
        <div className='flex flex-col justify-center h-[100vh] w-40 bg-slate-800'>
            <button>
                <GrNext className='bg-gray-200 rounded-3xl text-3xl p-1 mx-10'/>
            </button> 
        </div>
        <div className=' w-full'>
            <div className='flex justify-center py-5'>
                <img src='https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png' alt='' className='w-40 h-fit'/>
            </div>
            <div className="w-full">
                <div className='w-[94%] h-[440px] mx-10'>
                    <ul className='flex justify-around font-semibold'>
                        <li className=' hover:cursor-pointer'>01 Shipping address</li>
                        <li className=' hover:cursor-pointer'>02 Shipping options</li>
                        <li className=' hover:cursor-pointer '>03 Payment options</li>
                        <li className=' hover:cursor-pointer text-orange-500'>04 Confirmation...</li>
                        <li className=' hover:cursor-pointer'>05 Shipping address</li>    
                    </ul>
                    <div className='w-[94%] h-[440px]  mx-10 my-8 flex justify-between shadow-2xl'>
                        <div className='mx-12 my-20'>
                            <h3 className='text-xl font-semibold mb-5'>Confirm your payment</h3>
                            <div className='mb-1'>
                                <label>Payment method:</label>
                                <p className='text-gray-500'>Paypal</p>
                            </div>
                            <label>Your informs:</label>
                            <div className='text-gray-500'>
                                <p>Name: Josh Van A</p>
                                <p>Name: Josh Van A</p>
                                <p>Name: Josh Van A</p>
                                <p>Name: Josh Van A</p> 
                            </div>
                            
                        </div>
                        <div className='bg-gray-100 overflow-auto w-[400px] '>
                            {cart.map((i)=>{
                                return(
                                    <div key={i.id} className=' m-1 bg-white h-28'>
                                        <div className='flex'>
                                          <img src={i.img} alt='' className='w-20'/>
                                          <div className='grid grid-cols-3 w-[70%]'>
                                            <p>{i.name}</p>  
                                            <p className='pl-5'>{i.description }</p>
                                            <p>${i.price}</p>
                                          </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default COConfirm