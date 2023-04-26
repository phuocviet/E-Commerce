import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bookstore from "./Pages/bookstore";
// import Bookdetail from "./Pages/bookdetail";
import MainStore from "./Pages/MainStore";
import SignUpForm from "./Pages/SignUpForm";
import LoginForm from "./Pages/LoginForm";
import ProductStore from "./Pages/ProductStore";
import ProductDetail from "./Pages/ProductDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainStore />} />
        <Route path="/product" element={<ProductStore />} />
        <Route path="/bookstore" element={<Bookstore />} />
        <Route path="/edit/:id" element={<ProductDetail />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
