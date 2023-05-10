import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  quantity: 0,
  error: null,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    AddProduct: (state, action) => {
      const Cart = [...state.products];
      Cart.push(action.payload);
      state.products = Cart;
      state.error = false;
      state.quantity++;
    },
    DeleteAllProduct: (state) => {
      state.products = [];
      state.error = false;
      state.quantity = 0;
    },
    DeleteProduct: (state, action) => {
      const Cart = [...state.products];
      const index = Cart.findIndex((item) => item.id === action.payload.id);
      Cart.splice(index, 1);
      state.products = Cart;
      state.error = false;
      state.quantity--;
    },
  },
});

export const { AddProduct, DeleteAllProduct, DeleteProduct } =
  CartSlice.actions;
export default CartSlice.reducer;
