import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar/navbar";

const Bookdetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  useEffect(() => {
    const showDetail = async () => {
      try {
        const result = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyAIy3IA554n_L1Gn27mJj05Xm--1bisZ8A`
        );
        setDetail(result.data.volumeInfo);
      } catch (error) {
        console.log(error);
      }
    };
    showDetail();
  }, [id]);

  const showDetail = useMemo(() => {
    return (
      <div>
        <Navbar />
        {detail ? (
          <div className="mt-20 ml-20">
            <div className="flex h-[405px]">
              <img
                className="w-[300px] shadow-xl"
                src={detail.imageLinks && detail.imageLinks.smallThumbnail}
                alt="image_link"
              />
              <div className="ml-20 w-96">
                <h1 className="text-3xl font-bold">{detail.title}</h1>
                <p>subtitle: {detail.subtitle ? detail.subtitle : "none"}.</p>
                <p>Price: {}</p>
                <p>Page count: {detail.pageCount}.</p>
                <p>Categoies {detail.categories}.</p>
                <button className=" bg-yellow-500 hover:bg-yellow-400 px-10 py-3 mt-20 text-white text-lg rounded-md">
                  ADD CART
                </button>
                <br />
                <button className=" bg-orange-400 hover:bg-orange-500 px-10 py-3 mt-2 text-white text-lg rounded-md">
                  BUY NOW
                </button>
              </div>
            </div>
          </div>
        ) : (
          <span>Loading...</span>
        )}
      </div>
    );
  }, [detail]);
  console.log(detail);

  return <div>{showDetail}</div>;
};

export default Bookdetail;
