import React, { useState } from "react";
import { GrNext } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { addDelivery } from "../../../app/features/orderSlice";

const COoptions = () => {
  const [delivery, setDelivery] = useState(null)
  const handleSelect = (value) => {
    setDelivery(value)
  }
  console.log(delivery);
  const handleClick = () =>{
    window.location.href = '/order'
  }
  
  return (
    <div className="flex">
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
          <div className="w-[94%] h-[590px] mx-10 shadow-2xl">
            <ul className="flex justify-around font-semibold">
              <li className=" hover:cursor-pointer">01 Shipping address</li>
              <li className=" hover:cursor-pointer text-orange-500">
                02 Shipping options...
              </li>
              <li className=" hover:cursor-pointer">03 Shopping cart</li>
              <li className=" hover:cursor-pointer">04 Payment options</li>
              <li className=" hover:cursor-pointer">05 Confirmation</li>
            </ul>
            <div 
              className="w-[94%] h-[90%] grid grid-cols-2 mx-10 my-8 "
              onClick={()=>handleSelect()}
            >
              <div className="flex relative h-40 w-[420px] pb-2 hover:cursor-pointer">
                <img alt="thumbnail-1" className="w-40 h-40 border rounded-md"/>
                <div className="flex flex-col ml-3">
                  <h4 className="text-xl">Deliver in one day</h4>
                  <p>You will get your delivery in a day </p>
                  <div className="absolute right-5 bottom-0 ">
                    <label
                      htmlFor="default-radio-1"
                    >Free</label>
                    
                  </div>
                </div> 
              </div>
              <div 
                className="flex relative h-40 w-[420px] pb-2 hover:cursor-pointer" 
                onClick={()=>handleSelect()}
              >
                <img alt="thumbnail-1" className="w-40 h-40 border rounded-md"/>
                <div className="flex flex-col ml-3">
                  <h4 className="text-xl">Deliver in two days</h4>
                  <p>You will get your delivery in a day </p>
                  <div className="absolute right-5 bottom-0 ">
                    <label
                      htmlFor="default-radio-2"
                    >Free</label>
                  </div>
                </div> 
              </div>
              <div 
              className="flex relative h-40 w-[420px] pb-2 hover:cursor-pointer"
              onClick={()=>handleSelect()}
              >
                <img alt="thumbnail-1" className="w-40 h-40 border rounded-md"/>
                <div className="flex flex-col ml-3">
                  <h4 className="text-xl">Deliver in day</h4>
                  <p>You will get your delivery in a day </p>
                  <div className="absolute right-5 bottom-0 ">
                    <label
                     htmlFor="default-radio-3"
                    >$10</label>
                    
                  </div>
                </div> 
              </div>
                <div className="relative h-40">
                <button className="w-40 h-10 bg-gray-200 text-gray-500 mt-10 absolute bottom-0"
                onClick={handleClick}
                >
                  next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default COoptions;
