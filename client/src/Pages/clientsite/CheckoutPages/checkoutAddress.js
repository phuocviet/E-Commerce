import React from 'react'
import {GrNext} from 'react-icons/gr'

const COAddress = () => {

    const handleClick = () => {
        window.location.href = "/options"
    }
  return (
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
                <div className='w-[94%] h-[70vh] mx-10'>
                    <ul className='flex justify-around font-semibold'>
                        <li className=' hover:cursor-pointer text-orange-500'>01 Shipping address...</li>
                        <li className=' hover:cursor-pointer'>02 Shipping options</li>
                        <li className=' hover:cursor-pointer'>03 Shipping address</li>
                        <li className=' hover:cursor-pointer'>04 Shipping address</li>
                        <li className=' hover:cursor-pointer'>05 Shipping address</li>    
                    </ul>
                    <div className='w-[94%] h-[90%] mx-10 my-8 grid grid-cols-2'>
                        <div className='px-28 py-5'>
                            <h3 className='font-semibold text-lg mb-20'>Your informs</h3>
                            <div className='flex flex-row justify-between'>
                                <div className='flex flex-col'>
                                    <label>First name:</label>
                                    <input id='name' className='border-slate-400 border w-64 rounded-sm'/>  
                                </div>
                                <div className='flex flex-col mb-3'>
                                    <label>Last name:</label>
                                    <input id='name' className='border-slate-400 border w-64 rounded-sm'/>  
                                </div>
                            </div>
                            <div className='grid grid-cols-2'>
                                <div>
                                    <div className='flex flex-col mb-3'>
                                        <label>Email:</label>
                                        <input id='name' className='border-slate-400 border w-64 rounded-sm'/>  
                                    </div>
                                    <div className='flex flex-col mb-3'>
                                        <label>Phone number:</label>
                                        <input type='number' id='name' className='border-slate-400 border w-64 rounded-sm'/>  
                                    </div>
                                    <div className='flex flex-col mb-3'>
                                        <label>Address 1:</label>
                                        <input id='name' className='border-slate-400 border w-64 rounded-sm'/>  
                                    </div>
                                    <div className='flex flex-col mb-3'>
                                        <label>Address 2:</label>
                                        <input id='name' className='border-slate-400 border w-64 rounded-sm'/>  
                                    </div>   
                                </div>
                                
                            </div>
                            
                            <button 
                                className='w-40 h-10 bg-gray-200 text-gray-500 mt-10'
                                onClick={handleClick}
                            >Next</button>
                        </div>
                        <div className=' shadow-2xl'>
                            <img src='https://th.bing.com/th/id/OIP.flerb1lwa43D0RqCJj7qqQHaEC?pid=ImgDet&rs=1' alt='' className='w-full h-full'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default COAddress