import axios from "axios";
import { API_BASE } from "../../APIs/Api";
import { toast, ToastContainer } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import { persistor } from "../../app/store";
import { useDispatch } from "react-redux";
import { AddProduct } from "../../app/features/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`${API_BASE}/products/` + id)
        .then((res) => setProduct(res.data))
        .catch((err) => console.log(err.message));
    };
    getData();
  }, [id]);
  const handleAddtoCart = async (e) => {
    e.preventDefault();
    const avaibletoSell = product.price !== "unkown";

    if (avaibletoSell) {
      await axios
        .post(`${API_BASE}/cart`, product)
        .then((res) => {
          dispatch(AddProduct(product));
          persistor.flush(product);
        })
        .catch((error) => toast.error(error.message));
    } else {
      toast.error("this product is unvaliable");
    }
  };
  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div>
        {product && (
          <div className="grid grid-cols-3 mt-20 mx-20">
            <div>
              <h4 className="text-2xl">{product.name}</h4>
              <img
                src={product.img}
                alt="productThumb"
                className="w-[400px] rounded-lg"
              />
            </div>
            {/* left side */}
            <div className=" mt-10">
              <p>
                <strong>Amount: </strong>
                {product.amount}
              </p>
              <p>
                <strong>Description:</strong> {product.description}
              </p>
              <div className="flex items-center my-1">
                <svg
                  className="w-5 h-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  className="w-5 h-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  className="w-5 h-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  className="w-5 h-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  className="w-5 h-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                  5.0
                </span>
              </div>
              <hr className="border-{0.5px} border-gray-400 w-full"></hr>
              <div className="flex mt-2">
                <p>$</p>
                <h3 className="text-xl text-slate-800 font-bold">
                  {product.price}
                </h3>
              </div>
              <button className="text-xl w-40 bg-orange-400 text-white px-4 py-0.5 rounded-lg mt-40">
                BUY
              </button>
              <button className="text-xl w-40 bg-gray-800 text-white px-4 py-0.5 rounded-lg mt-40 ml-5">
                ADD TO CART
              </button>
            </div>
            {/* middle side */}
            <div className="flex flex-col mx-40 px-6 w-[60%] h-[500px] border border-gray-400 rounded-lg justify-start ">
              <div className="mt-3">
                <h3 className="text-2xl">
                  <strong>$</strong>
                  {product.price}
                </h3>
                <p className="text-gray-400 text-sm">
                  No Import Fees Deposit & $25.83 Shipping to Vietnam
                </p>
                <button className="text-cyan-500">Detail</button>
                <p>
                  Delivery <strong>Date</strong> Order within{" "}
                  <strong>Time</strong>
                </p>
                <button className="pt-2 text-cyan-500">
                  Deliver to VietNam
                </button>
                <p className="py-4 text-green-500 font-semibold">IN STOCK</p>
                <button
                  onClick={handleAddtoCart}
                  className="text-xl w-[100%] bg-orange-400 text-white px-2 py-0.5 rounded-lg"
                >
                  BUY
                </button>
                <button
                  onClick={handleAddtoCart}
                  className="text-xl mt-5 w-[100%] bg-gray-800 text-white px-4 py-0.5 rounded-lg"
                >
                  ADD TO CART
                </button>
              </div>
              <div className="grid grid-cols-3 w-[100%] mt-4">
                <p>Payment</p>
                <button className="col-span-2 text-cyan-500">
                  Secure transition
                </button>
                <p>Ships from</p>
                <button className="col-span-2">AmaGion.com</button>
                <p>Sold by</p>
                <button className="col-span-2">AmaGion.com</button>
                <p>Returns</p>
                <button className="col-span-2 text-cyan-500">
                  Eligible for Return, Refund or Replacement within 30 days of
                  receipt{" "}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
