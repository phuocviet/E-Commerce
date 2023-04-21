import React, { useState } from 'react'
import Navbar from '../components/navbar/navbar'

const CreateProductForm = () => {
  const [name, setName] = useState()
  const [price, setPrice] = useState()
  const [color, setColor] = useState()
  return (
    <div>
      <Navbar/>
      <div className='m-80 '>
        <div className=''>
          <label>name</label>
          <input
          value={name} 
          onChange={(e)=>setName(e.target.value)}
          className='border-black border-r border-l'/>
        </div>
        <div>
          <label>price</label>
          <input 
          value={price} 
          onChange={(e)=>setPrice(e.target.value)}
          className='border-black border-y border-x'/>
        </div>
        <div>
          <label>color</label>
          <input 
          value={color} 
          onChange={(e)=>setColor(e.target.value)}
          className='border-black border-y border-x'/>
        </div>
        </div>
    </div>
  )
}

export default CreateProductForm