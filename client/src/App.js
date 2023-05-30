import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Bookstore from "./Pages/clientsite/bookstore";
import MainStore from "./Pages/clientsite/MainStore";
import SignUpForm from "./Pages/SignUpForm";
import LoginForm from "./Pages/LoginForm";
import ProductStore from "./Pages/adminsite/ProductStore";
import EditProduct from "./Pages/adminsite/EditProduct";
import ProductDetail from "./Pages/clientsite/ProductDetail";
import FilteredStore from "./Pages/clientsite/FilteredStore";
import CartDetail from "./Pages/clientsite/CartDetail";
import COAddress from "./Pages/clientsite/CheckoutPages/checkoutAddress";
import COoptions from "./Pages/clientsite/CheckoutPages/checkoutOptions";
import COPayment from "./Pages/clientsite/CheckoutPages/checkoutPayment";
import COConfirm from "./Pages/clientsite/CheckoutPages/checkoutOrder";
import { useSelector } from "react-redux";
import CatchPage from "./Pages/CatchPage";

function App() {
  const isAuthed =
    useSelector((state) => state.persistedReducer.auth?.user[0]?.email) || "";
  const itemsInCart =
    useSelector((state) => state.persistedReducer?.cart?.products) || [];
  const cartIsEmpty = 
    itemsInCart.length === 0
  
  return (
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<MainStore />} />
        <Route path="/:category" element={<FilteredStore />} />
        <Route path="/bookstore" element={<Bookstore />} />
        <Route path="/detail/:id" element={<ProductDetail />} />
        {/* private routes */}
        <Route
          path="/product"
          element={
            isAuthed === "adminmail@gmail.com" ? (
              <ProductStore />
            ) : (
              <Navigate to="*" />
            )
          }
        />
        <Route
          path="/edit/:id"
          element={
            isAuthed === "adminmail@gmail.com" ? (
              <EditProduct />
            ) : (
              <Navigate to="*" />
            )
          }
        />
        {/* require auth routes */}
        <Route
          path="/cart"
          element={isAuthed ? <CartDetail /> : <Navigate to="/login" />}
        />
        <Route
          path="/checkout"
          element={isAuthed && !cartIsEmpty ? <COAddress /> : <Navigate to="/cart" />}
        />
        <Route
          path="/options"
          element={isAuthed && !cartIsEmpty ? <COoptions /> : <Navigate to="/cart" />}
        />
        <Route
          path="/payment"
          element={isAuthed && !cartIsEmpty ? <COPayment /> : <Navigate to="/cart" />}
        />
        <Route
          path="/order"
          element={isAuthed && !cartIsEmpty ? <COConfirm /> : <Navigate to="/cart" />}
        />
        {/* authen routes */}
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        {/* Catch route */}
        <Route path="*" element={<CatchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
