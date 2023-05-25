import React, { useEffect, useState } from "react";
import axios from 'axios'
import {API_BASE} from '../../../APIs/Api'
import { GrNext } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../../app/features/orderSlice";
import { ToastContainer, toast } from "react-toastify";
import {HiLocationMarker} from 'react-icons/hi'

const COAddress = () => {
  const [formValue, setFormValue] = useState({
    username:"",
    phone:"",
    address1:"",
    address2:"",
  })
  const [selectedValue, setSelectedValue] = useState(null)
  const [subAddress, setSubAddress] = useState([])
  const dispatch = useDispatch()
  const userInfo = useSelector((state)=>state.persistedReducer?.auth?.user[0])
  const userId = useSelector((state)=>state.persistedReducer?.auth?.user[0].id)

  useEffect(()=>{
    const getAddress = async () =>{
      await axios.get(`${API_BASE}/users/${userId}`)
      .then((res)=>{
        setSubAddress(res.data.subAddress)
      })
      .catch((err)=>console.error(err.message))
    }
    getAddress()
  },[userId])
  const handleChose = (item) => {
    
      setSelectedValue(item)
    
  }
  
  console.log(selectedValue);
  const handleChange =(e)=>{
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value
    })
    
  }
  const handleSubmit = async (e) => {
    if(formValue!==null){
      await axios.patch(`${API_BASE}/users/${userId}`,{
          subAddress:[ ...subAddress,formValue]
      })
      .catch((error) => {
        debugger
        console.error(error.message);
      }) 
    }else{
      e.preventDefault()
      toast.warn('Something missing')
    }
    
  }
  const handleClick = () => {
    if(selectedValue===null){
      toast.warn('Something missing')
    }else{
      dispatch(addOrder(selectedValue))
      window.location.href = "/options"
    }
  };

  return (
    <div className="flex">
      <ToastContainer/>
      <div className="flex flex-col justify-center h-[100vh] w-40 bg-slate-800">
        <button onClick={handleClick}>
          <GrNext className="bg-gray-200 rounded-3xl text-3xl p-1 mx-10" />
        </button>
      </div>
      <div className=" w-full">
        <div className="flex justify-center py-5">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png"
            alt=""
            className="w-40 h-fit"
          />
        </div>
        <div className="w-full">
          <div className="w-[94%] h-[70vh] mx-10">
            <ul className="flex justify-around font-semibold">
              <li className=" hover:cursor-pointer text-orange-500">
                01 Shipping address...
              </li>
              <li className=" hover:cursor-pointer">02 Shipping options</li>
              <li className=" hover:cursor-pointer">03 Shipping address</li>
              <li className=" hover:cursor-pointer">04 Shipping address</li>
              <li className=" hover:cursor-pointer">05 Shipping address</li>
            </ul>
            <div className="grid grid-cols-2">
              <div className="my-10">
                <span className="flex gap-2">
                  Chose address<HiLocationMarker/>
                </span>
                <div className="w-[600px] flex flex-col gap-2"> 
                  <div className={`${selectedValue=== userInfo ?`bg-gray-300 ring ring-sky-600`:`bg-gray-300`} w-full px-4 py-2 flex justify-between cursor-pointer`}
                  onClick={()=>handleChose(userInfo)}>
                    <div>
                      <p>{userInfo.username}</p>
                      <p className="text-gray-600">Address: {userInfo.address}</p>
                      <p className="text-gray-600">Phone number: {userInfo.phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Primary</p>
                    </div>
                    
                  </div>
                  {subAddress.map((item, index)=>{
                    return(
                      <div key={index} className={`${selectedValue=== item ?`bg-gray-300 ring ring-sky-600`:`bg-gray-300`} w-full px-4 py-2 flex justify-between cursor-pointer`}
                      onClick={()=>handleChose(item)}>
                        <div>
                          <p>{item.username}</p>
                          <p className="text-gray-600">Address: {item.address1} / {item.address2}</p>
                          <p className="text-gray-600">Phone number: {item.phone}</p>
                        </div>  
                      </div>
                    )
                  })}
                </div>
              </div>

              <form className="w-[94%] h-[90%] mx-10 my-8 bg-gray-100 flex flex-col justify-center " onSubmit={handleSubmit}>
                
                <h3 className="font-semibold text-lg ">New address</h3>
                <div className="flex flex-col mb-3">
                  <label>User name:(*)</label>
                  <input
                    name="username"
                    value={formValue.username}
                    onChange={handleChange}
                    className="border-slate-400 border w-64 rounded-sm"
                  />
                </div>
                <div className="grid grid-cols-2 relative">
                  <div>
                    <div className="flex flex-col mb-3">
                      <label>Phone number:(*)</label>
                      <input
                        type="number"
                        name="phone"
                        value={formValue.phone}
                        onChange={handleChange}
                        className="border-slate-400 border w-64 rounded-sm"
                      />
                    </div>
                    <div className="flex flex-col mb-3">
                      <label>Address 1:(*)</label>
                      <input
                        name="address1"
                        value={formValue.address1}
                        onChange={handleChange}
                        className="border-slate-400 border w-64 rounded-sm"
                      />
                    </div>
                    <div className="flex flex-col mb-3">
                      <label>Address 2:(*)</label>
                      <input
                        name="address2"
                        value={formValue.address2}
                        onChange={handleChange}
                        className="border-slate-400 border w-64 rounded-sm"
                      />
                    </div>
                  </div>
                  
                </div>
              
              <button
                type='submit'
                className="w-40 h-10 px-1 bg-gray-200 text-gray-500 mx-1 "
                >
                  Add this address
                </button> 
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default COAddress;
