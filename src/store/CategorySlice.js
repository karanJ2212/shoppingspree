import { createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../utils/apiURL";
import STATUS from "../utils/status";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    data: [],
    status: STATUS.IDLE,
    catProductAll: [],
    catProductAllStatus: STATUS.IDLE,
    catProductSingle: [],
    catProductSingleStatus: STATUS.IDLE,
  },
  reducers: {
    setCategory(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setCatProductAll(state, action) {
      state.catProductAll.push(action.payload);
    },
    setCatProductAllStatus(state, action) {
      state.catProductAllStatus = action.payload;
    },
    setCatProductSingle(state, action) {
      state.catProductSingle = action.payload;
    },
    setcatProductSingleStatus(state, action) {
      state.catProductSingleStatus = action.payload;
    },
  },
});

export const {
  setCategory,
  setStatus,
  setCatProductAll,
  setCatProductAllStatus,
  setCatProductSingle,
  setcatProductSingleStatus,
} = categorySlice.actions;
export default categorySlice.reducer;

export const fetchCategories = () => {
  return async function fetchCategoryThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await fetch(`${BASE_URL}categories`);
      const data = await response.json();
      dispatch(setCategory(data.slice(0, 5)));
      dispatch(setStatus(STATUS.IDLE));
    } catch (error) {
      dispatch(setStatus(STATUS.ERROR));
    }
  };
};

export const fetchProductsByCategory = (categoryID, dataType) => {
  return async function fetchCategoryProductThunk(dispatch) {
    if (dataType === "all") dispatch(setCatProductAllStatus(STATUS.LOADING));
    if (dataType === "single")
      dispatch(setcatProductSingleStatus(STATUS.LOADING));

    try {
      const response = await fetch(
        `${BASE_URL}categories/${categoryID}/products`
      );
      const data = await response.json();
      if (dataType === "all") {
        dispatch(setCatProductAll(data.slice(0, 10)));
        dispatch(setCatProductAllStatus(STATUS.IDLE));
      }
      if (dataType === "single") {
        dispatch(setCatProductSingle(data.slice(0, 20)));
        dispatch(setcatProductSingleStatus(STATUS.IDLE));
      }
    } catch (error) {
      dispatch(setCatProductAllStatus(STATUS.ERROR));
    }
  };
};

export const getallCategories = (state) => state.category.data;
