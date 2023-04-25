import React from "react";
import { useState } from "react";
// import {MdArrowDropDown} from 'react-icons/md'
import Products from "../components/products/products";
import axios from "axios";
import Navbar from "../components/navbar/navbar";

const Bookstore = () => {
  const [booksData, setBookData] = useState([]);
  // const [resultsAmount, setResultsAmount] = useState(20)
  // const seeMore = () => {
  //   setResultsAmount(resultsAmount + 5)
  // }
  const getbook = async (search) => {
    const volumeName = search;
    const key = "=AIzaSyDjkBbDFmxbkM0767-wBCKKGoS_-WtAgq4";
    const api = `https://www.googleapis.com/books/v1/volumes?q=${volumeName}&filter=paid-ebooks&key${key}&maxResults=20`;
    await axios
      .get(api)
      // .then(res => console.log(res.data.items))
      .then((res) => setBookData(res.data.items))
      .catch((err) => console.log(err));
  };
  console.log(booksData);
  return (
    <div>
      <Navbar onSearch={getbook} />
      <div className=" w-full z-2">
        {booksData && (
          <div>
            <Products booksData={booksData} />
            {/* {resultsAmount===40? <span className=' transition-colors underline flex absolute right-20 text-red-500 text-lg'>Maximum</span>
            :
            <button onClick={seeMore} className=' underline flex absolute right-20 text-orange-500 text-lg'>See more <MdArrowDropDown/> </button>
            } */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookstore;
