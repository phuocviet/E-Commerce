import React from 'react'
import {GrNext} from 'react-icons/gr'

const COoptions = () => {
    const handleClick = () => {
        window.location.href = "/payment"
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
                <div className='w-[94%] h-[590px] mx-10 shadow-2xl'>
                    <ul className='flex justify-around font-semibold'>
                        <li className=' hover:cursor-pointer'>01 Shipping address</li>
                        <li className=' hover:cursor-pointer text-orange-500'>02 Shipping options...</li>
                        <li className=' hover:cursor-pointer'>03 Payment options</li>
                        <li className=' hover:cursor-pointer'>04 Shipping address</li>
                        <li className=' hover:cursor-pointer'>05 Shipping address</li>    
                    </ul>
                    <div className='w-[94%] h-[90%]  mx-10 my-8 '>
                        <div className='px-28 py-5 '>
                            <h3 className='font-semibold text-lg mb-5'>Your informs</h3>
                            <div className='flex flex-col mb-3'>
                                <label className='font-semibold'>Options:</label>
                                <select type="" id='name' className='border-slate-400 border w-fit rounded-md px-1'>
                                    <option>Amazon's delivery</option>
                                    <option>Express's delivery</option>
                                    
                                </select>  
                            </div>
                            
                            <div className='flex flex-col mb-3'>
                                <label className='font-semibold'>Delivery fee:</label>
                                <span>$ ---price---</span>
                            </div>
                            <div className='flex flex-col mb-3'>
                                <label className='font-semibold'>Delivery time:</label>
                                <span>dd/mm/yyyy</span>
                            </div>
                            <div className='flex flex-col mb-3'>
                                <label className='font-semibold'>Total bill:</label>
                                <span className='py-5 px-2 h-40 overflow-auto border'> 
                                    Deliveryprice + CartPrice
                                </span>
                            </div>
                            
                            <button onClick={handleClick} className='w-40 h-10 bg-gray-200 text-gray-500 mt-5'>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default COoptions