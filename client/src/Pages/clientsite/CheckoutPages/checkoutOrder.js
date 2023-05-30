import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrNext, GrCheckmark } from "react-icons/gr";
import { useSelector } from "react-redux";
import { API_BASE } from "../../../APIs/Api";

const COConfirm = () => {
  const [cart, setCart] = useState([]);
  // let currentDate = new Date();
  // let present = new Date(currentDate.getTime());
  // let day = present.getDate();
  // let aDayLater = present.getDate()+1;
  // let twoDayLater = present.getDate()+2;
  // let month = present.getMonth();
  // let year = present.getFullYear();
  // const cart = useSelector((state) => state.persistedReducer?.cart.products);
  // let cartPrice = cart.reduce(
  //   (acc, obj) => acc + parseInt(obj.price * obj.quantity),
  //   0
  // );
  // const [value, setValue] = useState({
  //     orderDate: '',
  //     fee: '',
  //     total: ''
  //   })
  // const handleChose = (id) => {
  //   console.log(id);
  // }
  const userId = useSelector(
    (state) => state.persistedReducer?.auth?.user[0].id
  );
  const order = useSelector((state) => state.persistedReducer?.order?.order);
  const orderPrice = cart.reduce(
    (acc, obj) => acc + parseInt(obj.price * obj.quantity),
    0
  );
  const total = orderPrice + parseInt(order.delivery);
  useEffect(() => {
    const getCart = async () => {
      await axios
        .get(`${API_BASE}/users/${userId}?cart`)
        .then((res) => setCart(res.data.cart))
        .catch((err) => console.error(err.message));
    };
    getCart();
  }, [userId]);

  const handleClick = () => {
    window.location.href = "/payment";
  };
  return (
    <div>
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
            <div className="w-[94%] h-[440px] mx-10">
              <ul className="flex justify-around font-semibold">
                <li className=" hover:cursor-pointer">01 Shipping address</li>
                <li className=" hover:cursor-pointer">02 Delivery options</li>
                <li className=" hover:cursor-pointer text-orange-500">
                  03 Shopping cart...
                </li>
                <li className=" hover:cursor-pointer ">04 Payment options</li>
              </ul>
              <div className="w-[94%] h-[440px] flex justify-between shadow-2xl">
                <div className="flex flex-col justify-center mx-40">
                  <h3 className="text-xl flex font-semibold mb-5">
                    Confirm your order <GrCheckmark className="mx-3" />
                  </h3>

                  <label>Your informs:</label>
                  <div className="text-gray-500 ml-2">
                    <p>Name: {order.username}</p>
                    {order.email && <p>Email: {order.email}</p>}
                    <p>Phone: {order.phone}</p>
                    <p>Address:{order.address1}</p>
                  </div>
                  <div className="mt-1">
                    <label>Delivery method:</label>
                    <p className="text-gray-500 ml-2">Amazon's delivery</p>
                  </div>
                  <div className="mb-1">
                    <label>Total price:</label>
                    <p className="text-gray-500 ml-2">$ {total}</p>
                  </div>
                  <button
                    onClick={handleClick}
                    className="w-40 h-10 bg-gray-200 text-gray-500 mt-5"
                  >
                    Next
                  </button>
                </div>

                <div className="bg-gray-100 overflow-auto w-[50%] ">
                  <p className="text-gray-500 px-5">YOUR ITEMS</p>
                  {cart.map((i) => {
                    return (
                      <div key={i.id} className=" m-1 bg-white h-28">
                        <div className="flex">
                          <img src={i.img} alt="" className="w-20" />
                          <div className="grid grid-cols-3 w-[70%]">
                            <p>{i.name}</p>
                            <p className="pl-5">{i.description}</p>
                            <p>${i.price}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default COConfirm;
