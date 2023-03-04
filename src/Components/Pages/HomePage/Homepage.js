import React, { useEffect } from "react";
import Slider from "../../Slider/Slider";
import "./Homepage.scss";
import Category from "../../Category/Category";
import ProductList from "../../ProductList/ProductList";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchProductsByCategory,
} from "../../../store/CategorySlice";
import SingleCategory from "../../SingleCategory/SingleCategory";
import { fetchProducts } from "../../../store/ProductSlice";

const Homepage = () => {
  const dispatch = useDispatch();
  const { data: categories, status: categorystatus } = useSelector(
    (state) => state.category
  );
  const { catProductAll: productsByCategory, catProductAllStatus } =
    useSelector((state) => state.category);

  const { data: products, status: productStatus } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(fetchProductsByCategory(1, "all"));
    dispatch(fetchProductsByCategory(2, "all"));
  }, []);

  return (
    <div className="home-page">
      <Slider></Slider>
      <Category categories={categories} status={categorystatus}></Category>

      {<ProductList products={products} status={productStatus}></ProductList>}

      {/* category one products  */}
      <section>
        {productsByCategory[0] && (
          <SingleCategory
            products={productsByCategory[0]}
            status={catProductAllStatus}
          />
        )}
      </section>
    </div>
  );
};

export default Homepage;
