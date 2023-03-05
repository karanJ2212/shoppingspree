import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./CategorySlice";
import modalReducer from "../store/ModalSlice";
import productReducer from "../store/ProductSlice";
import cartReducer from "../store/CartSlice";

const store = configureStore({
  reducer: {
    category: categoryReducer,
    modal: modalReducer,
    product: productReducer,
    cart: cartReducer,
  },
});

export default store;
