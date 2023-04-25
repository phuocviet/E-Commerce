import React, { useState } from 'react'
import {AiOutlineDelete,AiOutlineEdit} from 'react-icons/ai'

const ProductsList = ({products,isDeleting,handleAbort,handleDelete,setIsDeleting,handleEdit}) => {
    const [name, setName] = useState('')
    const [img, setImg] = useState('')
    const [price,setPrice] = useState('')
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [isEditing, setIsEditing] = useState(false)

    const enableEdit = () => {
        setIsEditing(true)
    }
  return (
    <div>
        {products.map((product) => {
            return(
            <form className='py-4' >
                <div className='py-1 pl-2 w-[980px] h-[60   px] ring-1 ring-slate-400 text-slate-500 grid grid-cols-6' key={product.id}>
                    {isEditing?
                    <input placeholder={product.name} value={name} onChange={(e) => setName(e.target.value)}/>:
                    <p>{product.name}</p>
                    }
                    <p>{product.price}<strong>$</strong></p>
                    <p>{product.description}</p>
                    <p>{product.amount}</p>
                    <img src={product.img} alt='' className='w-10' />
                    <div className='flex justify-around'>
                        {isDeleting?
                        <div className='flex justify-between'>
                            <button onClick={()=>handleDelete(product.id)} className='hover:text-red-500 mr-2'>Yes</button>
                            <button onClick={handleAbort} className='hover:text-green-500'>No</button>
                        </div>:
                        <button onClick={() => setIsDeleting(true)} className='hover:text-red-500'><AiOutlineDelete/></button>
                        }
                        <button onClick={enableEdit} className='hover:text-green-500'><AiOutlineEdit/></button>
                    </div>
                    
                </div>
            </form>
            )
        })}
    </div>
  )
}

export default ProductsList