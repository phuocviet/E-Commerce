import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  cartQuantity: 0,
  error: null,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    GetCart: (state,action) => {
      const cart = [...state.products];
      cart.push(action.payload);
      state.products = cart[0];
      state.error = false;
      state.cartQuantity = cart[0].length; 
    },
    AddProduct: (state, action) => {
      const cart = [...state.products];
      cart.push(action.payload);
      state.products = cart;
      state.error = false;
      state.cartQuantity++;
    },
    ChangingProductQt: (state, action) => {
      console.log(action.payload);
    },
    DeleteAllProduct: (state) => {
      state.products = [];
      state.error = false;
      state.cartQuantity = 0;
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
        state.cartQuantity--;
      }else{
        state.error = true
      }
    },
  },
});

export const { GetCart, AddProduct, DeleteAllProduct, DeleteProduct, ChangingProductQt } =
  CartSlice.actions;
export default CartSlice.reducer;
