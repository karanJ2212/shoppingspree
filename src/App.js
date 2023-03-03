import "./App.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Category, Cart } from "./Components/Pages/index";

import Navbar from "./Components/Navbar/Navbar";
import Loader from "./Components/Loader/Loader";
import Footer from "./Components/Footer/Footer";
import store from "./store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/Cart" element={<Cart></Cart>}></Route>
            <Route
              path="/categories/:id"
              element={<Category></Category>}
            ></Route>
          </Routes>
          <Footer></Footer>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
