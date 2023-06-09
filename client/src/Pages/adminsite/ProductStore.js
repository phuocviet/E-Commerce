import React, { useEffect, useState } from "react";
import { API_BASE } from "../../APIs/Api";
import Sidebar from "../../components/navbar/sidebar";
import Navbar from "../../components/navbar/navbar";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import ProductsList from "../../components/products/ProductsList";

const ProductStore = () => {
  const [products, setProducts] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      await axios
        .get(API_BASE + "/products")
        .then((res) => setProducts(res.data))
        .catch((error) => console.log(error));
    };
    getProducts();
  }, []);

  //add product
  let product = { name, category, img, price, description, amount };
  //get image

  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      setImg(event.target.result);
    };
    reader.readAsDataURL(file);
  };
  const handleButton = () => {
    window.location.href = "/";
  };
  const addProduct = async (e) => {
    e.preventDefault();
    console.log(img);
    if (!name || !price || !description) {
      toast.warning("You must fill all the inform");
    } else {
      await axios
        .post(API_BASE + "/products", product)
        .then((json) => JSON.stringify(json.data))
        .then((res) => {
          toast.success("Add success");
          setTimeout(() => {
            window.location.reload(true);
          }, 2000);
        })
        .catch((err) => {
          toast.error("Error:" + err.message);
        });
    }
  };

  //delete product
  const handleDelete = (id) => {
    axios
      .delete(`${API_BASE}/products/${id}`)
      .then((res) => {
        toast.success("Delete success");
        setTimeout(() => {
          window.location.reload(true);
        }, 2000);
      })
      .then((res) => setIsDeleting(false))
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Request aborted");
        } else {
          toast.error("Error:" + err.message);
        }
      });
  };
  const checkDelete = (id) => {
    setIsDeleting(id);
  };
  const handleAbort = () => {
    setIsDeleting(false);
  };
  // Check admin role
  const currentuser =
    useSelector((state) => state.persistedReducer.auth?.user[0]?.email) || "";
  return (
    <div>
      {currentuser === "adminmail@gmail.com" ? (
        <div>
          <Sidebar />
          <ToastContainer />
          <h1 className="text-xl text-neutral-600 font-semibold lg:relative sm:relative sm:mx-20 pt-10 mt-5">
            PRODUCT STORAGE
          </h1>
          <div className="lg:grid md:grid sm:block lg:grid-cols-3 mx-5">
            <form
              className=" lg:my-16 lg:ml-10 md:ml-5 sm:my-5 lg:min-w-full md:w-full sm:w-[80%] h-max bg-white ring-gray-400 ring-1"
              onSubmit={addProduct}
            >
              <div className=" pt-8 pl-5 block">
                <label htmlFor="title" className=" text-neutral-600">
                  Title:{" "}
                </label>
                <input
                  id="title"
                  className="px-2 block w-[95%] mr-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-gray-300 focus:outline-none sm:text-sm sm:leading-6"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="pt-8 pl-5 block">
                <label htmlFor="money" className="text-neutral-600">
                  Price:{" "}
                </label>
                <input
                  id="money"
                  className="px-2 block w-[95%] mr-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-gray-300 focus:outline-none sm:text-sm sm:leading-6"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="pt-8 pl-5 block">
                <label htmlFor="description" className="text-neutral-600">
                  Description:{" "}
                </label>
                <input
                  id="description"
                  type="text"
                  className="px-2 block w-[95%] h-auto mr-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-gray-300 focus:outline-none sm:text-sm sm:leading-6 "
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="pt-8 pl-5 block">
                <label htmlFor="description" className="text-neutral-600">
                  Category:{" "}
                </label>
                <select
                  className="px-2 block w-[95%] h-auto mr-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-gray-300 focus:outline-none sm:text-sm sm:leading-6 "
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option></option>
                  <option value="electronic">Electronic</option>
                  <option value="fashion">Fashion</option>
                </select>
              </div>
              <div className="pt-8 pl-5 block">
                <label className="text-neutral-600">Amount: </label>
                <input
                  id="amount"
                  type="number"
                  className="px-2 block w-[95%] mr-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-gray-300 focus:outline-none sm:text-sm sm:leading-6"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="pt-8 pl-5 block">
                <label className="text-neutral-600">Thumbnail: </label>
                <input
                  className="px-2 block w-[95%] mr-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none  focus:ring-inset focus:ring-0 sm:text-sm sm:leading-6"
                  type="file"
                  onChange={handleFile}
                />
              </div>
              <div className=" col-span-full text-center lg:my-8 mt-5">
                <button
                  type="submit"
                  className=" hover:shadow-gray-400 hover:shadow-lg transition-all duration-100 bg-orange-500 text-white py-1 mb-5  rounded-md w-[50%]"
                >
                  Add
                </button>
              </div>
            </form>
            <div className="lg:relative md:relative lg:col-span-2 lg:ml-24 sm:relative flex flex-col my-16">
              {products && (
                <ProductsList
                  products={products}
                  isDeleting={isDeleting}
                  handleAbort={handleAbort}
                  handleDelete={handleDelete}
                  setIsDeleting={setIsDeleting}
                  checkDelete={checkDelete}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Navbar />
          <div className="relative flex flex-col justify-center text-center mt-20">
            <span className="text-2xl">SORRY: we couldn't find this page</span>
            <span>
              Click{" "}
              <button
                className="text-cyan-500 hover:underline"
                onClick={handleButton}
              >
                this
              </button>{" "}
              button to return Home
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductStore;
