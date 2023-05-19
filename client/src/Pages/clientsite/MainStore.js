import React, { useEffect, useState, useMemo } from "react";
import { API_BASE } from "../../APIs/Api";
import Navbar from "../../components/navbar/navbar";
import ReactPaginate from "react-paginate";
import axios from "axios";
import FilterBar from "../../components/filters/filterBar";
import { useDispatch, useSelector } from "react-redux";
import { AddProduct } from "../../app/features/cartSlice";
import { persistor } from "../../app/store";

const MainStore = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsperPage = 14;
  const userId = useSelector(
    (state) => state.persistedReducer.auth?.user[0]?.id
  );
  useEffect(() => {
    const getProducts = async () => {
      await axios
        .get(API_BASE + "/products")
        .then((res) => {
          setProducts(res.data);
          axios
          .get(`${API_BASE}/users/${userId}`)
          .then((res) => {
            setCart(res.data.cart)
          })
          .catch((err) => console.log(err.message));
        })
        .catch((error) => console.log(error));
    };
    getProducts();
  }, [userId]);
  const getResult = async (search) => {
    await axios
      .get(`${API_BASE}/products?q=${search}`)
      .then((res) => setProducts(res.data))
      .catch((error) => console.log(error));
  };
  const currentProducts = useMemo(() => {
    setPageCount(Math.ceil(products.length / itemsperPage));
    const endOffset = itemOffset + itemsperPage;
    return products.slice(itemOffset, endOffset);
  }, [itemOffset, products, itemsperPage]);
  
  //NAVIGATE TO DETAIL PAGE
  const showDetail = (id) => {
    window.location.href = "/detail/" + id;
  };
  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsperPage) % products.length;
    setItemOffset(newOffset);
  };

  const handleFilter = (chosed) => {
    window.location.href = `/:${chosed}`;
  };

  
  const dispatch = useDispatch()

  const handleAddtoCart = async (product) =>{
    const avaibletoSell = product.price !== "unkown";
    const quantity = { quantity: 1 };
    const addedproduct = { ...product, ...quantity };
    if (avaibletoSell) {
      if (userId) {
        await axios
          .patch(`${API_BASE}/users/${userId}`, {
            cart: [...cart, addedproduct],
          })
          .then((res) => {
            dispatch(AddProduct(addedproduct));
            persistor.flush(addedproduct);
          })
          .catch((err) => console.log(err.message));
      }
    } else {
      console.error("this product is unvaliable");
    }
  }

  return (
    <div>
      <Navbar onSearch={getResult} />
      <div className="lg:flex lg:flex-col ">
        <div className="lg:block md:block sm:hidden flex w-[88%] h-[250px] text-center mx-20 mt-5">
          <img
            src="https://th.bing.com/th/id/OIP.PIG0mKK4cai_Oxkf9yePdAHaCM?pid=ImgDet&rs=1"
            alt="banner"
            className="relative z-[-1] h-[250px] w-full] "
          />
        </div>
        <FilterBar choseCategory={handleFilter} />
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 h-max mt-10 mx-11">
          <span className="mb-5 ml-8 text-gray-500 col-span-full ">
            admin store/
          </span>
          {currentProducts.map((product) => {
            return (
              <div
                className="m-5 transition-all ease-in-out hover:shadow-2xl cursor-pointer rounded-lg"
                key={product.id}
              >
                <div className="">
                  <header className="flex justify-center">
                    <img onClick={() => showDetail(product.id)} src={product.img} alt="" className=" h-[300px] " />
                  </header>
                  <div className="ml-4 mb-3">
                    <h4 className=" italic text-xl">{product.name}</h4>
                    <p>{product.description}</p>
                    <p>amt:{product.amount}</p>
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
                    <p>
                      <strong>$</strong>
                      {product.price}
                    </p>
                    <div className="px-1 my-2">
                      <button
                        onClick={() => handleAddtoCart(product)}
                        className="font-semibold mr-10 rounded-sm bg-gradient-to-b from-yellow-300 to-yellow-200 hover:ring-transparent hover:from-yellow-200 hover:to-yellow-300 w-full px-2 py-1"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ReactPaginate
        containerClassName="flex flex-row justify-center items-center space-x-2 mt-5 mb-10"
        activeClassName="bg-blue-500 text-white rounded-md px-3 py-2"
        pageClassName="rounded-md px-3 py-2 bg-gray-200 text-gray-700"
        previousClassName="rounded-md px-3 py-2 bg-gray-200 text-gray-700"
        nextClassName="rounded-md px-3 py-2 bg-gray-200 text-gray-700"
        disabledClassName="disabled"
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={6}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default MainStore;
