import React, { useEffect, useState } from "react";
import Sidebar from "../../components/navbar/sidebar";
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

  useEffect(() => {
    const getProducts = async () => {
      await axios
        .get("http://localhost:4000/products")
        .then((res) => setProducts(res.data))
        .catch((error) => console.log(error));
    };
    getProducts();
  }, []);

  //add product
  let product = { name, img, price, description, amount };
  //get image

  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      setImg(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const addProduct = async (e) => {
    e.preventDefault();
    console.log(img);
    if (!name || !price || !description) {
      toast.warning("You must fill all the inform");
    } else {
      await axios
        .post("http://localhost:4000/products", product)
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
      .delete(`http://localhost:4000/products/${id}`)
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

  return (
    <div>
      <Sidebar />
      <ToastContainer />
      <div className="lg:flex md:block block mt-10">
        <h1 className="text-xl text-neutral-600 font-semibold lg:absolute sm:relative lg:right-44 sm:mx-20 pt-10">
          PRODUCT STORAGE
        </h1>
        <form
          className="mx-20 my-5 w-max h-max bg-white ring-gray-400 ring-1"
          onSubmit={addProduct}
        >
          <div className=" pt-8 pl-5 block">
            <label htmlFor="title" className=" text-neutral-600">
              Title:{" "}
            </label>
            <input
              id="title"
              className="px-2 block w-[450px] mr-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-gray-300 focus:outline-none sm:text-sm sm:leading-6"
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
              className="px-2 block w-[450px] mr-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-gray-300 focus:outline-none sm:text-sm sm:leading-6"
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
              className="px-2 block w-[450px] h-40 mr-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-gray-300 focus:outline-none sm:text-sm sm:leading-6 "
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="pt-8 pl-5 block">
            <label className="text-neutral-600">Amount: </label>
            <input
              className="px-2 block w-[450px] mr-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-gray-300 focus:outline-none sm:text-sm sm:leading-6"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="pt-8 pl-5 block">
            <label className="text-neutral-600">Thumbnail: </label>
            <input
              className="px-2 block w-[450px] mr-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none  focus:ring-inset focus:ring-0 sm:text-sm sm:leading-6"
              type="file"
              onChange={handleFile}
            />
          </div>
          <div className=" col-span-full text-center my-8">
            <button
              type="submit"
              className=" hover:shadow-gray-400 hover:shadow-lg transition-all duration-100 bg-orange-500 text-white py-1 rounded-md w-[450px]"
            >
              Add
            </button>
          </div>
        </form>
        <div className="lg:absolute lg:right-40 sm:relative flex flex-col my-20">
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
  );
};

export default ProductStore;
