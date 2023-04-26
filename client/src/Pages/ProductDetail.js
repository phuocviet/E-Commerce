import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/navbar/navbar'

const ProductDetail = () => {
    const {id}=useParams()
    const [product, setProduct] = useState('')
    useEffect(() => {
        const getData = async () =>{
            await axios.get('http://localhost:4000/products/'+id)
            .then((res) =>setProduct(res.data))
            .catch((err) => console.log(err.message))
        } 
        getData()  
    },[id])
  return (
    <div>   
        <Navbar/>
        <div>
            {product&&
            <div className='grid grid-cols-3 mt-20 mx-20'>
                <img src={product.img} alt=''
                    className='w-[400px] mt-10'
                />
                <body className='font-mono mt-10'>
                    <h4 className='text-2xl'>{product.name}</h4>
                    <p>Description: {product.description}</p>
                    <p>Amount: {product.amount}</p>
                    <button className='text-xl bg-orange-500 text-white px-4 py-0.5 rounded-lg mt-40'>BUY</button>
                </body>
            </div>
            }
        </div>
    </div>
  )
}

export default ProductDetail