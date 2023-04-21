import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bookstore from "./Pages/bookstore";
import Bookdetail from "./Pages/bookdetail";
import MainStore from "./Pages/MainStore";
import CreateProductForm from "./Pages/CreateProductForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainStore/>}/>
        <Route path="/createproduct" element={<CreateProductForm/>}/>
        <Route path="/bookstore" element={<Bookstore />} />
        <Route path="/detail/:id" element={<Bookdetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
