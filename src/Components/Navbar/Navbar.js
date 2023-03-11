import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, getallCategories } from "../../store/CategorySlice";
import { getCartTotal } from "../../store/CartSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const catagories = useSelector(getallCategories);
  const { totalItems } = useSelector((state) => state.cart);
  useEffect(() => {
    console.log("at navbar");
    dispatch(fetchCategories());
    dispatch(getCartTotal());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isSidebarOpen, setisSidebarOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="container">
          <div className="navbar-top flex flex-between">
            <Link to="/" className="navbar-brand">
              <span className="text-regal-blue">Shopping</span>
              <span className="text-gold">Spree</span>
            </Link>
            <form className="navbar-search flex">
              <input type="text" placeholder="search here..." />
              <button type="submit" className="navbar-search-btn">
                <i className="fas fa-search"></i>
              </button>
            </form>
            <div className="navbar-btns">
              <Link to="/cart" className="add-to-cart-btn flex">
                <span className="btn-ico">
                  <i className="fas fa-shopping-cart"></i>
                </span>
                <div className="btn-txt fw-5">
                  cart <span className="cart-count-value">{totalItems}</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="navbar-bottom bg-regal-blue">
          <div className="container flex flex-between">
            <ul
              className={`nav-links flex ${
                isSidebarOpen ? "show-nav-links" : ""
              }`}
            >
              <button
                type="button"
                className="navbar-hide-btn text-white"
                onClick={() => setisSidebarOpen(false)}
              >
                <i className="fas fa-times"></i>
              </button>
              {/* <li>
                <Link to="/" className="nav-link text-white">
                  Demos
                </Link>
              </li> */}
              {catagories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/category/${category.id}`}
                    className="nav-link text-white"
                    onClick={() => setisSidebarOpen(false)}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="navbar-show-btn text-gold"
              onClick={() => setisSidebarOpen(true)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
