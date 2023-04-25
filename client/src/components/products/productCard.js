import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const ProductCard = (props) => {
  const book = props.book;
  const [isFavorite, setIsFavorite] = useState(false);
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const thumbnail =
    book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail;
  const title = book.volumeInfo.title;
  // const subtitle = book.volumeInfo.subtitle;
  const price = book.saleInfo.listPrice && book.saleInfo.listPrice.amount;
  return (
    <div
      name="book-card"
      className=" w-[200px] h-[300px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-800 my-8 cursor-pointer"
    >
      <div>
        <img
          alt=""
          src={thumbnail}
          className="absolute h-[300px] w-[200px] rounded-lg opacity-10 hover:transition-opacity hover:opacity-100 object-cover "
        />
        <button className="relative p-1 rounded-tl-lg text-lg dark:bg-gray-900">
          {isFavorite ? (
            <AiFillStar className=" text-yellow-300" />
          ) : (
            <AiOutlineStar
              className="text-white"
              onClick={setIsFavorite(true)}
            />
          )}
        </button>
        <div className="px-3 h-[270px] w-[200px]">
          <label className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </label>
          {/* <p className="mt-7 font-normal text-gray-700 dark:text-gray-400">
                <strong>Subtitle: </strong>
                {subtitle}
              </p> */}
        </div>
      </div>
      <footer className="relative m-0 p-0">
        {price ? (
          <label>
            <strong>Price: </strong>
            {formatter.format(price)}
          </label>
        ) : (
          <label>
            <strong>Price:</strong> unvaliable
          </label>
        )}
      </footer>
    </div>
  );
};

export default ProductCard;
