import React from "react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiSearch, BiCartAlt } from "react-icons/bi";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { BsBag, BsBook } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../app/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Cart from "../../components/cart/cart";

// import { DeleteProduct } from "../../app/features/cartSlice";

const Navbar = ({ onSearch }) => {
  const [popup, setPopup] = useState(false);
  const [onDrop, setDrop] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();

  const currentuser =
    useSelector((state) => state.persistedReducer.auth?.user[0]?.email) || "";
  const itemsInCart = useSelector(
    (state) => state.persistedReducer.cart.quantity
  );

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
  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };
  // const handleDelete = () => {
  //   dispatch(DeleteProduct())
  // }

  return (
    <nav>
      <div className="w-full z-20 h-[60px] bg-slate-900 flex justify-center items-center">
        <div className=" absolute left-8 text-3xl text-white">
          <p>Ama-Gion</p>
        </div>
        {location.pathname === "/bookstore" && (
          <div className="absolute left-[300px] w-[60%] lg:block hidden ">
            <button
              className="absolute flex px-4 h-10 text-slate-600 bg-slate-300 rounded-tl-md rounded-bl-md "
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
              className="w-[78%] h-10 pl-20 rounded-l-md focus:outline-none"
            ></input>
            <button
              onClick={handleSubmit}
              className="absolute text-white text-lg px-4 bg-orange-400 h-10 rounded-tr-md rounded-br-md "
            >
              <BiSearch />
            </button>
          </div>
        )}
        <div className=" absolute right-0 lg:grid md:hidden grid-cols-4 text-white w-[420px] sm:hidden">
          <button className="w-16 pl-10">Language</button>
          {currentuser ? (
            <button onClick={() => setPopup(!popup)} className="col-span-2">
              {currentuser}
            </button>
          ) : (
            <div className="col-span-2 mt-[15px] ml-[80px]">
              <Link to="/login">Login</Link>
            </div>
          )}
          <button className="w-full flex text-3xl py-3 hover:border-inherit border-solid">
            <BiCartAlt />
            {itemsInCart !== 0 && (
              <span className="rounded-xl text-base font-semibold text-slate-500 px-2 bg-yellow-400">
                {itemsInCart}
              </span>
            )}
            {/* <button onClick={handleDelete}>-</button> */}
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
        <div className="mr-16 text-white font-semibold">
              <Cart/>
        </div>
      </div>
      <div className="z-10">
        <ul
          className={`flex flex-col z-10 text-xl text-gray-200 w-64 h-[100vh] bg-slate-800 pt-4 transition-all duration-300 ease-in ${
            popup ? "left-0" : "left-[-290px] "
          } absolute`}
        >
          <a
            href="/"
            className="py-1 px-2 flex transition-all duration-200 ease-in hover:bg-slate-500"
          >
            <BsBag className="mr-5" />
            Store
          </a>

          <a
            href="/bookstore"
            className="py-1 px-2 flex transition-all duration-200 ease-in hover:bg-slate-500"
          >
            <BsBook className="mr-5 mt-1" />
            Book store
          </a>
          <li className="w-full border my-4 border-gray-400"> </li>
          {currentuser === "adminmail@gmail.com" && (
            <a
              href="/product"
              className="py-1 px-2 transition-all duration-200 ease-in hover:bg-slate-500"
            >
              Product storage
            </a>
          )}
          {currentuser === "adminmail@gmail.com" && (
            <li className="w-full border my-4 border-gray-400"> </li>
          )}
          {currentuser && (
            <button
              className="hover:text-red-500 w-0 px-2 py-1"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
