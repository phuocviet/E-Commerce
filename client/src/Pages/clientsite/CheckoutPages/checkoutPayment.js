import React, { useEffect, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { GrNext } from "react-icons/gr";
import { FaCcVisa, FaCreditCard } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_BASE } from "../../../APIs/Api";
import { DeleteAllProduct } from "../../../app/features/cartSlice";
import { ToastContainer, toast } from "react-toastify";

const COPayment = () => {
  const [payment, setPayment] = useState("option 1");
  const [cart, setCart] = useState([]);
  const [orderDetail, setOrderDetail] = useState(null);
  const [formValue, setFormValue] = useState({
    addressName: "",
    notes: "",
    phone: "",
  });
  const [preCheckout, setPreCheckout] = useState(null);

  const userId = useSelector(
    (state) => state.persistedReducer?.auth?.user[0].id
  );
  const deliveryFee = useSelector(
    (state) => state.persistedReducer?.order?.order.delivery
  );
  useEffect(() => {
    const getAmount = async () => {
      await axios
        .get(`${API_BASE}/users/${userId}`)
        .then((res) => {
          setCart(res.data.cart);
          setPreCheckout(res.data.order);
        })
        .catch((err) => console.error(err.message));
    };
    getAmount();
  }, [userId]);
  const total = cart.reduce(
    (acc, obj) => acc + parseInt(obj.price * obj.quantity),
    0
  );
  const totalCost = parseInt(total) + parseInt(deliveryFee);

  const selectPayment = (e) => {
    setPayment(e.target.value);
  };
  const dispatch = useDispatch();
  //COD handle
  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };
  const handleSetDetail = () => {
    setOrderDetail(formValue);
  };
  console.log(orderDetail);
  //Paypal config
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalCost,
          },
        },
      ],
    });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture().then((detail) => {
      setOrderDetail({
        detail,
      });
    });
  };
  const onCancel = () => {
    const newOrder = { ...preCheckout, orderDetail };
    axios
      .patch(`${API_BASE}/users/${userId}`, {
        cart: [],
        order: newOrder,
      })
      .catch((err) => console.error(err.message));
    dispatch(DeleteAllProduct());
    window.location.href = "/cart";
  };
  const onError = (err) => {
    toast.error("There're '0' item in your cart");
  };
  //Next button handle
  const handleClick = async () => {
    const newOrder = { preCheckout, orderDetail };
    await axios
      .patch(`${API_BASE}/users/${userId}`, {
        cart: [],
        order: newOrder,
      })
      .catch((err) => console.error(err.message));
    dispatch(DeleteAllProduct());
    window.location.href = "/cart";
  };

  return (
    <div className="flex">
      <ToastContainer />
      <div className="flex flex-col justify-center h-[100vh] w-40 bg-slate-800">
        <button>
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
              <li className=" hover:cursor-pointer">03 Shopping cart</li>
              <li className=" hover:cursor-pointer text-orange-500">
                04 Payment options...
              </li>
            </ul>
            <div className="w-[94%] h-[440px]  mx-10 my-8 grid grid-cols-2 shadow-2xl">
              <div className="px-28 py-5     ">
                <h3 className="font-semibold text-lg mb-1">
                  Chose your payment
                </h3>
                <div className="flex w-full h-8 mb-10">
                  <div className="flex items-center mr-5  ">
                    <input
                      id="default-radio-1"
                      type="radio"
                      value="option 1"
                      name="default-radio"
                      checked={payment === "option 1"}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                      onChange={selectPayment}
                    />
                    <label
                      htmlFor="default-radio-1"
                      className="ml-2 text-sm font-medium text-gray-900 "
                    >
                      Cash on delivery(COD)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="default-radio-2"
                      type="radio"
                      value="option 2"
                      name="default-radio"
                      checked={payment === "option 2"}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                      onChange={selectPayment}
                    />
                    <label
                      htmlFor="default-radio-2"
                      className="ml-2 text-sm font-medium text-gray-900 "
                    >
                      Paypal
                    </label>
                  </div>
                </div>
                {payment === "option 1" && (
                  <div>
                    <div className="flex flex-col mb-3">
                      <label>Name of address:</label>
                      <input
                        id="addressName"
                        name="addressName"
                        className="border-slate-400 border w-[80%] px-1 rounded-sm"
                        placeholder="Ex: Home or Company"
                        onChange={handleChange}
                        onBlur={handleSetDetail}
                      />
                    </div>
                    <div className="flex flex-col mb-3">
                      <label>Notes:</label>
                      <input
                        id="notes"
                        name="notes"
                        className="border-slate-400 border w-[80%] px-1 rounded-sm"
                        placeholder="Ex: Call me when you arrive"
                        onChange={handleChange}
                        onBlur={handleSetDetail}
                      />
                    </div>
                    <div className="flex justify-between w-[80%]">
                      <div className="flex flex-col mb-3">
                        <label>Phone number:</label>
                        <input
                          id="phone"
                          name="phone"
                          className="border-slate-400 border w-18 text-lg px-1 rounded-sm "
                          placeholder="(+Country) number"
                          onChange={handleChange}
                          onBlur={handleSetDetail}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {payment === "option 2" && (
                  <div className="flex flex-col">
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                      onCancel={onCancel}
                    />
                  </div>
                )}

                <button
                  className="w-40 h-10 bg-gray-200 text-gray-500 mt-10"
                  onClick={handleClick}
                >
                  Finish
                </button>
              </div>
              <div className="border-x px-20 py-20">
                <div>
                  <h4 className="font-semibold">
                    Gift Cards & Promotional Codes
                  </h4>
                  <p className="underline">
                    Enter a gift card or a Promotional code
                  </p>

                  <button className="mt-10 font-semibold">
                    Add a Bank Account
                  </button>
                </div>
                <div className="flex flex-col h-40 justify-end">
                  <p className="text-gray-400">
                    Amazon accept alls major credit and debit card{" "}
                  </p>
                  <div className="flex">
                    <FaCcVisa className="text-3xl" />
                    <FaCreditCard className="text-3xl ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default COPayment;
