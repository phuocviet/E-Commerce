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
      const cart = [...state.products];
      cart.push(action.payload);
      state.products = cart;
      state.error = false;
      state.quantity++;
    },
    DeleteAllProduct: (state) => {
      state.products = [];
      state.error = false;
      state.quantity = 0;
    },
    DeleteProduct: (state, action) => {
      const productId = action.payload
      // console.log(productId);
      const cart = [...state.products]
      const productIndex = cart.findIndex((product)=> product.id === productId) 
      // console.log(productIndex);
      if(productIndex>=0){
        cart.splice(productIndex, 1)
        state.products = cart
        state.error = false;
        state.quantity--;
      }else{
        state.error = true
      }
    },
  },
});

export const { AddProduct, DeleteAllProduct, DeleteProduct } =
  CartSlice.actions;
export default CartSlice.reducer;
