import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    products: [],
    status: 'idle',
    quantity: 0
}

const CartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        AddProduct:(state, action) =>{
            state.status = "Success"
            state.products += action.payload
            state.quantity = (q) => q+=1
        },
        DeleteProduct: (state, action) =>{
            state.status = "Success"
            const index = state.products.indexOf(action.payload)
            if (index> -1){
                state.products.splice(index, 1)
            } 
            state.quantity = (q) => q-=1
        }
    }
})

export const {AddProduct, DeleteProduct} = CartSlice.actions;
export default CartSlice.reducer
