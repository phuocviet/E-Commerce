import React from "react";
import {AiOutlineStar, AiFillStar} from 'react-icons/ai'
import { useLocation } from "react-router-dom";

const FilterBar = (prop) => {
  const location = useLocation();

  const choseCategory = (v) => {
    prop.choseCategory(v);
  };
  const returnHome = () => {
    window.location.href = "/";
  };
  return (
    <div>
      <div className="xl:flex lg:flex lg:flex-col md:flex sm:hidden w-full text-gray-900">
        {/* Department start */}   
        <div className="flex flex-col mb-2">
          <span className="font-semibold">Department</span>
          <div className="flex ml-3">
          {location.pathname === "/" ? (
            <button
              id="home"
              className="hover:text-orange-500  underline font-semibold"
            >
              All
            </button>
          ) : (
            <button
              id="home"
              onClick={returnHome}
              className="hover:text-orange-500  peer-focus:underline"
            >
              All
            </button>
          )}
        </div>
        <div className="flex ml-3">
          {location.pathname === "/:electronic" ? (
            <button
              id="home"
              className="hover:text-orange-500  underline  font-semibold"
            >
              Electronic
            </button>
          ) : (
            <button
              id="electronic"
              onClick={() => choseCategory("electronic")}
              className="hover:text-orange-500 "
            >
              Electronic
            </button>
          )}
        </div>
        <div className="flex ml-3">
          {location.pathname === "/:fashion" ? (
            <button
              id="home"
              className="hover:text-orange-500 underline font-semibold"
            >
              Fashion
            </button>
          ) : (
            <button
              id="fashion"
              onClick={() => choseCategory("fashion")}
              className="hover:text-orange-500"
            >
              Fashion
            </button>
          )}
        </div>
        </div>
        {/* Department start */}
        {/* Customer avg start */}
        <div className="flex flex-col w-fit mb-2">
          <span className="font-semibold">AVG.Customer </span>
          <div className="flex items-center my-1">
          <AiFillStar className="text-yellow-300"/>
            <AiFillStar className="text-yellow-300"/>
            <AiFillStar className="text-yellow-300"/>
            <AiFillStar className="text-yellow-300"/>
            <AiFillStar className="text-yellow-300"/>
            <p className="flex text-sm w-20 pl-1">& up</p>
          </div>
          <div className="flex items-center my-1">
            <AiFillStar className="text-yellow-300"/>
            <AiFillStar className="text-yellow-300"/>
            <AiFillStar className="text-yellow-300"/>
            <AiFillStar className="text-yellow-300"/>
            <AiOutlineStar className="text-yellow-400"/>
            <p className="flex text-sm w-20 pl-1">& up</p>
          </div>
          <div className="flex items-center my-1">
            <AiFillStar className="text-yellow-300"/>
            <AiFillStar className="text-yellow-300"/>
            <AiFillStar className="text-yellow-300"/>
            <AiOutlineStar className="text-yellow-400"/>
            <AiOutlineStar className="text-yellow-400"/>
            <p className="flex text-sm w-20 pl-1">& up</p>
          </div>
          <div className="flex items-center my-1">
            <AiFillStar className="text-yellow-300"/>
            <AiFillStar className="text-yellow-300"/>
            <AiOutlineStar className="text-yellow-400"/>
            <AiOutlineStar className="text-yellow-400"/>
            <AiOutlineStar className="text-yellow-400"/>
            <p className="flex text-sm w-20 pl-1">& up</p>
          </div>
          <div className="flex items-center my-1">
            <AiFillStar className="text-yellow-300"/>
            <AiOutlineStar className="text-yellow-400"/>
            <AiOutlineStar className="text-yellow-400"/>
            <AiOutlineStar className="text-yellow-400"/>
            <AiOutlineStar className="text-yellow-400"/>
            <p className="flex text-sm w-20 pl-1">& up</p>
          </div>
        </div>
        {/* Customer avg end */}
        {/* Brands start */}
        <div className=" w-32 mb-2">
        <span className="font-semibold">Brands:</span>
          <div className=" ">
            <input type="checkbox" />
            <label className="px-2">Apple</label>
          </div>
          <div className=" ">
            <input type="checkbox" />
            <label className="px-2">Samsung</label>
          </div>
          <div className=" ">
            <input type="checkbox" />
            <label className="px-2">Oppo</label>
          </div>
          <div className=" ">
            <input type="checkbox" />
            <label className="px-2">Xiaomi</label>
          </div>
          <div className=" ">
            <input type="checkbox" />
            <label className="px-2">Nokia</label>
          </div>
          <div className=" ">
            <input type="checkbox" />
            <label className="px-2">Local</label>
          </div>
          <div className=" ">
            <input type="checkbox" />
            <label className="px-2">Market</label>
          </div>
          <div className=" ">
            <input type="checkbox" />
            <label className="px-2">Mercides</label>
          </div>
        </div>
        {/* Brands end */}
        {/* Price filter start */}
        <div>
          <span className="font-semibold">Price</span> 
          <ul className="flex flex-col w-32">
            <li className="">Under $25</li>
            <li className="">$25~50</li>
            <li className="">$50~100</li>
            <li className="">$100~200</li>
            <li className="">$200 & above</li>
          </ul>
          <div className="w-44 flex justify-around">
            <input className="border border-slate-600 rounded w-16"/>
            <input className="border border-slate-600 rounded w-16"/>
            <button className="px-2 py-1 border rounded">Go</button>
          </div>
        </div>
        {/* Price filter end */}
        {/* advertise start */}
        <div className="border h-[400px] w-[200px] my-40 text-gray-500 px-1">advertise here</div>
        <div className="border h-[400px] w-[200px] my-40 text-gray-500 px-1">advertise here</div>
        {/* advertise start */}
      </div>
    </div>
  );
};

export default FilterBar;
