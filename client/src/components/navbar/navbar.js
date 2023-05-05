import React from "react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiSearch, BiCartAlt } from "react-icons/bi";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({ onSearch }) => {
  const [popup, setPopup] = useState(false);
  const [onDrop, setDrop] = useState(false);
  const [search, setSearch] = useState("");
  // const [isLogin, setIsLogin] = useState(false)

  const currentuser = useSelector(state => state.auth.user[0].email);
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
    localStorage.setItem(search);
  };

  return (
    <nav>
      <div className="w-full z-20 h-[60px] bg-slate-800 flex justify-center items-center">
        <div className=" absolute left-8 text-3xl text-white">
          <p>Ama-Gion</p>
        </div>
        <div className="absolute left-[300px] w-[60%] lg:block hidden ">
          <button
            className="absolute flex px-4 h-10 text-slate-500 bg-slate-300 rounded-tl-md rounded-bl-md "
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
            className="w-[78%] h-10 pl-20 rounded-l-md "
          ></input>
          <button
            onClick={handleSubmit}
            className="absolute text-white text-lg px-4 bg-orange-400 h-10 rounded-tr-md rounded-br-md "
          >
            <BiSearch />
          </button>
        </div>
        <div className=" absolute right-0 lg:grid md:hidden grid-cols-4 text-white w-[500px] sm:hidden">
          <button className="w-16 pl-10">Language</button>
            { currentuser? 
            <button className="col-span-2">{currentuser}</button>:
            <Link to="/login" className="w-28">
            <span className="text-sm">Hello, sign in </span>Account & list
            </Link>
            }
          <button className="w-16 text-3xl py-3 hover:border-inherit border-solid">
            <BiCartAlt />
          </button>
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
          className={`flex flex-col z-10 text-xl text-gray-200 w-64 h-[100vh] bg-slate-800 pt-4 transition-all duration-300 ease-in ${
            popup ? "left-0" : "left-[-290px]"
          } absolute`}
        >
          <a
            href="/"
            className="py-1 px-2 transition-all duration-200 ease-in hover:bg-slate-500"
          >
            Products
          </a>
          {currentuser && <a
            href="/product"
            className="py-1 px-2 transition-all duration-200 ease-in hover:bg-slate-500"
          >
            Product store
          </a>}
          <a
            href="/bookstore"
            className="py-1 px-2 transition-all duration-200 ease-in hover:bg-slate-500"
          >
            Book store
          </a>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
