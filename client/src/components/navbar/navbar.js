import React from "react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiSearch, BiCartAlt } from "react-icons/bi";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { FiMenu } from "react-icons/fi";

const Navbar = ({ onSearch }) => {
  const [popup, setPopup] = useState(false);
  const [onDrop, setDrop] = useState(false);
  const [search, setSearch] = useState('');
  const handleDrop = () => {
    if (onDrop === false) {
      setDrop(true);
    }
    if (onDrop === true) {
      setDrop(false);
    }
  };
  const onChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await onSearch(search);
  };
  return (
    <nav>
      <div className="w-full z-20 h-[60px] bg-slate-800 flex justify-center items-center">
        <div className=" absolute left-8 text-3xl text-white">
          <p>Ama-giòn</p>
        </div>
        <div className=" absolute left-[300px] w-[60%]">
          <button
            className="absolute flex px-4 h-10 text-slate-500 bg-slate-300 rounded-tl-md rounded-bl-md"
            onClick={handleDrop}
          >
            <span className="mt-2 pr-1">All</span>
            {onDrop ? (
              <MdArrowDropUp className="mt-2 text-xl" />
            ) : (
              <MdArrowDropDown className="mt-2 text-xl" />
            )}
          </button>
          <input
            value={search}
            onChange={onChange}
            className="w-[78%] h-10 pl-20 rounded-l-md"
          ></input>
          <button
            onClick={handleSubmit}
            className="absolute text-white text-lg px-4 bg-orange-400 h-10 rounded-tr-md rounded-br-md"
          >
            <BiSearch />
          </button>
        </div>
        <div className=" absolute right-0 grid grid-cols-4 text-white w-[400px]">
          <button className="w-16">Language</button>
          <button className="w-28">
            <span className="text-sm">Hello, sign in </span>Account & list
          </button>
          <button className="">return & orders</button>
          <div className="w-16 text-3xl py-3 hover:cursor-pointer hover:border-inherit border-solid">
            <BiCartAlt />
          </div>
        </div>
      </div>
      <div className="w-full h-[40px] bg-slate-700">
        <div className=" absolute left-0 top-[68px] ">
          <button
            onClick={() => setPopup(!popup)}
            className="relative text-white text-2xl ml-8"
          >
            {popup ? <AiOutlineClose /> : <FiMenu />}
          </button>
        </div>
      </div>
      <div className="z-10">
        <ul
          className={`md:flex md:flex-col z-10 text-xl text-gray-200 w-72 pl-8 h-[100vh] bg-slate-800 pt-4 transition-all duration-300 ease-in ${
            popup ? "left-0" : "left-[-290px]"
          } absolute`}
        >
          <li className="py-5">Home</li>
          <li className="py-5">Still</li>
          <li className="py-5">Working</li>
          <li className="py-5">On</li>
          <li className="py-5">It</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
