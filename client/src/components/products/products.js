import { useMemo } from "react";
import ProductCard from "./productCard";
import { Link } from "react-router-dom";

const Products = ({ booksData }) => {
  const bookCards = useMemo(() => {
    return booksData.map((book) => {
      return (
        <Link key={book.id} to={{ pathname: "/detail/" + book.id }}>
          <ProductCard book={book} />
        </Link>
      );
    });
  }, [booksData]);

  return (
    <div className="mb-10 mt-5">
      <div className="grid grid-cols-6 h-fit ml-[68px]">{bookCards}</div>
    </div>
  );
};

export default Products;
