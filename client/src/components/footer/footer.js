import React from 'react'

const Footer = () => {
  const handleScroll = () => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
  }
  return (
    <div className="w-full">
        <button className='w-full z-20 h-[60px] bg-slate-600 hover:bg-slate-500 text-white flex justify-center items-center'
          onClick={handleScroll}
        >
                Back to top
        </button>
        <div className='z-20 h-[200px] bg-slate-800 flex justify-center items-center'>

        </div>
        <div className='z-20 h-[80px] bg-slate-900 flex justify-center items-center'>
            
        </div>
    </div>
  )
}

export default Footer