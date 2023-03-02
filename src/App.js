import "./App.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Category, Cart } from "./Components/Pages/index";

import Navbar from "./Components/Navbar/Navbar";
import Loader from "./Components/Loader/Loader";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/Cart" element={<Cart></Cart>}></Route>
          <Route path="/category/:id" element={<Category></Category>}></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
