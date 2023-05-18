import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_BASE } from "../../APIs/Api";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  DeleteProduct,
  DeleteAllProduct,
  UpdateCart,
} from "../../app/features/cartSlice";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [cartPopup, setCartPopup] = useState(false);
  const productsInCart = useSelector(
    (state) => state.persistedReducer?.cart?.products || []
  );
  const userId = useSelector(
    (state) => state.persistedReducer?.auth?.user[0]?.id || ""
  );
  const bill = [...productsInCart];
  const Totalprice = bill.reduce(
    (acc, obj) => acc + parseInt(obj.price * obj.quantity),
    0
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = () => {
      if (userId !== null) {
        axios
          .get(`${API_BASE}/users/${userId}`)
          .then((res) => {
            setProducts(res.data.cart);
          })
          .catch((error) => console.log(error.message));
      } else {
        setProducts([]);
      }
    };
    fetchProduct();
  }, [userId]);
  const handleClearAll = async () => {
    dispatch(DeleteAllProduct());
    products.forEach(() =>
      axios
        .patch(`${API_BASE}/users/${userId}`, {
          cart: [],
        })
        .then(() => dispatch(DeleteAllProduct()))
        .catch((error) => console.log(error.message))
    );
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const setCartPopuptrue = () => {
    setCartPopup(true);
    document.body.style.overflow = "hidden";
  };
  const setCartPopupfalse = () => {
    setCartPopup(false);
    document.body.style.overflow = "scroll";
  };
  const handlDelete = (id) => {
    const DeleteFromCart = async () => {
      const productIndex = products.findIndex((p) => p.id === id);
      const updateCart = products.splice(productIndex, 1);
      await axios
        .patch(`${API_BASE}/users/${userId}`, {
          cart: [...updateCart],
        })
        .then(() => {
          dispatch(DeleteProduct(id));
        })
        .catch((error) => console.log(error.message));
    };
    DeleteFromCart();
  };
  const handleUpdate = (e, id) => {
    dispatch(
      UpdateCart(
        productsInCart.map((i) => {
          if (i.id === id) {
            return { ...i, quantity: e.target.value };
          } else {
            return i;
          }
        })
      )
    );
    console.log(products);
  };

  return (
    <div>
      {productsInCart.length !== 0 && (
        <button
          onClick={setCartPopuptrue}
          className="float-right transition-all ease-in"
        >
          Open
        </button>
      )}
      <div
        className={`z-20 absolute ${
          cartPopup ? " right-0 " : "right-[-250px] hidden"
        } w-52 shadow-lg border border-slate-400 h-[100vh] bg-white`}
      >
        <button
          onClick={setCartPopupfalse}
          className="text-black hover:text-orange-500 z-20 mx-5"
        >
          Close
        </button>
        <hr></hr>
        {productsInCart.map((i) => {
          const newprice = i.price * i.quantity;
          return (
            <div key={i.id} className="px-5 my-1 bg-slate-100 h-32">
              <div className="flex flex-col text-slate-800">
                <p>{i.name}</p>
                <div className="flex">
                  <img src={i.img} alt="" className="w-10" />
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={i.quantity}
                    placeholder={i.quantity}
                    onChange={(e) => handleUpdate(e, i.id)}
                    className="w-12 h-8 px-1 border"
                  />
                </div>
                <p>{formatter.format(newprice)}</p>
              </div>
              <button
                onClick={() => handlDelete(i.id)}
                className="text-red-500 hover:text-red-400"
              >
                Delete
              </button>
            </div>
          );
        })}
        <hr></hr>
        <p className="text-black pl-1">Total: {formatter.format(Totalprice)}</p>
        <button onClick={handleClearAll} className="text-black px-1">
          clear
        </button>
      </div>
    </div>
  );
};

export default Cart;
