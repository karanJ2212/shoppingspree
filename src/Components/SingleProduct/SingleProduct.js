import React from "react";
import "./SingleProduct.scss";
import { setIsModalVisible } from "../../store/ModalSlice";
import { formatPrice } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";

const SingleProduct = () => {
  const dispatch = useDispatch();

  const addToCartHandler = (product) => {
    console.log(product);
  };

  const { data: product } = useSelector((state) => state.modal);
  return (
    <div className="overlay-bg">
      <div className="product-detail-modal bg-white">
        <button
          type="button"
          className="modal-close-btn flex flex-center fs-14"
          onClick={() => dispatch(setIsModalVisible(false))}
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="details-content grid">
          <div className="details-left">
            <div className="details-img">
              <img src={product.images[0]} alt={product.title} />
            </div>
          </div>
          {/* details left */}
          <div className="details-right">
            <div className="details-info">
              <h3 className="title text-regal-blue fs-22 fw-5">
                {product.title}
              </h3>
              <p className="description text-pine-green"></p>
              <div className="price fw-7 fs-23">
                Price:{formatPrice(product.price)}
              </div>
              <div className="qty flex">
                <span className="text-light-blue qty-text">Qty:</span>
                <div className="qty-change flex">
                  <button type="button" className="qty-dec fs-14">
                    <i className="fas fa-minus text-light-blue"></i>
                  </button>
                  <span className="qty-value flex flex-center"></span>
                  <button
                    type="button"
                    className="qty-inc fs-14 text-light-blue"
                  >
                    <i className="fas fa-plus"></i>
                  </button>{" "}
                </div>
              </div>
              <button
                type="button"
                className="btn-primary add-to-cart-btn"
                onClick={addToCartHandler(product)}
              >
                <span className="btn-icon">
                  <i className="fas fa-cart-shopping"></i>
                </span>
                <span className="btn-text">Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
