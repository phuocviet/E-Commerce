import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const ProductsList = ({
  products,
  isDeleting,
  handleAbort,
  handleDelete,
  checkDelete,
}) => {
  const showDetail = (id) => {
    window.location.href = `/edit/${id}`;
  };

  return (
    <div className="flex-none min-w-full px-4 sm:px-6 md:px-0 xl:overflow-auto lg:overflow-auto md:overflow-auto sm:overflow-auto pr-0 lg:max-h-[700px] border-y">
      {products.map((product) => {
        return (
          <div className="ml-8 py-2" key={product.id}>
            <div className="py-1 pl-2 lg:w-[1000px] w-[95%] h-[60px] ring-1 ring-slate-400 text-slate-500 cursor-default grid grid-cols-6">
              <p>{product.name}</p>
              <p className="w-[160px]">
                {product.price}
                <strong>$</strong>
              </p>
              <p className=" overflow-auto">{product.description}</p>
              <p className="pl-2">amt: {product.amount}</p>
              <img src={product.img} alt="" className="w-10" />
              <div className="flex justify-around">
                {isDeleting === product.id ? (
                  <div className="flex justify-between">
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="hover:text-red-500 mr-2"
                    >
                      Yes
                    </button>
                    <button
                      onClick={handleAbort}
                      className="hover:text-green-500"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => checkDelete(product.id)}
                    className="hover:text-red-500"
                  >
                    <AiOutlineDelete />
                  </button>
                )}
                <button
                  onClick={() => showDetail(product.id)}
                  className="hover:text-green-500"
                >
                  <AiOutlineEdit />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsList;
