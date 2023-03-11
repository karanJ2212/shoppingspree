import "./App.scss";
import { HashRouter, Routes, Route } from "react-router-dom";
// pages
import { Home, Category, Cart } from "./Components/Pages/index";
// components
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <HashRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </HashRouter>
      </Provider>
    </div>
  );
}

export default App;
