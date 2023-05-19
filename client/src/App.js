import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bookstore from "./Pages/clientsite/bookstore";
// import Bookdetail from "./Pages/bookdetail";
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
import COConfirm from "./Pages/clientsite/CheckoutPages/checkoutConfirm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainStore />} />
        <Route path="/:category" element={<FilteredStore />} />
        <Route path="/product" element={<ProductStore />} />
        <Route path="/bookstore" element={<Bookstore />} />
        <Route path="/detail/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartDetail />} />
        <Route path="/checkout" element={<COAddress />} />
        <Route path="/options" element={<COoptions />} />
        <Route path="/payment" element={<COPayment />} />
        <Route path="/confirmCheckout" element={<COConfirm />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
