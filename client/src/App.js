import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bookstore from "./Pages/bookstore";
import Bookdetail from "./Pages/bookdetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Bookstore />} />
        <Route path="/detail/:id" element={<Bookdetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
