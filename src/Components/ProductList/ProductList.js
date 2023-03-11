import React from "react";
import STATUS from "../../utils/status";
import { setModalData, setIsModalVisible } from "../../store/ModalSlice";
import { formatPrice } from "../../utils/helpers";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import SingleProduct from "../SingleProduct/SingleProduct";
import { useDispatch, useSelector } from "react-redux";

const ProductList = ({ products, status }) => {
  const dispatch = useDispatch();
  const { isModalVisible } = useSelector((state) => state.modal);

  const viewModalHaldler = (data) => {
    dispatch(setModalData(data));
    dispatch(setIsModalVisible(true));
  };

  if (status === STATUS.Error) return <Error></Error>;

  if (status === STATUS.LOADING) return <Loader></Loader>;

  return (
    <section className="product py-5 bg-ghost-white" id="products">
      {isModalVisible && <SingleProduct></SingleProduct>}

      <div className="container">
        <div className="product-content">
          <div className="section-title">
            <h3 className="text-uppercase fw-7 text-regal-blue ls-1">
              Our products
            </h3>
          </div>
          <div className="product-items grid">
            {products.slice(0, 20).map((product) => (
              <div
                className="product-item bg-white"
                key={product.id}
                onClick={() => viewModalHaldler(product)}
              >
                <div className="product-item-img ">
                  <img src={product.images[0]} alt="" />
                  <div className="product-item-cat text-white fs-13 text-uppercase bg-gold fw-16">
                    {product.category.name}
                  </div>
                </div>
                <div className="product-item-body">
                  <h6 className="product-item-title text-pine-green fw-4 fs-15">
                    {product.title}
                  </h6>
                  <div className="product-item-price text-regal-blue fw-7 fs-18 ">
                    {formatPrice(product.price)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
