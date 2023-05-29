import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: [],
  error: null,
};

const OrderSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addOrder:(state,action)=>{
        state.order = action.payload
        state.error = false
    },
    addDelivery:(state,action)=>{
        const delivery = action.payload
        const newOrder = {...state.order,delivery}
        if(delivery){
            state.order =newOrder
            state.error =false  
        }else{
            state.error = true
        }
        
    },
    clearOrder: (state) =>{
      state.order = []
      state.error = null
    }
  },
});

export const {
  addOrder,
  addDelivery,
  clearOrder
} = OrderSlice.actions;
export default OrderSlice.reducer;
