import { createSlice } from "@reduxjs/toolkit";
const fetchFromLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(localStorage.getItem("cart"));
  } else return [];
};

const storeinlocalStorage = (data) => {
  localStorage.setItem("cart", JSON.stringify(data));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: fetchFromLocalStorage(),
    totalItems: 0,
    totalAmount: 0,
    deliverCharge: 1000,
  },
  reducers: {
    add2Cart(state, action) {
      const tempItem = state.data.find((item) => item.id === action.payload.id);
      if (tempItem) {
        const tempCart = state.data.map((item) => {
          if (item.id === action.payload.id) {
            let newqty = item.quantity + action.payload.quantity;
            let newTotalPrice = newqty * item.price;
            return {
              ...item,
              quantity: newqty,
              totalPrice: newTotalPrice,
            };
          } else {
            return item;
          }
        });
        state.data = tempCart;
        storeinlocalStorage(state.data);
      } else {
        state.data.push(action.payload);
        storeinlocalStorage(state.data);
      }
    },
    removefromCart(state, action) {
      const tempCart = state.data.filter((item) => item.id !== action.payload);
      state.data = tempCart;
      storeinlocalStorage(state.data);
    },
    clearCart(state, action) {
      state.data = [];
      storeinlocalStorage(state.data);
    },
    toggleCartQty(state, action) {
      const tempCart = state.data.map((item) => {
        if (item.id === action.payload.id) {
          let tempQty = item.quantity;
          let tempTotalPrice = item.totalPrice;
          if (action.payload.type === "INC") {
            tempQty++;
            tempTotalPrice = tempQty * item.price;
          }
          if (action.payload.type === "DEC") {
            tempQty--;
            if (tempQty < 1) tempQty = 1;
            tempTotalPrice = tempQty * item.price;
          }
          return { ...item, quantity: tempQty, totalPrice: tempTotalPrice };
        } else {
          return item;
        }
      });
      state.data = tempCart;
      storeinlocalStorage(state.data);
    },
    getCartTotal(state) {
      state.totalAmount = state.data.reduce((cartTotal, cartItem) => {
        return (cartTotal += cartItem.totalPrice);
      }, 0);
      state.totalItems = state.data.length;
    },
  },
});

export const {
  add2Cart,
  removefromCart,
  clearCart,
  getCartTotal,
  toggleCartQty,
} = cartSlice.actions;

export default cartSlice.reducer;
