import React from "react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiSearch, BiCartAlt, BiUserCircle } from "react-icons/bi";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { BsBag, BsBook } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import { logout } from "../../app/features/authSlice";
import { DeleteAllProduct } from "../../app/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Cart from "../../components/cart/cart";

// import { DeleteProduct } from "../../app/features/cartSlice";

const Navbar = ({ onSearch }) => {
  const [popup, setPopup] = useState(false);
  const [onDrop, setDrop] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const currentuser =
    useSelector((state) => state.persistedReducer.auth?.user[0]?.email) || "";
  const itemsInCart = useSelector(
    (state) => state.persistedReducer.cart.cartQuantity || []
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
  };
  const handleLogout = () => {
    window.location.href = "/login";
    dispatch(logout());
    dispatch(DeleteAllProduct());
  };
  const handlePopUp = () => {
    setPopup(!popup);
    if (popup === false) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  };
  const movetoCart = () => {
    if (currentuser !== "") {
      window.location.href = "/cart";
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <nav>
      {/* top nav */}
      <div className="w-full z-20 h-[60px] bg-slate-900 flex items-center">
        {/* left side */}
        <div className=" relative w-[300px] text-white flex">
          <p className="text-xl px-5 flex items-center">Ama-Gion</p>
          <span className="px-5 w-[150px]">Delivery to Location</span>
        </div>

        {/* middle */}

        <form className=" relative w-[60%] lg:block hidden " onSubmit={handleSubmit}>
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
            className="w-[94%] h-10 pl-20 rounded-l-md focus:outline-none"
          ></input>
          <button
            type="submit"
            className="absolute text-white text-lg px-4 bg-orange-400 h-10 rounded-tr-md rounded-br-md "
          >
            <BiSearch />
          </button>
        </form>

        {/* right side */}
        <div className=" relative xl:flex lg:flex md:hidden sm:hidden text-white justify-evenly w-[450px] ">
          <button className=" lg:block md:hidden sm:hidden">Language</button>
          {currentuser !== "" ? (
            <button
              onClick={handlePopUp}
              className="xl:flex lg:flex justify-start items-center md:hidden sm:hidden"
            >
              <p>Hello, {currentuser}</p>
            </button>
          ) : (
            <div className=" mt-[15px]  xl:flex lg:flex md:hidden sm:hidden justify-between">
              <Link to="/login">Login</Link>
              <span className="px-5">/</span>
              <Link to="/signup">Sign-up</Link>
            </div>
          )}

          <button
            onClick={movetoCart}
            className="text-3xl flex sm:float-right sm:mr-3 py-3 hover:border-inherit border-solid"
          >
            <BiCartAlt />
            {itemsInCart !== 0 && (
              <span className="rounded-xl text-base font-semibold text-slate-500 px-2 bg-yellow-400">
                {itemsInCart}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* bot nav */}
      <div className="w-full h-[40px] bg-slate-700">
        <div className=" absolute left-0 top-[68px] ">
          <button
            onClick={handlePopUp}
            className="relative text-white text-2xl ml-8"
          >
            <FiMenu />
          </button>
        </div>
        <div className="text-white font-semibold">
          <Cart />
        </div>
      </div>
      {/* overlay start */}
      {popup ? (
        <div className=" z-[5] absolute top-0 w-full h-[100vh] bg-slate-900 opacity-90"></div>
      ) : (
        <div className="hidden"></div>
      )}
      {/* overlay end */}
      <div className=" absolute flex top-0 left-0">
        <ul
          className={`flex flex-col z-10 text-md  text-gray-900 w-[300px] h-[100vh] bg-white pt-4 transition-all duration-300 ease-in ${
            popup ? "left-0" : "left-[-350px] "
          } absolute`}
        >
          <div className="w-full flex bg-slate-800 mb-5 text-gray-200 py-3 px-4">
            <BiUserCircle className="text-2xl " />
            <span className="px-3">{currentuser}</span>
          </div>
          <div className=" w-[80%] flex mx-5 mb-5 lg:hidden shadow-lg">
            <input
              value={search}
              onChange={onChange}
              className="w-[90%] h-7 pl-2 py-1 text-slate-500 rounded-l-md focus:outline-none"
            ></input>
            <button
              onClick={handleSubmit}
              className=" text-white px-4 bg-orange-400 h-7 rounded-tr-md rounded-br-md "
            >
              <BiSearch />
            </button>
          </div>
          <a
            href="/"
            className="py-1 px-5 flex transition-all duration-200 ease-in hover:bg-slate-500"
          >
            <BsBag className="mr-5" />
            Store
          </a>

          <a
            href="/bookstore"
            className="py-1 px-5 flex transition-all duration-200 ease-in hover:bg-slate-500"
          >
            <BsBook className="mr-5 mt-1" />
            Book store
          </a>
          <li className="w-full border my-4 border-gray-400"> </li>
          {currentuser === "adminmail@gmail.com" && (
            <a
              href="/product"
              className="py-1 px-5 transition-all duration-200 ease-in hover:bg-slate-500"
            >
              Product storage
            </a>
          )}
          {currentuser === "adminmail@gmail.com" && (
            <li className="w-full border my-4 border-gray-400"> </li>
          )}
          {currentuser ? (
            <div className="px-5 py-1">
              <button className="hover:text-red-500 w-0" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="col-span-2 w-0 px-5">
              <Link to="/login">Login</Link>
            </div>
          )}
          <button
            onClick={handlePopUp}
            className=" text-white text-2xl absolute top-7 left-[310px] "
          >
            <AiOutlineClose />
          </button>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
