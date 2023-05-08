import React from 'react'
import {AiOutlineDelete,AiOutlineEdit} from 'react-icons/ai'

const ProductsList = ({products,isDeleting,handleAbort,handleDelete,checkDelete}) => {
    const showDetail = (id) =>{
        window.location.href=`/edit/${id}`
    }
    
  return (
    <div className='flex-none min-w-full px-4 sm:px-6 md:px-0 overflow-hidden lg:overflow-auto scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-slate-100
     scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 scrollbar-track:!rounded dark:scrollbar-track:!bg-slate-500/[0.16] dark:scrollbar-thumb:!bg-slate-500/50 max-h-96
      lg:supports-scrollbars:pr-2 lg:max-h-[700px]'>
        {products.map((product) => {
            return(
            <div className='py-4' key={product.id}>
                <div className='py-1 pl-2 w-[980px] h-[60   px] ring-1 ring-slate-400 text-slate-500 cursor-default grid grid-cols-6' >
                    
                    <p>{product.name}</p>
                    <p>{product.price}<strong>$</strong></p>
                    <p className='w-[160px]'>{product.description}</p>
                    <p>amt: {product.amount}</p>
                    <img src={product.img} alt='' className='w-10' />
                    <div className='flex justify-around'>
                        {isDeleting === product.id ?
                        <div className='flex justify-between'>
                            <button onClick={()=>handleDelete(product.id)} className='hover:text-red-500 mr-2'>Yes</button>
                            <button onClick={handleAbort} className='hover:text-green-500'>No</button>
                        </div>:
                        <button onClick={()=>checkDelete(product.id)} className='hover:text-red-500'><AiOutlineDelete/></button>
                        }
                        <button onClick={()=>showDetail(product.id)} className='hover:text-green-500'><AiOutlineEdit/></button>
                    </div>
                    
                </div>
            </div>
            )
        })}
    </div>
  )
}

export default ProductsList