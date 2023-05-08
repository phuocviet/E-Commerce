import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../../components/navbar/sidebar'
import { toast, ToastContainer } from 'react-toastify'

const EditProduct = () => {
    const {id} = useParams()
    const [name, setName] = useState('')
    const [img, setImg] = useState('')
    const [price,setPrice] = useState('')
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [product, setProduct] = useState('')
    useEffect(() => {
        const getData = async () =>{
            await axios.get('http://localhost:4000/products/'+id)
            .then((res) => setProduct(res.data))
            .catch((err) => console.log("ERROR: "+err.message))
        }
        getData()
    },[id])
    const handleFile = (e) =>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function(event) {
          setImg(event.target.result);
        };
        reader.readAsDataURL(file);
    }
    let item = {name, img, price, description, amount}
    const updateProduct = async (e) => {
        e.preventDefault()
        console.log(img);
        if(!name || !price || !description || !img || !amount){
            toast.warning("You must fill all the inform")
        }else{
           await axios.put('http://localhost:4000/products/'+id,item)
        .then((json) => JSON.stringify(json.data))
        .then((res) => {
            toast.success('Update success')
            setTimeout(() => {
                window.location.reload(true)
            }, 2000);
        })
        .catch((err)=>{
            toast.error("Error:"+err.message)
        }) 
        }
      }
  return (
    <div>
        <Sidebar/>
        <ToastContainer/>
        {product && 
        <div className='grid grid-cols-3 mt-16'>
            <img className=' w-[400px] ml-10' alt='' src={product.img}/>
            <form className='mx-20 col-span-2 w-[90%] h-max bg-white ring-gray-400 ring-1' onSubmit={updateProduct}>  
            <div className=' pt-8 pl-5 block'>
                <label htmlFor='title' className=' text-neutral-600'>Title: </label>
                <input id='title' className='px-2 block w-[95%] mr-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-inset focus:ring-0 sm:text-sm sm:leading-6'
                    value={name} onChange={(e) => setName(e.target.value)} placeholder={product.name}
                />
            </div>
            <div className='pt-8 pl-5 block'>
                <label htmlFor='money' className='text-neutral-600'>Price: </label>
                <input id='money' className='px-2 block w-[95%] mr-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-inset focus:ring-0 sm:text-sm sm:leading-6'
                    value={price} onChange={(e) => setPrice(e.target.value)} placeholder={product.price}
                />
            </div>
            <div className='pt-8 pl-5 block'>
                <label htmlFor='description' className='text-neutral-600'>Description: </label>
                <input id='description' type='text' className='px-2 block w-[95%] mr-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-inset focus:ring-0 sm:text-sm sm:leading-6 '
                    value={description} onChange={(e) => setDescription(e.target.value)} placeholder={product.description}
                />
            </div>
            
            <div className='pt-8 pl-5 block'>
                <label className='text-neutral-600'>Amount: </label>
                <input className='px-2 block w-[95%] mr-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-inset focus:ring-0 sm:text-sm sm:leading-6'
                    value={amount} onChange={(e)=>setAmount(e.target.value)} type='number' placeholder={product.amount}
                />
            </div>
        
            <div className='pt-8 pl-5 block'>
            <label className='text-neutral-600'>Thumbnail: </label>
                <input className='px-2 block w-[95%] mr-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none  focus:ring-inset focus:ring-0 sm:text-sm sm:leading-6'
                    type='file' onChange={handleFile}
                />
            </div>
            <div className=' col-span-full text-center my-5'>
                <button type='submit' className='hover:shadow-gray-400 hover:shadow-lg duration-100 bg-orange-500 text-white py-1 rounded-md w-[450px]'>Update</button>
            </div>
        </form>
            
        </div>
        }
        
    </div>
  )
}

export default EditProduct