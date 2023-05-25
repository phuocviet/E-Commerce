import React from 'react'
import Navbar from '../components/navbar/navbar'

const CatchPage = () => {
    const handleButton = () => {
    window.location.href = "/";
  };
  return (
    <div>
        <Navbar />
    <div className="relative flex flex-col justify-center items-center mt-20">
    <div className='flex flex-col justify-start text-2xl'>
       <h1 className=" text-5xl text-gray-500">SORRY</h1>
      <h3 className='text-gray-500'>We couldn't find that page</h3>
      <span>
        Try searching or
        <button
          className="text-cyan-500 hover:text-sky-500 px-1"
          onClick={handleButton}
        >
          Go back to home page
        </button>{" "}
       
      </span> 
    </div> 
    </div></div>
  )
}

export default CatchPage