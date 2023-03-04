import { createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../utils/apiURL";
import STATUS from "../utils/status";

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: STATUS.IDLE,
  },
  reducers: {
    setProduct(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setProduct, setStatus } = productSlice.actions;
export default productSlice.reducer;

export const fetchProducts = () => {
  return async function fetctProductThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const respose = await fetch(`${BASE_URL}products`);
      const data = await respose.json();
      dispatch(setStatus(STATUS.IDLE));
      dispatch(setProduct(data));
    } catch (error) {
      dispatch(setStatus(STATUS.ERROR));
    }
  };
};
