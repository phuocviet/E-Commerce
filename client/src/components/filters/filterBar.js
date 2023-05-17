import React from 'react'
import { useLocation } from 'react-router-dom'

const FilterBar= (prop) => {
    const location = useLocation()

    const choseCategory = (v) => {
        
        prop.choseCategory(v)
        
    }
    const returnHome = () =>{
        window.location.href = "/"
    }
  return (
    <div>
      
       <div className="lg:flex md:flex sm:hidden text-gray-500 w-[88%] h-[10px] mx-20">
          <div className="flex mr-6">
            {location.pathname === '/' ? 
            <button id='home' className="hover:text-gray-800 text-lg underline font-semibold">Home</button>:
            <button id='home' onClick={returnHome} className="hover:underline text-lg peer-focus:underline">Home</button>
            }
          
          </div>
          <div className="flex mr-6">
          {location.pathname === '/:electronic' ? 
            <button id='home' className="hover:text-gray-800 text-lg underline  font-semibold">Electronic</button>:
            <button id='electronic' onClick={()=>choseCategory('electronic')} className="hover:underline text-lg">Electronic</button>
          }
          </div>
          <div className="flex mr-6">
          {location.pathname === '/:fashion' ? 
            <button id='home' className="hover:text-gray-800 text-lg underline font-semibold">Fashion</button>:
            <button id='fashion' onClick={()=>choseCategory('fashion')} className="hover:underline text-lg">Fashion</button>
          }
          </div>
        </div>
    </div>
   
  )
}

export default FilterBar
