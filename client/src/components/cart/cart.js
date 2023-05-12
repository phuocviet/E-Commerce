import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_BASE } from "../../APIs/Api";
import axios from "axios";
import { useDispatch } from "react-redux";
import { DeleteAllProduct, DeleteProduct } from "../../app/features/cartSlice";


const Cart = () => {
  const [products, setProducts] = useState([]);
  const [cartPopup, setCartPopup] = useState(false);
  const productsInCart = useSelector(
    (state) => state.persistedReducer?.cart?.products
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProduct = () => {
      axios
        .get(API_BASE + "/cart")
        .then((res) => {
          setProducts(res.data);
        })
        .catch((error) => console.log(error.message));
    };
    fetchProduct();
  }, []);
  const handleClearAll = async () => {
    dispatch(DeleteAllProduct());
    products.forEach((product) => 
      axios.delete(`${API_BASE}/cart/${product.id}`)
          .catch((error) => console.log(error.message))
      )
  };
  const setCartPopuptrue = () =>{
    setCartPopup(true)
    document.body.style.overflow = 'hidden'
  }
  const setCartPopupfalse = () =>{
    setCartPopup(false)
    document.body.style.overflow ='scroll'
  }
  const handlDelete = (id) => {
    const DeleteFromCart = async () => {
      
        await axios
        .delete(API_BASE + "/cart/" + id)
        .then(() => {
            dispatch(DeleteProduct(id))
        })
        .catch((error) => console.error(error.message));
      
      }
      if (products.length !== 0) {
        DeleteFromCart();
      } else {
        console.warn("No products");
      }
  };
  return (
    <div>
      {productsInCart.length !== 0 && 
      <button onClick={setCartPopuptrue} className="float-right transition-all ease-in">
        Open
      </button>
      }
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
          return (
            <div key={i.id} className="px-5 my-1 bg-slate-100 h-32">
              <div className="flex flex-col text-slate-800">
                <p>{i.name}</p>
                <img src={i.img} alt="" className="w-10"/>
                <p><strong>$</strong>{i.price}</p>
              </div>
              <button onClick={() => handlDelete(i.id)} className="text-red-500 hover:text-red-400">Delete</button>
            </div>
          );
        })}
        <hr></hr>
        {products && <button onClick={handleClearAll} className=" text-slate-500 font-normal hover:text-red-500 ml-5  ">Clear all</button>}
      </div>
    </div>
  );
};

export default Cart;
